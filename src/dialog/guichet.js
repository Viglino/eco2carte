import './guichet.css'
import map from '../map'
import page from '../panel/menu'
import RIPart from '../control/ripart'
import storage from './storage'
import WKT from 'ol/format/WKT'
import {transformExtent} from 'ol/proj'
import {register} from 'ol/proj/proj4.js';
import { asArray as colorAsArray} from 'ol/color';
import proj4 from 'proj4';
import {vector} from '../map'
import mongo from 'mongo-parse'
import ol_Overlay_Popup from 'ol-ext/overlay/Popup'
import ol_control_Button from 'ol-ext/control/Button'

if (!proj4.defs["EPSG:2154"]) proj4.defs("EPSG:2154","+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
if (!proj4.defs["IGNF:LAMB93"]) proj4.defs("IGNF:LAMB93","+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
if (!proj4.defs["EPSG:27572"]) proj4.defs("EPSG:27572","+proj=lcc +lat_1=46.8 +lat_0=46.8 +lon_0=0 +k_0=0.99987742 +x_0=600000 +y_0=2200000 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs");
if (!proj4.defs["EPSG:2975"]) proj4.defs("EPSG:2975","+proj=utm +zone=40 +south +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
// Saint-Pierre et Miquelon
if (!proj4.defs["EPSG:4467"]) proj4.defs("EPSG:4467","+proj=utm +zone=21 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
// Antilles
if (!proj4.defs["EPSG:4559"]) proj4.defs("EPSG:4559","+proj=utm +zone=20 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
register(proj4);

const form = $('#menu .dialog.guichet form');
$(".cancel", form).click(()=>{
    page.hide();
  });

let valdef = storage.load();
$('.login', form).val(valdef.login);
$('.pwd', form).val(localStorage.pwd);
$('input[type="checkbox"]', form).prop('checked', valdef.world);


/** Color as array
 */
function getColor(color, opacity) {
  try{
    const c = colorAsArray(color);
    c[3] = opacity || 1;
    return c;
  } catch(e) {
    return;
  }
};
function style2IgnStyle(style) {
  if (!style) return {};
  const fillColor = getColor(style.fillColor, style.fillOpacity);
  const strokeColor = getColor(style.strokeColor, style.strokeOpacity);
  return {
    strokeColor: strokeColor,
    fillColor: fillColor,
    labelAttribute: style.label ? style.label.replace(/\$\{([^}]*)\}/g, '%$1%') : ''
  };
}

/** Changement de style
 */
function setStyle(nStyle) {
  if (!vector.get('styles')) return false;
  var style = vector.get('styles')[nStyle||0];
  const defaultStyle = style2IgnStyle(style);
  if (style && style.children) {
    vector.getSource().getFeatures().forEach((f) => {
      f.setIgnStyle(defaultStyle);
      style.children.forEach((st) => {
        if (st.condition) {
          const c = (typeof(st.condition) === 'string') ? JSON.parse(st.condition) : st.condition;
          const prop = f.getProperties();
          delete prop.geometry;
          if (mongo.parse(c).matches(prop)) {
            f.setIgnStyle(style2IgnStyle(st));
          }
        }
      });
    });
    vector.getSource().changed();
  }
  return true;
};

/** Chargement des donnees en WFS
 */
function loadData (ftype, login, pwd, world) {
  $('body').addClass('loading');
  const gatt = ftype.geometryName;
  const view = map.getView();
  const extent = world ? view.getProjection().getExtent() : view.calculateExtent();
  const bbox = transformExtent(extent, map.getView().getProjection(), ftype.attributes[gatt].crs);
  // Requete WFS
  $.ajax({
    url: ftype.wfs,
    data: {
      service: 'WFS',
      request: 'GetFeature',
      outputFormat: 'JSON',
      maxFeatures: 5000,
      version: '1.1.0',
      typeName: ftype.name,
      filter: (ftype.database=="bduni_metropole" ? {detruit:false} : {}),
      bbox: bbox.join(',')
    },
    dataType: 'json', 
    username: login,
    password: pwd,
    success: function (data) {
      const format = new WKT();
      const r3d = /([-+]?(\d*[.])?\d+) ([-+]?(\d*[.])?\d+) ([-+]?(\d*[.])?\d+)/g;
      const features = [];
      // Lecture des features
      data.forEach ((f) => {
        const geom = f[gatt].replace (r3d, "$1 $3");
				const feature = format.readFeature(geom, {
          dataProjection: ftype.attributes[gatt].crs,
          featureProjection : map.getView().getProjection()
        });
        delete f[gatt];
        feature.setProperties(f, true);
        features.push( feature );
      });
      $('body').removeClass('loading');
      page.hide();
      // Affichage
      setTimeout(() => {
        vector.getSource().clear();
        vector.getSource().addFeatures(features);
        vector.set('styles', ftype.styles);
        setStyle(0);
        $('#menu .info .nb').text(features.length);
        page.show('info');
      },5);
    },
    error: function(jqXHR, status, error) {
      console.log("oops")
    }
  });
};

/** Chargement de la liste des guichets
 */
function loadGuichet(layer, login, pwd, world) {
  let url = layer.url.split('?');
  const dbase = url[1].replace(/(.*)databasename\=(.*)/, '$2');
  url = 'https://espacecollaboratif.ign.fr/gcms/database/'+dbase+'/feature-type/'+layer.nom+'.json';
  $('body').addClass('loading');
  // Chargement du feature type
  $.ajax({
    url: url,
    dataType: 'json', 
    username: login,
    password: pwd,
    success: function (featureType) {
      loadData(featureType, login, pwd, world);
    },
    error: function(jqXHR, status, error) {
      console.log("oops")
      $('body').removeClass('loading');
    }
  });
};

/** Recuperer les infos utilisateur et charger la liste des guichets
 */
form.on('submit', function(e) {
  map.set('type', 'guichet');
  e.preventDefault();
  e.stopPropagation();
  const login = $('.login', form).val();
  const pwd = $('.pwd', form).val();

  valdef.login = login;
  valdef.world = $('input[type="checkbox"]', form).prop('checked');
  storage.save(valdef);

  const ripart = new RIPart({ user:login, pwd:pwd });
  $('body').addClass('loading');
  const ul = $('ul', form);
  ripart.getUserInfo((info) => {
    if (info) {
      info.groupes.forEach(groupe => {
        groupe.layers.forEach ((l) => {
          if (l.type==="WFS") {
            $('<li>').text(groupe.nom+' - '+l.nom)
              .data('layer', l)
              .click(function(e) {
                valdef.world = $('input[type="checkbox"]', form).prop('checked');
                storage.save(valdef);
                loadGuichet($(this).data('layer'), login, pwd, valdef.world);
              })
              .appendTo(ul);
          }
        });
      });
    }
    $('body').removeClass('loading');
  });
}); 

map.addControl(new ol_control_Button({
  className: 'style',
  html: '<i class="fa fa-pencil-square-o"></i>',
  handleClick: () => {
    const styles = vector.get('styles');
    const select = $('<ol>')
    if (styles) {
      styles.forEach((s, i) => {
        $('<li>').text(s.name).appendTo(select).click(() => {
          page.hide();
          setStyle(i);
        });
      });
    } else {
      $('<li>').text('pas de styles').appendTo(select);
    }
    const bulle = $('<textarea>').css({ "min-width": '100%', "max-width": '100%', height: '5em' }).val(valdef.infobulle).on('change', function() {
      valdef.infobulle = $(this).val();
      storage.save(valdef);
    });
    page.message($('<div>')
      .append($('<div>').text('Styles :'))
      .append(select)
      .append($('<div>').text('Bulle :'))
      .append(bulle)
    );
  }
}));