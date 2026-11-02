const btn = document.querySelector('#btn');
const text = document.querySelector('#text');
const count = document.querySelector('#count');
const upBtn = document.querySelector('#up');
const word = '精神';
const cost = 10;
let once = 0;
let total = 0;
let rate = 1;
function updateLabel() {
  btn.textContent = `このボタンを押すと${once}個の${word}が追加されます`;
}
function updateCount() {
  count.textContent = `現在の${word}は${total}個です`;
}
function updateUp() {
  upBtn.textContent = `${word}${cost}個で、毎秒の増加量を+1（現在+${rate}）`;
  upBtn.disabled = total < cost;
}
updateUp();
updateCount();
updateLabel();
btn.addEventListener('click',() => {
  text.textContent += word.repeat(once);
  total += once;
  updateCount();
  updateUp();
});
upBtn.addEventListener('click', () => {
  if (total < cost) return;
  total -= cost;
  text.textContent = text.textContent.slice(0, -word.length * cost);
  rate++;
  updateCount();
  updateUp();
});
setInterval(() => {
  text.textContent += word;
  total++;
  once += rate;
  updateLabel();
  updateCount();
  updateUp();
},1000);
