const here = location.pathname.replace(/\/$/, '/index.html');
document.querySelectorAll('nav a').forEach(a=>{
  if(new URL(a.href).pathname === here){
    a.setAttribute('aria-current', 'page');
  }
});
