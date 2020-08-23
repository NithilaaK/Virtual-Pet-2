class Food {
    constructor(foodStock) {
      this.foodStock = 0;
      this.lastFed;
      this.image = loadImage("images/Milk.png");

      console.log(this.foodStock);
    }

    deductFood(){
      if (foodS > 0) {
        foodS = foodS - 1;
      }
    }

    getFoodStock(){
      return this.foodStock;
    }

    updateFoodStock(foodStock) {
      this.foodStock = foodStock;
    }

    display() {
      var x = 130;
      var y = 230;

      imageMode(CENTER);

      if (foodS !== 0) {
        for (var i = 0; i < foodS; i++) {
            x = x + 20;
            y = y;
            image(this.image, x, y, 100, 100);
            x = x + 50;
        }
      }
    }
}