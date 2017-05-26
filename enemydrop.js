function Enemy(x, y) {
	this.x = x;
	this.y = y;
	this.r = 5;
	this.toDelete = false;

	this.show = function() {
		noStroke();
		fill(255, 204, 0);
		ellipse(this.x, this.y, this.r*2, this.r*2);
	}

	this.move = function() {
		this.y = this.y + 2;
	}

	this.hits = function(ship) {
		var d = dist(this.x, this.y, ship.x, ship.y);
		if (d < (this.r + ship.r)) {
			return true;
		} else {
			return false;
		}
	}

	this.evaporate = function() {
		this.toDelete = true;
	}
}