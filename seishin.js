const btn = document.querySelector('#btn');
const text = document.querySelector('#text');
const count = document.querySelector('#count');
const word = '精神';
let once = 0;
let total = 0;
function updateLabel() {
  btn.textContent = `このボタンを押すと${once}個の${word}が追加されます`;
}
function updateCount() {
  count.textContent = `現在の${word}は${total}個です`;
}
updateCount();
updateLabel();
btn.addEventListener('click',() => {
  text.textContent += word.repeat(once);
  total += once;
  updateCount()
});

setInterval(() => {
  text.textContent += word;
  total++;
  once++;
  updateLabel();
  updateCount();
},1000);
