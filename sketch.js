var dog, dogImg1, dogImg2, database, foodS, foodStock;
var fedTime, lastFed;
var form, food;
var dogName, dogNameRef;
var gameState, gameStateRef;

function preload() {
  dogImg1 = loadImage("images/dogImg.png");
  dogImg2 = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();

  createCanvas(1175, 505);
  
  dog = createSprite(980, 250, 100, 100);
  dog.addImage(dogImg1);
  dog.scale = 0.5;

  foodStock = database.ref("food");
  foodStock.on("value", function(data){
    foodS = data.val();
  });

  dogName = database.ref('dogName');
  dogName.on("value", function(data){
    dogNameRef = data.val();
  })

  gameState = database.ref('gameState');
  gameState.on("value", function(data){
    gameStateRef = data.val();
  })

  food = new Food();
  food.getFoodStock();

  form = new Form();
}

function draw() {  
  if (gameStateRef === 0) {
    form.display();
  } else if (gameStateRef === 1) {
    form.hide();

    showButtons();

    background(46, 139, 87);

    fill(255,165,79);
    rect(-2, 375, 1300, 200);

    drawSprites();

    if (this.foodStock !== 0) {
      for (var i = 0; i < foodS; i++) {
        if (i % 10 === 0) {
          food.display(); 
        }
      }
    }

    fedTime = database.ref("feedTime");
    fedTime.on("value", function(data){
      lastFed = data.val();
    })

    textSize(30);
    fill("white");
    text('Press the buttons to make food and feed it to ' + dogNameRef + ' the dog!', 6, 30);


    textSize(40);
    fill(255, 255, 254);
    if (lastFed >= 12) {
      text('Last Fed: ' + lastFed % 12 + ' pm', 150, 85);
    } else if (lastFed === 12) {
      text('Last Fed: 12 am', 150, 85)
    } else {
      text('Last Fed: ' + lastFed + ' am', 150, 85)
    }
  }
}

function addFood() {
  if (foodS >= 20) {
    foodS = 20;
  } else {
    foodS = foodS + 1;
  }
  database.ref('/').update({
    "food": foodS
  });
  dog.addImage(dogImg1);
}

function feedFood() {
  if (foodS < 0) {
    foodS = 0;
  } else {
    foodS = foodS - 1;
  }
  database.ref('/').update({
    "food": foodS,
    "feedTime": hour()
  });
  dog.addImage(dogImg2);
}

function showButtons() {
  feedButton = createButton('Feed Dog');
  feedButton.position(80, 140);
  feedButton.mousePressed(() => {
    feedFood();
  })
  addButton = createButton('Add Food');
  addButton.position(80, 110);
  addButton.mousePressed(() => {
    addFood();
  })
}