const empty = {
  "param":{
    "lon":-4.236230487956517,
    "lat":48.60262689304386,
    "rot":null,
    "zoom":11,
    "titre":"Sans titre",
    "description":"Pas de description",
    "status":"brouillon",
    "controlParams":{
      "limitGeo":"1",
      "zoomBtn":"1",
      "selectLayer":"1",
      "contextMap":"1",
      "legend":"1",
      "scaleLine":"1",
      "pSearchBar":"0",
      "coords":"0",
      "attribution":"1"
    },
    "proj":{
      "valeur":"EPSG:4326",
      "unite":"ds"
    }
  },
  "legende":{
    "legendVisible":false,
    "legendPos":"bottom-left",
    "legendWidth":300,
    "lineHeight":55,
    "legendParam":{
      "width":300,
      "lineHeight":55
    },
    "legendtitle":"Ma légende",
    "legend":[]
  },
  "layers":[
    {
      "type":"Geoportail","name":"Plan IGN","titre":"sans-titre","visibility":true,
      "layer":"GEOGRAPHICALGRIDSYSTEMS.PLANIGN"
    },{
      "dessin":true,
      "type":"Vector","name":"Dessin","titre":"Signalements","visibility":true,"opacity":1,
      "popupContent":{},
      "style":{},
      "features":[]
    }
  ],
  "symbolLib":{}
};

export default empty