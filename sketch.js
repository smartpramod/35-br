var dog,dogImg;
var happyDog,happyDogImg;
var database;
var foodS;
var foodStock;

var lastFed;
var foodObj;
var fedTime;
var addFood;
var feed;
var backImg;


function preload()
{
  dogImg=loadImage("dogImg.png")
  happyDogImg =loadImage("dogImg1.png")
  backImg = loadImage("backImg.jpg")
  
}

function setup() {

  createCanvas(660, 500);
  database = firebase.database();
 
  
  dog = createSprite(250,300,150,150);
  dog.addImage(dogImg)
  dog.scale=0.15;
  
   foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  foodObj = new Food();
  // textSize(20)

  feed=createButton("Feed the dog")
  feed.position(500,95)
  feed.mousePressed(feedDog);
    
  

  addFood= createButton("Add Food");
  addFood.position(600,95);
  addFood.mousePressed(addFoods);

  fedTime=database.ref("FeedTime");
  fedTime.on("value",function(data){
    lastFed=data.val();
  });


}


function draw() {  
  background(backImg);
  fill("yellow")
  strokeWeight(4)
  stroke("red")
  textFont("Bold")
  textSize(20)

//   if(keyWentDown(UP_ARROW))
//   {
// writeStock(foodS)
// dog.addImage(dogHappy);
//   }

if(lastFed>=12){
  text("Last Feed :"+ lastFed%14+"PM",350,63);

}else if(lastFed==0){
  text("Last Feed : 5AM", 415,63)
}else{
  text("Last Feed :" +lastFed %11+ "AM", 415,63);
}

foodObj.display();


  drawSprites();
  //add styles here

  fill("yellow");
  strokeWeight(4);
  stroke("red");
  text("Food Remaining : "+foodS,170,380);
  textSize(20);
  text("Note: Press the Buttons To Feed Drago Milk!!",90,10,500,500)
 

  // fill("yellow")
  // text(mouseX+","+mouseY,mouseX,mouseY)
}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

// function writeStock(x){

  // if(x<=0){
  //   x=0;
  //   }else{
  //     x=x-1;
  //   }

//   database.ref('/').update({
//     Food:x
//   })
// }
function feedDog(){
  dog.addImage(happyDogImg);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour(2)
  
  })
}

function addFoods(){
  foodS++;

  database.ref('/').update({
    Food:foodS
    
  })
}

