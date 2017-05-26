function Heart(x, y) {
	this.x = x;
	this.y = y;

	this.show = function() {
		noStroke();
		fill(255, 0, 0);
		triangle(this.x + 20, this.y - 28, this.x, this.y, this.x - 20, this.y - 28);
		arc(x - 9.5, y - 30, 20, 20, PI*2, 0);
		arc(x + 9.5, y - 30, 20, 20, PI*2, 0);
	}
}