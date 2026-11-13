const questions = [
  {q: '',a: 'ExceLVBAiSGoD!!!^v^'},
  {q: '',a: ''}
];
let index = 0;

const passInput = document.querySelector('#password');
const mysmsg = document.querySelector('#mysmsg');
const questionEl = document.querySelector('#question');

function showQuestion() {
  questionEl.textContent = questions[index].q;
  passInput.value = '';
}

showQuestion()

passInput.addEventListener('input', () =>{
  if (passInput.value === questions[index].a) {
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
