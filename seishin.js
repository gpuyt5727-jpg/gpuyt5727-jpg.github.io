const btn = document.querySelector('#btn');
const text = document.querySelector('#text');
btn.addEventListener('click',() => {
  text.textContent += '精神';
});

setInterval(() => {
  text.textContent += '精神';
},1000);
