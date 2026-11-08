const menubtn = document.querySelector('#menu-btn');
const nav = document.querySelector('nav');
const here = location.pathname.replace(/\/$/, '/index.html');
const ac = new AudioContext();
document.querySelectorAll('nav a').forEach(a=>{
  if(new URL(a.href).pathname === here){
    a.setAttribute('aria-current', 'page');
  }
});
menubtn.addEventListener('click',() =>{
  nav.classList.toggle('open');
});
function beep() {
  ac.resume();
  const osc = ac.createOscillator();
　const gain = ac.createGain();
　osc.type = 'sine';
  osc.frequency.value = 440;
  gain.gain.setValueAtTime(0.3, ac.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.5);
  osc.connect(gain);
  gain.connect(ac.destination);
  osc.start();
  osc.stop(ac.currentTime + 0.5);
}
document.querySelector('#sound').addEventListener('click',beep);
