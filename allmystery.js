const questions = [
  {q: '',a: 'e27cc8bffa3ea90da325964dfd4563ce227fdc950dce4f4fcdf8d8eafcd9aaed'},
  {q: 'りんごって打ってみて',a: '4261abfc91324dc5319312592125610a16b0b0a996fcdfae1d24766b918afae9'}
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
