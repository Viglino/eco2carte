const config = {
  "title": "Eco2Carte",
  "apiKey": "choisirgeoportail",
  // Attributes / style
  ignStyle: { 
	  "default":{
			"default": { pointGlyph: "", pointForm: "marker", pointRadius: 15, symbolColor: "rgba(0,0,255,1)", pointColor: "rgba(0,0,255,1)", pointStrokeColor: "rgba(255,255,255,1)"},
			"circle": {"pointGlyph":"","pointForm":"circle","pointRadius":8,"symbolColor":"rgb(103, 78, 167)","pointColor":"rgba(0,0,255,1)","pointStrokeColor":"rgba(255,255,255,1)"},
			"orange": {"pointGlyph":"","pointForm":"circle","pointRadius":8,"symbolColor":"rgb(224, 102, 102)","pointColor":"rgba(0,0,255,1)","pointStrokeColor":"rgba(255,255,255,1)"},
			"square": {"pointGlyph":"","pointForm":"square","pointRadius":8,"symbolColor":"rgb(74, 134, 232)","pointColor":"rgba(0,0,255,1)","pointStrokeColor":"rgba(255,255,255,1)"},

			"Indifférencié": { pointGlyph: "ign-tourisme-gite", "pointForm":"marker","pointRadius":15,"symbolColor":"rgb(255, 255, 255)","pointColor":"rgb(103, 78, 167)","pointStrokeColor":"rgba(255,255,255,1)"},
			"Agricole": { pointGlyph: "ign-panneau-tracteur", "pointForm":"marker","pointRadius":15,"symbolColor":"rgb(255, 255, 255)","pointColor":"rgb(103, 78, 167)","pointStrokeColor":"rgba(255,255,255,1)"},
			"Annexe": { pointGlyph: "ign-loisir-chapiteau", "pointForm":"marker","pointRadius":15,"symbolColor":"rgb(255, 255, 255)","pointColor":"rgb(103, 78, 167)","pointStrokeColor":"rgba(255,255,255,1)"},
			"Commercial et services": { pointGlyph: "ign-commerce-boutique", "pointForm":"marker","pointRadius":15,"symbolColor":"rgb(255, 255, 255)","pointColor":"rgb(103, 78, 167)","pointStrokeColor":"rgba(255,255,255,1)"},
			"Industriel": { pointGlyph: "ign-industrie-engrenage", "pointForm":"marker","pointRadius":15,"symbolColor":"rgb(255, 255, 255)","pointColor":"rgb(103, 78, 167)","pointStrokeColor":"rgba(255,255,255,1)"},
			"Religieux": { pointGlyph: "ign-religion-abbaye", "pointForm":"marker","pointRadius":15,"symbolColor":"rgb(255, 255, 255)","pointColor":"rgb(103, 78, 167)","pointStrokeColor":"rgba(255,255,255,1)"},
			"Résidentiel individuel": { pointGlyph: "ign-construction-maison", "pointForm":"marker","pointRadius":15,"symbolColor":"rgb(255, 255, 255)","pointColor":"rgb(103, 78, 167)","pointStrokeColor":"rgba(255,255,255,1)"},
			"Résidentiel collectif": { pointGlyph: "ign-construction-immeuble", "pointForm":"marker","pointRadius":15,"symbolColor":"rgb(255, 255, 255)","pointColor":"rgb(103, 78, 167)","pointStrokeColor":"rgba(255,255,255,1)"},
			"Sportif": { pointGlyph: "ign-sport-course", "pointForm":"marker","pointRadius":15,"symbolColor":"rgb(255, 255, 255)","pointColor":"rgb(103, 78, 167)","pointStrokeColor":"rgba(255,255,255,1)"},

			"Monument": {"pointGlyph":"ign-loisir-musee","pointForm":"marker","pointRadius":15,"symbolColor":"rgb(255, 255, 255)","pointColor":"rgb(103, 78, 167)","pointStrokeColor":"rgba(255,255,255,1)"},
			"Château": {"pointGlyph":"ign-tourisme-tour","pointForm":"marker","pointRadius":15,"symbolColor":"rgb(255, 255, 255)","pointColor":"rgb(7, 55, 99)","pointStrokeColor":"rgba(255,255,255,1)"},
			"Eglise remarquable": {"pointGlyph":"ign-religion-eglise","pointForm":"marker","pointRadius":15,"symbolColor":"rgb(255, 255, 255)","pointColor":"rgb(127, 96, 0)","pointStrokeColor":"rgba(255,255,255,1)"},
			"Curiosité diverse": {"pointGlyph":"ign-top-etoile","pointForm":"marker","pointRadius":15,"symbolColor":"rgb(255, 255, 255)","pointColor":"rgb(166, 77, 121)","pointStrokeColor":"rgba(255,255,255,1)"},
			"Point de vue, table d'orientation": {"pointGlyph":"ign-tourisme-point_de_vue_3","pointForm":"marker","pointRadius":15,"symbolColor":"rgb(255, 255, 255)","pointColor":"rgb(106, 168, 79)","pointStrokeColor":"rgba(255,255,255,1)"},
			"Passerelle ou gué": {"pointGlyph":"ign-panneau-pont","pointForm":"marker","pointRadius":15,"symbolColor":"rgb(255, 255, 255)","pointColor":"rgb(60, 120, 216)","pointStrokeColor":"rgba(255,255,255,1)"},
			"Moulin": {"pointGlyph":"ign-tourisme-moulin","pointForm":"marker","pointRadius":15,"symbolColor":"rgb(255, 255, 255)","pointColor":"rgb(120, 63, 4)","pointStrokeColor":"rgba(255,255,255,1)"},
		}
	}
};

export default config