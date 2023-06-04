document.addEventListener('DOMContentLoaded', function() {
    var toggle = document.querySelector('.toggle-input');
    toggle.addEventListener('change', function() {
        if (this.checked) {
            formatarTextos();
            console.log('Toggle ativado');
          } else {
            removerFormatacaoTextos();
            console.log('Toggle desativado');
          }
    });
  });
  
  function formatarTextos() {
    const elementosTxt = document.getElementsByClassName('txt');
    
    for (let i = 0; i < elementosTxt.length; i++) {
      let elemento = elementosTxt[i];
      let texto = elemento.textContent;
      
      if (texto.length >= 2) {
        let duasPrimeirasLetras = texto.substring(0, 2);
        let restante = texto.substring(2);
        elemento.innerHTML = `<strong>${duasPrimeirasLetras}</strong>${restante}`;
      } else {
        elemento.innerHTML = `<strong>${texto}</strong>`;
      }
    }
  }

  function removerFormatacaoTextos() {
    const elementosTxt = document.getElementsByClassName('txt');
    
    for (let i = 0; i < elementosTxt.length; i++) {
      let elemento = elementosTxt[i];
      elemento.innerHTML = elemento.textContent;
    }
  };
