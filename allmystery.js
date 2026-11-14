const questions = [
  {q: 'こたえが分かったら下の入力欄に入力して下さい',a: 'e27cc8bffa3ea90da325964dfd4563ce227fdc950dce4f4fcdf8d8eafcd9aaed'},
  {q: 'お！タブを見てみて。',a: 'dfcdfb63a0e9f8ded3dcba6cdb88bddf60e0dacf780b30b054362c61c3324d21'},
  {q: 'ひみつのぼたんが。',a: '6e429977a416613aa57a781f5546566661874969fe5b785ac82363262453ac1e'},
  {q: 'いやだ～英文の時間です。If you want to move on to the next step, write down this word!!! "What is your name? Oh, so it is Big Name. thanks!"Anyway, I am going to use this for my trading. So, good luck!',a: 'b18ec09ae3286428317b36aed132bea5d4c71ae2278c2144789e3b9b4cc72f5b'},
  {q:'がまがえるが大好きです！！！、と入力して' , a:'dddaf0ae7d61f9f581d45279931ae5b4adc12077373c22a660c34af31a885778'},
  {q:'だいすきな宝探しの時間！',a:'96e232d283db09e93fa778c45507cc3fdc5fbb66497714fe841c90c533e3bf2d'},
  {q:'',a:''}
];
let index = 0;

const passInput = document.querySelector('#password');
const mysmsg = document.querySelector('#mysmsg');
const questionEl = document.querySelector('#question');
const holdBtn = document.querySelector('#hold');
const hintEl = document.querySelector('#hint');
const midAnswer = document.querySelector('#mid-answer');

const pads = document.querySelectorAll('.pad');

let holdTimer = null;

function showQuestion() {
  questionEl.textContent = questions[index].q;
  passInput.value = '';
  holdBtn.hidden = index !== 2;
  midAnswer.hidden = index !==5;
  questionEl.classList.toggle('mirror', index === 3);
  questionEl.classList.toggle('narrow', index === 4);
  document.body.classList.toggle('long', index ===5);

  pads.forEach(pad => {
  pad.hidden = index !== 6;
});
}
async function sha256(text) {
  const data = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(buf)]
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}
function flash(i){
  pads[i].classList.add('lit');
  setTimeout(() => {
    pads[i].classList.remove('lit');
  },300);
  }

showQuestion()

passInput.addEventListener('input', async () =>{
  const hash = await sha256(passInput.value.trim());
  if (hash === questions[index].a) {
    index++;
    if (index >= questions.length) {
      questionEl.textContent = '全問正解！';
      passInput.hidden = true;
    } else{
      showQuestion();
      mysmsg.textContent = '正解！';
    }
    mysmsg.classList.remove('hide');
  }
});



holdBtn.addEventListener('pointerdown', () => {
  holdTimer = setTimeout(() => {
    holdTimer = null;
    hintEl.hidden = false;
    setTimeout(() => {
      hintEl.hidden = true;
    }, 300);
  }, 2000);
});

function cancelHold() {
  if (holdTimer === null) return;
  clearTimeout(holdTimer);
  holdTimer = null;
}

holdBtn.addEventListener('pointerup', cancelHold);
holdBtn.addEventListener('pointerleave', cancelHold);



pads.forEach(pad => {
  pad.addEventListener('click', () => {
    const i = Number(pad.dataset.i);
    flash(i);
  });
});
