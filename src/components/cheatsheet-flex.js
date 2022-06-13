const titles = document.querySelectorAll("h2");
const properties = [];
titles.forEach((v) => {
  properties.push(v.textContent);
});

const containers = document.querySelectorAll(".container");
const radios = document.querySelectorAll('input[type="radio"]');
const labels = document.querySelectorAll(".label-option");
const code = document.querySelectorAll("em");

for (let radio of radios) {
  radio.addEventListener("change", (e) => {
    let target = e.target;
    let container;
    let radioName;
    let newCode;

    containers.forEach((v) => {
      if (v.classList.contains(target.name)) {
        container = v;
      }
    });
    let propNum = [...target.name].pop();

    labels.forEach((v) => {
      if (v.classList.contains(radio.id)) {
        radioName = v.textContent;
      }
    });

    if (target.checked) {
      newCode = `${properties[propNum]} : ${radioName};`;
      container.style.cssText = newCode;
      code[propNum].textContent = newCode;
    }
  });
}


