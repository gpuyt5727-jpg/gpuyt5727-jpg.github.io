const menubtn = document.querySelector('#menu-btn');
const nav = document.querySelector('nav');
const here = location.pathname.replace(/\/$/, '/index.html');
document.querySelectorAll('nav a').forEach(a=>{
  if(new URL(a.href).pathname === here){
    a.setAttribute('aria-current', 'page');
  }
});
menubtn.addEventListener('click',() =>{
  nav.classList.toggle('open');
});
