const btn = document.querySelector('#btn');
const text = document.querySelector('#text');
const word = '精神';
let once = 0
btn.addEventListener('click',() => {
  text.textContent += word.repeat(once);
});

setInterval(() => {
  text.textContent += word;
  once++;
},1000);
