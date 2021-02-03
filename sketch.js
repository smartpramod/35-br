//Create variables here
var dog, happyDog;
var dogIMG, happyDogIMG;
var database;
var foodS, foodStock;


//load images here
function preload(){
  dogIMG = loadImage("images/dogImg.png")
  happyDogIMG = loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  
  dog = createSprite(250,250,20,20);
  dog.addImage(dogIMG);
  dog.scale=0.1;

  happyDog = createSprite(250,250,20,20);
  happyDog.addImage(happyDogIMG);
  happyDog.scale=0.1;
  happyDog.visible=false;

  foodStock=database.ref('Food');
  foodStock.on("value", readStock); 
}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.visible=false;
    happyDog.visible=true;
  }

  drawSprites();
  //add styles here
  textSize(21);
  stroke("black");
  fill("black");
  text("Food Remaining : "+foodS, 155, 350);

  textSize(18);
  stroke("black");
  fill("white");
  text("NOTE: Press UP Arrow Key to feed milk to Cooper", 50, 20);
}

//Function to read values from DB
function readStock(data) {
  foodS=data.val();
}

//Function to write values in DB
function writeStock(x) {

  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}