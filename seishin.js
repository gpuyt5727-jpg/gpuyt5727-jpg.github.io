const btn = document.querySelector('#btn');
const text = document.querySelector('#text');
const count = document.querySelector('#count');
const upBtn = document.querySelector('#up');
const upmaxBtn = document.querySelector('#up-max');
const word = '精神';
let cost = 10;
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
  upmaxBtn.disabled = total < cost;
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
  cost = Math.round(cost*1.1);
  updateCount();
  updateUp();
});
upmaxBtn.addEventListener('click', () => {
  let spent = 0;    //spentという変数を宣言。初期値は0
  while (total >= cost) {  
    total -= cost;  //精神の量（数字）を減らす
    spent += cost;  //spentに減らした精神の量を増やす
    rate++;         //一度に増える量を1増やす
    cost = Math.round(cost * 1.1);
  };
  if (spent === 0) return;  //何も買えなかった場合不具合が起こる可能性があるため
  text.textContent = text.textContent.slice(0, -word.length * spent);
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
