const questions = [
  {q: '',a: 'e27cc8bffa3ea90da325964dfd4563ce227fdc950dce4f4fcdf8d8eafcd9aaed'},
  {q: 'タブを見てみて',a: 'dfcdfb63a0e9f8ded3dcba6cdb88bddf60e0dacf780b30b054362c61c3324d21'}
];
let index = 0;

const passInput = document.querySelector('#password');
const mysmsg = document.querySelector('#mysmsg');
const questionEl = document.querySelector('#question');

function showQuestion() {
  questionEl.textContent = questions[index].q;
  passInput.value = '';
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
