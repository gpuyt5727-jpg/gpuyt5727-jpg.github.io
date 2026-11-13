const passInput = document.querySelector('#password');
const mysmsg = document.querySelector('#mysmsg');
passInput.addEventListener('input', () =>{
  const pass = passInput.value;
  if (pass === 'ExceLVBAiSGoD!!!^v^') {
    mysmsg.textContent = '正解！';
  }
})
