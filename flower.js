function Flower(x, y) {
	this.x = x;
	this.y = y;
	this.r = 20;
	this.toDisappear = false;

	this.show = function() {
		fill(255, 0, 200);
		ellipse(this.x, this.y, this.r*2, this.r*2);
	}

	this.shrink = function() {
		this.r -= 1;
		if (this.r <= 10) {
			this.toDisappear = true;
		}
	}
}