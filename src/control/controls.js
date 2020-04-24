import './controls.css'
import './layerswitcher.css'
import map from '../map'
import {vector} from '../map'
import SearchBAN from 'ol-ext/control/SearchBAN'
import Switcher from 'ol-ext/control/LayerSwitcher'
import ol_control_Button from 'ol-ext/control/Button'
import config from '../config'

const search = new SearchBAN ();
map.addControl(search);
search.on('select', (e) => {
  map.getView().setCenter(e.coordinate);
});

const switcher = new Switcher ();
map.addControl(switcher);

// Color control
const brush = ['default', 'circle', 'square', 'Indifférencié', 'Monument'];
let current = 0;
const paint = new ol_control_Button({
  className: 'paint',
  html: '<i class="fa fa-paint-brush"></i>',
  handleClick: () => {
    if (map.get('type')==='signalement') {
      current = (current+1)%brush.length;
      vector.getSource().getFeatures().forEach((f) => {
        f.setIgnStyle ( config.ignStyle['default'][brush[current]] );
      });
      vector.getSource().changed();
    }
  }
});
map.addControl(paint);