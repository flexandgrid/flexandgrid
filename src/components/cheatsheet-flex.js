const titles = document.querySelectorAll('h2');
const properties = [];
titles.forEach((v) => {
  properties.push(v.textContent);
})

const containers = document.querySelectorAll('.container');
const radios = document.querySelectorAll('input[type="radio"]');
for (let radio of radios) {
  radio.addEventListener('change', (e) => {
    let target = e.target;
    let container = document.querySelector(`#cont-${target.name}`);
    let propNum = [...target.name].pop();
    let radioName = document.querySelector(`label[for="${radio.id}"]`).textContent;
    if (target.checked) {
      let code = document.querySelectorAll('em')[propNum];
      let newCode = `${properties[propNum]} : ${radioName};`
      container.style.cssText = newCode;
      code.textContent = newCode;
    }
  });
}
