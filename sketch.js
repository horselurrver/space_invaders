var ship;
var flowers = [];
var drops = [];
var counter = 0; // for movement of flowers
var sign = 1;
var score = 0;
var numKills = 0;
var enemyDrops = [];
var enemyCounter = 0; // for movement of enemy drops
var hearts = [];
var heart;

function setup() {
	createCanvas(600, 400);
	noCursor();
	textSize(32);
	ship = new Ship();
	for (var i = 0; i < 6; i++) {
		flowers[i] = new Flower(i*80+80, 60);
	}

	for (var i = 0; i < 3; i++) {
		hearts[i] = new Heart(i*80+40, height - 10);
  	}
}

function draw() {
  background(51);
  fill(255, 255, 255);
  text(score, 10, 30);

  for (var i = 0; i < hearts.length; i++) {
  	hearts[i].show();
  }

  ship.show();

  // Control mechanism for moving ship right
  if (keyIsDown(RIGHT_ARROW)) {
		ship.move(1);
   }

  // Control mechanism for moving ship left
   if (keyIsDown(LEFT_ARROW)) {
		ship.move(-1);
	}
  
  // Displaying the flowers that were drawn in setup
  for (var i = 0; i < flowers.length; i++) {
		flowers[i].show();
	}

  // Drawing the drops from the shooter
  for (var i = 0; i < drops.length; i++) {
		drops[i].show();
		drops[i].move();
		for (var j = 0; j < flowers.length; j++) {
			if (drops[i].hits(flowers[j])) {
				flowers[j].shrink();
				drops[i].evaporate();
				score += 20;
			}
		}
	}

	enemyCounter++;

	// Drawing the enemy drops from the flowers
	for (var i = 0; i < enemyDrops.length; i++) {
		enemyDrops[i].show();
		enemyDrops[i].move();
		if (enemyDrops[i].hits(ship)) {
			enemyDrops[i].evaporate();
			// console.log("ouch!");
			hearts.pop();
		}
	}

	// Checks for which drops to get rid of because they've touched a flower
	for (var i = drops.length - 1; i >= 0 ; i--) {
		if (drops[i].toDelete) {
			drops.splice(i, 1);
		}
	}

	// Checks for which enemy drops to get rid of because they've touched the ship
	for (var i = enemyDrops.length - 1; i >= 0 ; i--) {
		if (enemyDrops[i].toDelete) {
			enemyDrops.splice(i, 1);
		}
	}

	// Gets rid of the drops and increases the number of kills
	for (var i = flowers.length - 1; i >= 0 ; i--) {
		if (flowers[i].toDisappear) {
			flowers[i].x = -10000;
			numKills += 1;
			flowers[i].toDisappear = false;
		}
	}

	counter++;

	// Control flower movement with counter
	for (var i = 0; i < flowers.length; i++) {
		flowers[i].x += 1*sign;
	}

	if (counter === 100) {
		sign *= -1;
		counter = 0;
	}

	// Generate enemy drops
	if (enemyCounter === 50) {
		for (var i = 0; i < flowers.length; i++) {
			var rand = Math.floor(Math.random()*2);
			if (rand === 0) {
				enemyDrops.push(new Enemy(flowers[i].x, flowers[i].y));
			}
		}
		enemyCounter = 0;
	}

	// What happens when the user wins the game by killing all flowers
	if ((numKills === flowers.length) || hearts.length === 0) {
		clear();
		background(51);
		textSize(50);
		fill(255, 255, 255);
		text("GAME OVER", width/2-150, height/2);
		text("SCORE: " + (score + hearts.length*30), width/2-150, height/2 + 60);
	}
}

function keyPressed() {
	if (key === ' ') {
		var drop = new Drop(ship.x, height);
		drops.push(drop);
	}
}
