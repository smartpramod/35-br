
//dog
var  dog;
var dogImage;
var dogImage2;
//database
var database;
var add;
//food
var foodS;
var foodStock;
var fedTime; 
var lastFed;
var foodobject;
var feed; 
//milk
var milk; 
var milk1;
var milkImage;
var milkImage1;

function preload(){
dogImage=loadImage("images/dogImg.png");
dogImage2=loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  console.log(database);
  createCanvas(500, 500);
  
  foodobject=new Food(); 

  feed=createButton("feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);
  
  add=createButton("add food");
  add.position(600,95);
  add.mousePressed(addfoods);



  dog=createSprite(449,250);
  dog.addImage(dogImage);
  dog.scale = 0.15;

  foodStock = database.ref('food');
    foodStock.on("value", readStock);
   // foodStock.set(1);
  
  
  
  

  
  

}


function draw() { 
  background("orange");
  
  foodobject.display();

  fill(255,255,254);
  textSize(20);
  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
  lastFed = data.val()  
  });
  if(lastFed>=12){
  text("Last Feed: "+ lastFed%12+ "PM",350,30);  
  }else if(lastFed==0){
  text("Last Feed:12 AM",350,30);    
  }else{
  text("Last Feed: "+ lastFed+ "AM",350,30);    
  }
   
  if(foodS == 0){
    dog.addImage(dogImage);
    foodS = 0;
  }

 
  drawSprites();
 
}





function readStock(data){
  foodS = data.val();
  foodobject.updateFoodStock(foodS);
}



function feedDog(){
  dog.addImage(dogImage2);
  foodobject.updateFoodStock(foodobject.getFoodStock()-1);
  database.ref('/').update ({
  food:foodobject.getFoodStock(),
  FeedTime:hour(),
  })
}


function addfoods(){
  dog.addImage(dogImage);
  foodS++;
  database.ref('/').update ({
  food:foodS
  })
}


