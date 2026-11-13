const questions = [
  {q: 'こたえが分かったら下の入力欄に入力して下さい',a: 'e27cc8bffa3ea90da325964dfd4563ce227fdc950dce4f4fcdf8d8eafcd9aaed'},
  {q: 'タブを見てみて',a: 'dfcdfb63a0e9f8ded3dcba6cdb88bddf60e0dacf780b30b054362c61c3324d21'},
  {q: 'ボタンが...?',a: '6e429977a416613aa57a781f5546566661874969fe5b785ac82363262453ac1e'},
  {q: 'If you want to move on to the next step, write down this word!!! "What is your name? Oh, so it is Big Name. thanks!"Anyway, I am going to use this for my trading. So, good luck!',a: '4f9c86b946d26273b77b7e7355acdb1d64f599604ef6f117e117fa7bf5bffad9'}
];
let index = 0;

const passInput = document.querySelector('#password');
const mysmsg = document.querySelector('#mysmsg');
const questionEl = document.querySelector('#question');
const holdBtn = document.querySelector('#hold');
const hintEl = document.querySelector('#hint');


let holdTimer = null;

function showQuestion() {
  questionEl.textContent = questions[index].q;
  passInput.value = '';
  holdBtn.hidden = index !== 2;
  questionEl.classList.toggle('mirror', index === 3);
}
async function sha256(text) {
  const data = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(buf)]
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
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
