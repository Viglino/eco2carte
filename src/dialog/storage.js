
let valdef = {
  login: '',
  attribut: '',
  limit: 200,
  groupe: '',
  valid: '',
  croquis: '',
};

// Gestion de valeurs par defaut
export default ({
  load: function() {
    // Load valdef 
    let vals = localStorage.getItem('Eco2Carte@params');
    if (vals) {
      try {
        valdef = JSON.parse(vals);
      } catch(e) {}
    }
    return valdef
  }, save (vals) {
    localStorage.setItem('Eco2Carte@params', JSON.stringify($.extend(valdef,vals)));
  }
})