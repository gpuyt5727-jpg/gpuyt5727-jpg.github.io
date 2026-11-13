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
const dangerBtn = document.querySelector('#danger');
const gaugeBar = document.querySelector('#gauge-bar');
let timer = null;



function startHold() {
  gaugeBar.classList.add('holding');
  timer = setTimeout(() => {
    gaugeBar.classList.remove('holding');
    timer = null;
    alert('実行しました！');
  }, 2000);
}

function cancelHold() {
  if (timer === null) return;
  clearTimeout(timer);
  timer = null;
  gaugeBar.classList.remove('holding');
}

dangerBtn.addEventListener('pointerdown', startHold);
dangerBtn.addEventListener('pointerup', cancelHold);
dangerBtn.addEventListener('pointerleave', cancelHold);

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

const guessInput = document.querySelector('#guess');
const goBtn = document.querySelector('#go');
const againBtn = document.querySelector('#again');
const msg = document.querySelector('#msg');

let answer = Math.floor(Math.random() * 100) + 1;
let tries = 0;

goBtn.addEventListener('click', () => {
  const n = Number(guessInput.value);
  tries++;
  beep();
  if (n < answer) {
    msg.textContent = '答えより小さいよ！';
  } else if (n > answer) {
    msg.textContent = '答えより大きいよ！';
  } else {
    msg.textContent = `正解！${tries}回目で当てられたね！`;
  }
});
againBtn.addEventListener('click',() => {
  answer = Math.floor(Math.random() * 100) + 1;
  tries = 0;
  guessInput.value = '';
  msg.textContent = '';
});
document.querySelector('#sound').addEventListener('click',beep);
document.querySelector('#siren').addEventListener('click',siren);
