const btn = document.querySelector('#btn');
const text = document.querySelector('#text');
const word = '精神';
let once = 0
function updateLabel() {
  btn.textContent = `このボタンを押すと${once}個の${word}が追加されます`;
}
updateLabel();
btn.addEventListener('click',() => {
  text.textContent += word.repeat(once);
});

setInterval(() => {
  text.textContent += word;
  once++;
  updateLabel();
},1000);
