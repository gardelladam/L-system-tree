
// Gui variables
let iterations;
let angle;
let angle2;
let branchLength;
let axiom;
let rules;

let randomY;
let randomX;
let randomY2;
let randomX2;

let branchSize;

let sentence;
let sentences = [];
let currentRules = [];
let randomNumbers = [];
let randomNumbers2 = [];





function generate() {
  var nextSentence = "";

  for (var i = 0; i < sentence.length; i++) {
    var current = sentence.charAt(i);
    var found = false;
    for (var j = 0; j < currentRules.length; j++) {
      if (current == currentRules[j].a) {
        found = true;
        nextSentence += currentRules[j].b;
        break;
      }
    }
    if (!found) {
      nextSentence += current;
    }
  }
  sentence = nextSentence;

  sentences.push(sentence);
}


function turtle() {
  branchSize = guiVar.width;
  len = guiVar.length;
  leafLength = guiVar.leaf_Length;
  leafWidth = guiVar.leaf_Width;
  let currentAngle = guiVar.angle;
  let currentSentence = sentences[guiVar.iterations];

  stroke(70, 40, 20);

  for (var i = 0; i < currentSentence.length; i++) {

    strokeWeight(branchSize);

    var current = currentSentence.charAt(i);
    if (current == "F") {
      //cylinder(0, len, 10, 10);
      line(0, 0, 0, 0, -len, 0)
      translate(0, -len, 0);
    } else if (current == "+") {
      rotateZ(currentAngle /*+ randomNumbers2[i % 50]*/);
      rotateY(randomNumbers[i % 50]);
      rotateX(randomNumbers[(i + 1) % 50]);


    } else if (current == "-") {

      rotateZ(-currentAngle /*+ randomNumbers2[(i + 2) % 50]*/);
      rotateY(randomNumbers[(i + 3) % 50]);
      rotateX(randomNumbers[(i + 4) % 50]);

    }
    else if (current == "[") {
      push();

    } else if (current == "]") {
      //branchSize = lastSize;

      fill(0, 100, 20)
      stroke(0, 100, 20)
      strokeWeight(leafWidth);
      line(0, 0, 0, 0, -leafLength, 0);
      pop();

    }
  }
}

function generateSentences() {
  sentences = [];
  sentence = rules.axiom;
  for (var i = 0; i <= 5; i++) {
    generate();
  }
}

function recalculateSystem() {
  currentRules[0] = { a: rules.rule0a, b: rules.rule0b }
  currentRules[1] = { a: rules.rule1a, b: rules.rule1b }
  generateSentences();
}

function random3Dangle() {
  randomNumbers = [];
  for (var i = 0; i <= 50; i++) {
    randomNumber = random(-guiVar.angle2, guiVar.angle2);
    randomNumbers.push(randomNumber);
  }
}

function treePreset() {

}

function guiVariables() {
  this.iterations = 1;
  this.angle = 25;
  this.angle2 = 0;
  this.length = 25;
  this.width = 1;
  this.leaf_Length = 5;
  this.leaf_Width = 2;
}
function guiRules() {
  this.axiom = "X";
  this.rule0a = "X";
  this.rule0b = "F-[[X]+X]+F[+FX]-X";
  this.rule1a = "F";
  this.rule1b = "FF";
}

function setup() {

  createCanvas(windowWidth - 200, windowHeight - 200, WEBGL);
  angleMode(DEGREES)

  guiVar = new guiVariables();
  rules = new guiRules();

  var obj = { Tree1: function () { console.log("clicked") } };


  let gui_tree = new dat.GUI();

  gui_tree.add(guiVar, 'iterations', 0, 5, 1);
  gui_tree.add(guiVar, 'angle', 1, 90, 1);
  angleController3D = gui_tree.add(guiVar, 'angle2', 0, 45, 1);
  gui_tree.add(guiVar, 'length', 1, 100);
  gui_tree.add(guiVar, 'width', 1, 50);
  gui_tree.add(guiVar, 'leaf_Length', 0, 50, 1);
  gui_tree.add(guiVar, 'leaf_Width', 0, 25, 1);


  const ruleFolder = gui_tree.addFolder("Rules");

  //ruleFolder.open();

  axiomController = ruleFolder.add(rules, 'axiom');
  ruleController1 = ruleFolder.add(rules, 'rule0a');
  ruleController2 = ruleFolder.add(rules, 'rule0b');
  ruleController3 = ruleFolder.add(rules, 'rule1a');
  ruleController4 = ruleFolder.add(rules, 'rule1b');

  const presetFolder = gui_tree.addFolder("Presets");

  presetFolder.add(obj, 'Tree1');

  presetFolder.open();


  currentRules[0] = { a: rules.rule0a, b: rules.rule0b }
  currentRules[1] = { a: rules.rule1a, b: rules.rule1b }

  generateSentences()

  random3Dangle();

  for (var i = 0; i <= 50; i++) {
    randomNumber = random(-10, 10);
    randomNumbers2.push(randomNumber);
  }

  angleController3D.onChange(function () {
    random3Dangle();
  });

  axiomController.onChange(function () {
    generateSentences();
  });

  ruleController1.onChange(function () {
    recalculateSystem();
  });
  ruleController2.onChange(function () {
    recalculateSystem();
  });
  ruleController3.onChange(function () {
    recalculateSystem();
  });
  ruleController4.onChange(function () {
    recalculateSystem();
  });

}

function draw() {
  translate(0, 100, 0)
  background(175);

  turtle();
  orbitControl()
  //branch(100)

}






function branch(length) {

  strokeWeight(map(length, 10, 100, 0.7, 5))
  stroke(70, 40, 20)

  if (length > minLength) {
    line(0, 0, 0, 0, -length - 1, 0)

    push()
    translate(0, -length, 0)
    rotateY(120)
    rotateZ(angle)
    branch(length * scaleVal)

    pop()

    push()
    translate(0, -length, 0)
    rotateY(120)
    rotateZ(-angle)
    branch(length * scaleVal)

    pop()

  } else {

    translate(0, -length, 0)
    //translate(5, 0, 0)
    rotateZ(90)
    fill(0, 100, 20)
    stroke(0, 100, 20)
    sphere(1, 20, 20)
  }

}




