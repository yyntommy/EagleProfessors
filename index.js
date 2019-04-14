
Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
}
var rawscore = 0;
var personalized = 0;
count = 0;
totalweight = 0;

if(document.getElementById("init")){
  var rater1 = {gpa:"3.80", major:"Mathematics", classes:"2", year:"4"};
  var rater2 = {gpa:"2.80", major:"English", classes:"1", year:"1"};
  var rater3 = {gpa:"1.80", major:"History", classes:"6", year:"3"};
  var rater4 = {gpa:"3.60", major:"Computer Science", classes:"3", year:"2"};
  var rater5 = {gpa:"3.20", major:"English", classes:"9", year:"2"};
  var rate1 = {rater:rater1, score:"5"};
  var rate2 = {rater:rater2, score:"1"};
  var rate3 = {rater:rater3, score:"2"};
  var rate4 = {rater:rater4, score:"3"};
  var rate5 = {rater:rater5, score:"5"};
  var vahid = [rate1, rate2, rate3, rate4, rate5];
  localStorage.setObj("special", vahid);
}


function updatecurrent(){
  localStorage.setItem("a", document.getElementById("gpa").value);
  localStorage.setItem("b", document.getElementById("major").value);
  localStorage.setItem("c", document.getElementById("year").value);
  localStorage.setItem("d", document.getElementById("numclass").value);
}

function score(value, index, array){
  rawscore = rawscore + Number(value.score);
  count = count + 1;
}

function pscore(value, index, array){
  var weight = 0;
  var first = localStorage.getItem("a");
  var second = localStorage.getItem("b");
  var third = localStorage.getItem("c");
  var fourth = localStorage.getItem("d");
  if ((4 - Math.abs(Number(value.rater.gpa)-Number(first)) * 3) < 0 ){
    weight = weight;
  } else {
    weight = 4 - Math.abs(Number(value.rater.gpa)-Number(first)) * 3;
  }
  if (second == value.rater.major){
    weight = weight + 2;
  }
  if (Math.abs(Number(third) - Number(value.rater.year)) < 2) {
    weight = weight + 1;
  }
  if (Math.abs(Number(fourth) - Number(value.rater.calsses)) < 2) {
    weight = weight + 3;
  } else if (Math.abs(Number(fourth) - Number(value.rater.calsses)) < 4){
    weight = weight + 2;
  } else if (Math.abs(Number(fourth) - Number(value.rater.calsses)) < 6){
    weight = weight + 1;
  }
  personalized = personalized + weight * Number(value.score);
  totalweight = totalweight + weight

}

vahid = localStorage.getObj("special");
vahid.forEach(score);
vahid.forEach(pscore);
console.log(vahid);

rawscore = rawscore / count;
rawscore = rawscore.toFixed(2);
personalized = personalized / totalweight;
personalized = personalized.toFixed(2)

if(document.getElementById("1")){
  document.getElementById("1").innerHTML = rawscore;
  document.getElementById("2").innerHTML = personalized;
}

if(document.getElementById("raw")){
  document.getElementById("raw").innerHTML = rawscore;
  document.getElementById("per").innerHTML = personalized;
}

function rateprof(){
  var first = localStorage.getItem("a");
  var second = localStorage.getItem("b");
  var third = localStorage.getItem("c");
  var fourth = localStorage.getItem("d");
  var curr = {gpa:first, major:second, classes:fourth, year:third};
  var newscore = document.getElementById("newsco").value;
  var newrater = {rater:curr, score:newscore};
  var vahid = localStorage.getObj("special");
  vahid.push(newrater);
  localStorage.setObj("special", vahid);
  location.reload();
}

var color = Chart.helpers.color;

function generateData() {
  var data = [];
  vahid = localStorage.getObj("special");
  for (var i = 0; i < vahid.length; i++) {
    data.push(vahid[i].score);
  }
  return data;
}


function generateLabel(){
  var labels = []
  vahid = localStorage.getObj("special");
  for (var i = 0; i < vahid.length; i++) {
    var x = vahid[i].rater.major;
    var y = vahid[i].rater.gpa;
    var z = x + ": " + y;
    labels.push(z);
  }
  return labels;
}
