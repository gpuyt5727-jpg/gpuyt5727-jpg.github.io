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
function siren() {
　ac.resume();
  const t = ac.currentTime;
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  const pan = ac.createStereoPanner();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(300, t);
  osc.frequency.linearRampToValueAtTime(1200, t + 1);
  osc.frequency.linearRampToValueAtTime(300, t + 2);
  osc.frequency.linearRampToValueAtTime(1200, t + 3);
  osc.frequency.linearRampToValueAtTime(300, t + 4);
  osc.frequency.linearRampToValueAtTime(1200, t + 5);
  osc.frequency.linearRampToValueAtTime(300, t + 6);
  osc.frequency.linearRampToValueAtTime(1200, t + 7);
  osc.frequency.linearRampToValueAtTime(300, t + 8);
  
  pan.pan.setValueAtTime(-1, t);
  pan.pan.linearRampToValueAtTime(1, t + 2);
  pan.pan.linearRampToValueAtTime(-1, t + 4);
  pan.pan.linearRampToValueAtTime(1, t + 6);
  pan.pan.linearRampToValueAtTime(-1, t + 8);
　gain.gain.setValueAtTime(0.3, t);
　gain.gain.linearRampToValueAtTime(0, t + 8);

  osc.connect(gain);
  gain.connect(pan);
  pan.connect(ac.destination);
  osc.start(t);
  osc.stop(t + 8);
};
document.querySelector('#sound').addEventListener('click',beep);
document.querySelector('#siren').addEventListener('click',siren);
