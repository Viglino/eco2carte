import {toLonLat} from 'ol/proj'
import map from '../map'
import {vector} from '../map'
import emptymap from './emptymap'
import FileSaver from 'file-saver'
import Button from 'ol-ext/control/Button'
import storage from './storage'
import { forEachCorner } from 'ol/extent'

// Download map
function download () {
  const macarte = $.extend(true, {}, emptymap);
  macarte.param.lon = toLonLat(map.getView().getCenter())[0];
  macarte.param.lat = toLonLat(map.getView().getCenter())[1];
  macarte.param.zoom = map.getView().getZoom();
  
  const layer = macarte.layers[1];
  if (map.get('type')==='signalement') {
    layer.popupContent = {
      "titre": "((%groupe%))",
      "desc": 
`(([**#%id%**](https://espacecollaboratif.ign.fr/georem/%id%)
))((%commune% (%id_dep%)
))((%comment%))((
!(https://espacecollaboratif.ign.fr/document/image/%doc%) ))
((par [%auteur%](https://espacecollaboratif.ign.fr/user/%id_auteur%)))((
le %date%))((
hauteur: %hauteur% m))`
    };
    layer.cluster = true;
    layer.maxZoomCluster = "13";
  } else {
    let valdef = storage.load();
    console.log(valdef)
    if (valdef.infobulle) layer.popupContent = {
      "titre": "((%groupe%))",
      "desc": valdef.infobulle
    }
  }
  
  function roundCoord(geom) {
    geom.forEach((g) => {
      if (typeof(g[0]) === 'number') {
        g[0] = Math.round(g[0]*100)/100;
        g[1] = Math.round(g[1]*100)/100;
      } else {
        roundCoord(g);
      }
    });
    return geom;
  }

  const features = vector.getSource().getFeatures();
  features.forEach((feature) => {
    const f = {
      attributes: feature.getProperties(),
      type: feature.getGeometry().getType(),
      style: feature.getIgnStyle(),
      coords: roundCoord( feature.getGeometry().getCoordinates() ), 
      popupcontent: {"active":false,"title":"","desc":"","img":"","coord":false}
    }
    delete (f.attributes.geometry);
    layer.features.push(f)
  });

  // Export
  FileSaver.saveAs(
    new Blob([JSON.stringify(macarte)],
    {type:"text/plain;charset=utf-8"}),
    map.get('type')+'.carte'
  );
}

// Go!
$("#menu .download").click(() => download);

const dload = new Button ({
  className: 'download',
  html: '<i class="fa fa-download"></i>',
  handleClick: download
});
map.addControl(dload);
