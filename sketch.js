let snow = [];
let gravity;

let zOff = 0;

let spritesheet;
let textures = [];
function preload() {
	spritesheet = loadImage('flakes32.png');
	soundFormats('mp3', 'ogg');
    mySound = loadSound('sound.mp3');


}

function setup() {

    mySound.setVolume(0.3);
    mySound.play();
    mySound.loop();

	createCanvas(windowWidth, windowHeight);
	gravity = createVector(0, 0.3); //adjust second parameter for gravity power

	for (let x = 0; x < spritesheet.width; x += 32){
		for (let y = 0; y < spritesheet.height; y += 32){
			img = spritesheet.get(x, y, 32, 32);
			image(img, x, y);
			textures.push(img);
		}
	}

	//i is total number of snowflakes on the screen at a particular instance of time
	for (let i = 0; i < 400; i++){
		let x = random(width);
		let y = random(height);
		let design = random(textures);
		snow.push(new Snowflake(x, y, design));
	}



}

function draw() {
	background(0);
	//snow.push(new Snowflake());


	// //control wind from mouse
	// let wx = map(mouseX, 0, width, -0.05, 0.05);
	// let wind = createVector(wx, 0);

	zOff += 0.01;

	for (flake of snow) {
		let xOff = flake.pos.x / width;
		let yOff = flake.pos.y / height;
		let wAngle = noise(xOff, yOff, zOff) * TWO_PI;
		let wind = p5.Vector.fromAngle(wAngle);
		wind.mult(0.1); //adjust this for wind power
		

		flake.applyForce(gravity);
		flake.applyForce(wind);
		flake.render();
		flake.update();
	}

	// for (let i = snow.length - 1; i >= 0; i--){
	// 	if (snow[i].offScreen()) {
	// 		snow.splice(i, 1);
	// 	}
	//}
}