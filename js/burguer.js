document.addEventListener('DOMContentLoaded', function() {
    const hamburguerIcon = document.querySelector('.hamburguer-icon');
    const menuLista = document.querySelector('.menu-hamburguer-lista');
  
    menuLista.classList.add('hide');
  
    hamburguerIcon.addEventListener('click', function() {
      menuLista.classList.toggle('active');
    });
  });
  