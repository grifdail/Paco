var ActionsByName = {
  goTo: 1,
  load: 2,
  setVariable: 3,
  incrementVariable: 4,
  multiplyVariable: 5,
  toggle: 6,
}
var Actions = {};
Actions[ActionsByName.goTo] = function(a) {
  setUpScene(a.target);
}
Actions[ActionsByName.load] = function(a) {
  loadScene(a.target);
}
Actions[ActionsByName.setVariable] = function(a) {
  variables[a.variable] = Number(a.value);
}
Actions[ActionsByName.incrementVariable] = function(a) {
  variables[a.variable] += Number(a.value);
}
Actions[ActionsByName.multiplyVariable] = function(a) {
  variables[a.variable] *= Number(a.value);
}
Actions[ActionsByName.toggle] = function(a) {
  variables[a.variable] = Number(!variables[a.variable]);
}
const Conditions = {
  less: (a,b) => a<b,
  lessOrEqual: (a,b) => a<=b,
  greater: (a,b) => a>b,
  greaterOrEqual: (a,b) => a>=b,
  equal: (a,b) => a==b,
  different: (a,b) => a!=b,
}

var game = null;
var root = null;
var variables = {};

var req = new XMLHttpRequest();
req.open('GET', './game.json');
req.addEventListener("load", function() {
  game = JSON.parse(req.responseText);
  onGameLoaded();
})
req.send(null);

function onGameLoaded() {
  root = document.createElement("div");
  root.id = "root";
  document.body.appendChild(root);

  Object.keys(game.variables).reduce(function(old, key) {old[key] = 0; return old}, variables);
  setUpScene("origin");
}

function setUpScene(id) {
  var scene = getScene(id);
  cleanNode(root);
  //
  var image = document.createElement("img");
  image.classList.add("background");
  image.src = "./images/"+scene.image;
  root.appendChild(image);
  //
  importImages(scene.links);
  executeActions(scene.actions);
}
function loadScene(id) {
  var scene = getScene(id);
  importImages(scene.links);
  executeActions(scene.actions);
}
function getScene(id) {
  var scene = game.scenes[id];
  if (!scene) {
    throw new Error("No scene with id "+id);
  }
  return scene;
}

function importImages(images) {
  Object.keys(images).map(function(l) {return images[l]}).forEach(function(link) {
    var image = document.createElement("img");
    if (!checkConditions(link.conditions)) {
      return false;
    }
    image.classList.add("image");
    image.src = "./images/"+link.image;
    image.style.top = link.y+"px";
    image.style.left = link.x+"px";
    image.style.width = link.width+"px";
    image.style.height = link.height+"px";
    image.addEventListener("click", function() {executeActions(link.actions);})
    root.appendChild(image);
  })
}
function checkConditions(conditions) {
  return conditions.map(function(condition) {
    return Conditions[condition.type](variables[condition.variable], condition.value);
  }).indexOf(false) === -1;
}

function executeActions(actions) {
  actions.forEach(function (action) {
    if (Actions[action.type]) {
      Actions[action.type](action)
    } else {
      console.log("no action define for type " +action.type)
    }
  })
}

function cleanNode(node) {
  if (!node) {
    return;
  }
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}
