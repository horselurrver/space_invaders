function Ship() {
	this.x = width/2;
	this.y = height - 20;
	this.r = 10;

	this.show = function() {
		fill(255);
		rectMode(CENTER);
		rect(this.x, this.y, this.r*2, 80);
	}

	this.move = function(dir) {
		this.x += (Math.abs(dir) + 5)*dir;
	}
}