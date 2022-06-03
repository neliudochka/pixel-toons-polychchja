function genDOM(type, properties, attributies) {
  let DOM = document.createElement(type);
  if (properties) Object.assign(DOM, properties);
  for(const attr of Object.keys(attributies)) {
    DOM.setAttribute(attr, attributies[attr]);
  }
  return DOM;
}

/* example of usage
const canvas = document.getElementById("canvas");
canvas.appendChild(genDOM("div", {
  id: 'id',
  onclick: () => id.style.backgroundColor = 'green'
}, 
{class: "button"}
  ));
*/

export{genDOM};