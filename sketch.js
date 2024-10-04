/*
	The Game Project Part 6- Character Interaction
*/

var gameChar_x;
var gameChar_y;
var floorPos_y;

var isLeft;
var isRight;
var isFalling;
var collectables;
var isPlummeting = false;
var plummetingStartTime;
var plummetingDuration = 2000;
var jumpheight = 100;
var collectAudio = new Audio("Menu_Selection_Click.mp3")
var count = 1;
// new variables
var trees_x;
var clouds;
var mountain;

var cameraPosX = 0;

var canyons;
var collectables;
var gameOver;
var levelComplete;
var gameScore = 0;
var minCanyonSpacing = 200;


function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
	gameChar_x = 0;
	gameChar_y = floorPos_y;
    
    
    isLeft = 0;
    isRight = 0;
    isFalling = 0;
    gameOver = 0;
    levelComplete = 0;
   
    

    //flagpole obj
    flagpole = {
        x: 8000,
        y: 220,  
        w: 20,
        h: 215,    
        isReached: false
        
    }
    
    
    //trees_x array
    trees_x = [];
    trees_x.push({x:random(0,500), y:floorPos_y -200});
    for (var i= 1; i < 30; i++){
        trees_x.push({x: random(trees_x[i-1].x+200,trees_x[i-1].x+500), y:floorPos_y- 200 });}
        
    trees_y = floorPos_y;
    
    //mountains
    mountain = [];
    for(var i = 0; i < 40; i++){
        mountain.push({x: random(0, 8000), y:200, base: floorPos_y});
    }
    
    
    //clouds array
    
    clouds = [];
    for (var i=0; i < 40; i ++){
        clouds.push({x: random(0, 8000), y: random(50, 80), size:random(100, 150)});
    }
    
    //scroll
     //cameraPosX so that game character is centered
    cameraPosX = gameChar_x - width / 2;
    
    //canyons
     canyons= [];
    var canyon_x_start = 0;
    for (var i=0; i < 15; i++){
        var canyon_x = random(canyon_x_start, canyon_x_start+1000);
        canyon_x_start += canyon_x + 300;
        canyons.push({x: canyon_x, y: floorPos_y, 
        width: random(130,140)});
    }
    
    collectables = [];
        for (var i = 0; i < 10; i++){
            collectables.push({x:random(0, 8000), y: floorPos_y - 40, size: 40, isFound: false});
            
        }
   
}

function drawCollectables() {
    for (var i = 0; i < collectables.length; i++) {
        if (!collectables[i].isFound) {
            // Draw the collectable item
            noStroke();
            fill(250, 150, 200);
            circle(collectables[i].x, collectables[i].y, collectables[i].size);

            // Check if the game character has collected the collectable
            var distanceToCollectable = dist(gameChar_x, gameChar_y, collectables[i].x, collectables[i].y);
            
            
            if (distanceToCollectable < collectables[i].size) {
                
                collectables[i].isFound = true;
                gameScore++;
                //collectAudio.play();
                console.log("Item collected! Score: " + gameScore);
            }
            
            
        }
    }
}

function drawCanyons (){
    for(var i = 0; i < canyons.length; i++){
        noStroke();
        fill(92, 40, 0);
        rect(canyons[i].x, canyons[i].y, canyons[i].width, height - floorPos_y);
    }
}


//trees
function drawTree(){
    //trees
    for (var i = 0; i < trees_x.length; i++) {
        noStroke();
        fill(94,51,6);
        rect(trees_x[i].x, trees_x[i].y, 40, 200);
        fill(107, 22, 5);
        ellipse(trees_x[i].x + 20,trees_x[i].y,250,200);
    }
}
    
    //clouds
    
function drawCloud(){
    for (var i = 0; i < clouds.length; i++) 
    {
        noStroke();
        fill(255);
        ellipse(clouds[i].x,clouds[i].y,clouds[i].size);
        ellipse(clouds[i].x - 60, clouds[i].y,clouds[i].size);
        ellipse(clouds[i].x+ 20, clouds[i].y +50,clouds[i].size);
        ellipse(clouds[i].x *1.5,clouds[i].y +50,clouds[i].size);
        ellipse(clouds[i].x -80,clouds[i].y + 50,clouds[i].size);
        ellipse(clouds[i].x * 4,clouds[i].y +50,clouds[i].size);
        ellipse(clouds[i].x* 4.5,clouds[i].y +50,clouds[i].size);
        ellipse(clouds[i].x*4,clouds[i].y,clouds[i].size);
        
    }
    

}

    //mountain
    
function drawMountain() {
    
    for (var i = 0; i < mountain.length; i++)
    {
        noStroke();
        fill(112, 63, 3);
        triangle(mountain[i].x, mountain[i].y,
                 mountain[i].x + 300, mountain[i].base,  mountain[i].x - 300, mountain[i].base);
        
     }
}
    


function flagpole1(x, y, w, h) {

    if(flagpole.isReached){
        noStroke();
        fill(70, 68, 71);
        rect(x, y, w, h);
        fill(0, 0, 0);
        triangle(x, y - 20, x + 120, y + 30, x, y + 80);
        fill(255);
    
} else{
    noStroke();
    fill(70, 68, 71);
    rect(x, y, w, h);
    fill(0, 0, 0);
    triangle(x, y + 100, x + 120, y + 160, x, y + 215);
    fill(255);
}
}



function draw()
{

	///////////DRAWING CODE//////////

    
    //cameraPosX 
    cameraPosX = gameChar_x - width / 2;
        push();
            translate(-cameraPosX, 0);
    
  

    
    
    
	background(115, 80, 80); //fill the sky blue
    

	noStroke();
	fill(11, 74, 17);
	rect (cameraPosX, floorPos_y, width, height - floorPos_y); //draw some green ground
    
    
    drawCloud();
    
    drawMountain();
    
    drawTree();
    
    drawCanyons();
    
    drawCollectables();
    
    textSize(24);
    fill(0,0,0);
    var scoreTextX = width - 100 - (-cameraPosX); // Adjust the x-coordinate based on camera position
    text("Score: " + gameScore, scoreTextX, 30)

    
    flagpole.isReached = gameChar_x > flagpole.x
  	flagpole1(flagpole.x, flagpole.y, flagpole.w, flagpole.h)

	//the game character
	if(isLeft && isFalling)
	{
		// add your jumping-left code
        //legs
    fill(71,171,34);
    rect(gameChar_x - 4, gameChar_y - 28, 9,25,7);
    //trousers
    fill(66, 109, 237);
    rect(gameChar_x - 4, gameChar_y - 28,9, 20, 7);
    //trunk
    fill(0,0,0);
    rect(gameChar_x - 9, gameChar_y - 50, 20,30,8);
    //brain
    fill(250, 150, 200);
    circle(gameChar_x, gameChar_y - 65, 15);
    //head
    fill(71,171,34);
    rect(gameChar_x - 12,gameChar_y - 69, 24, 22, 7);
    //eyes
    fill(0,0,0);
    circle(gameChar_x - 5, gameChar_y - 61, 5);
    //arms
    fill(71,171,34);
    rect(gameChar_x + 3, gameChar_y - 48, 8,25, 7);
    //sleeves
    fill(181, 4, 4);
    rect(gameChar_x + 3,  gameChar_y - 48, 8, 12, 3);

	}
	else if(isRight && isFalling)
	{
		// add your jumping-right code
        fill(71,171,34);
    rect(gameChar_x - 4, gameChar_y - 28, 9,25,7);
    //trousers
    fill(66, 109, 237);
    rect(gameChar_x - 4, gameChar_y - 31,9, 20, 7);
    //trunk
    fill(0,0,0);
    rect(gameChar_x - 9, gameChar_y - 50, 20,30,8);
    //brain
    fill(250, 150, 200);
    circle(gameChar_x + 2, gameChar_y - 65, 15);
    //head
    fill(71,171,34);
    rect(gameChar_x - 10,gameChar_y - 69, 24, 22, 7);
    //eyes
    fill(0,0,0);
    circle(gameChar_x + 8, gameChar_y - 61, 5);
    //arms
    fill(71,171,34);
    rect(gameChar_x - 10, gameChar_y - 48, 8,25, 7);
    //sleeves
    fill(181, 4, 4);
    rect(gameChar_x - 10, gameChar_y - 48, 8, 12, 3);


	}
	else if(isLeft)
	{
		// add your walking left code
         //legs
    fill(71,171,34);
    rect(gameChar_x - 4, gameChar_y - 20, 9,25,7);
    //trousers
    fill(66, 109, 237);
    rect(gameChar_x - 4, gameChar_y - 23,9, 20, 7);
    //trunk
    fill(0,0,0);
    rect(gameChar_x - 9, gameChar_y - 46, 20,30,8);
    //brain
    fill(250, 150, 200);
    circle(gameChar_x, gameChar_y - 58, 15);
    //head
    fill(71,171,34);
    rect(gameChar_x - 12,gameChar_y - 62, 24, 22, 7);
    //eyes
    fill(0,0,0);
    circle(gameChar_x - 5, gameChar_y - 50, 5);
    //arms
    fill(71,171,34);
    rect(gameChar_x + 3, gameChar_y - 40, 8,25, 7);
    //sleeves
    fill(181, 4, 4);
    rect(gameChar_x + 3,  gameChar_y - 40, 8, 12, 3);
    
	}
	else if(isRight)
	{
		// add your walking right code
         //legs
    fill(71,171,34);
    rect(gameChar_x - 4, gameChar_y - 20, 9,25,7);
    //trousers
    fill(66, 109, 237);
    rect(gameChar_x - 4, gameChar_y - 23,9, 20, 7);
    //trunk
    fill(0,0,0);
    rect(gameChar_x - 9, gameChar_y - 46, 20,30,8);
    //brain
    fill(250, 150, 200);
    circle(gameChar_x + 2, gameChar_y - 58, 15);
    //head
    fill(71,171,34);
    rect(gameChar_x - 10,gameChar_y - 62, 24, 22, 7);
    //eyes
    fill(0,0,0);
    circle(gameChar_x + 8, gameChar_y - 50, 5);
    //arms
    fill(71,171,34);
    rect(gameChar_x - 10, gameChar_y - 40, 8,25, 7);
    //sleeves
    fill(181, 4, 4);
    rect(gameChar_x - 10, gameChar_y - 40, 8, 12, 3);
    
	}
	else if(isFalling)
	{
		// add your jumping facing forwards code
        //legs
    fill(71,171,34);
    rect(gameChar_x  - 12, gameChar_y - 28, 9, 25, 7);
    rect(gameChar_x  + 6, gameChar_y - 28, 9, 25, 7);
    //trousers
    fill(66, 109, 237);
    rect(gameChar_x - 12, gameChar_y - 29,9, 20, 7);
    rect(gameChar_x + 6, gameChar_y - 29, 9,20,7);
    //trunk
    fill(0,0,0);
    rect(gameChar_x - 15, gameChar_y - 49, 30,30, 8);
    //brain
    fill(250, 150, 200);
    circle(gameChar_x + 1, gameChar_y - 62, 20);
    //head and arms
    fill(71,171,34);
    rect(gameChar_x - 14, gameChar_y - 68, 30, 20, 7);
    rect(gameChar_x - 17, gameChar_y - 48, 8,25, 7);
    rect(gameChar_x + 10, gameChar_y - 48 , 8, 25, 7);
    //sleeves
    noStroke();
    fill(181, 4, 4);
    rect(gameChar_x - 17, gameChar_y - 48, 8, 12, 2.5);
    rect(gameChar_x + 10, gameChar_y - 48, 8, 12, 2.5);
    //eyes
    fill(0,0,0);
    circle(gameChar_x - 6, gameChar_y - 60, 5);
    circle(gameChar_x +6, gameChar_y - 60, 5);
    

	}
	else
	{
		// add your standing front facing code
        //legs
    fill(71,171,34);
    rect(gameChar_x  - 12, gameChar_y - 20, 9, 25, 7);
    rect(gameChar_x  + 6, gameChar_y - 20, 9, 25, 7);
    //trousers
    fill(66, 109, 237);
    rect(gameChar_x - 12, gameChar_y - 21, 9, 20, 7);
    rect(gameChar_x + 6, gameChar_y - 21, 9,20,7);
    //trunk
    fill(0,0,0);
    rect(gameChar_x - 15, gameChar_y - 43, 30,30, 8);
    //brain
    fill(250, 150, 200);
    circle(gameChar_x + 1, gameChar_y - 56, 20);
    //head and arms
    fill(71,171,34);
    rect(gameChar_x - 14, gameChar_y - 62, 30, 20, 7);
    rect(gameChar_x - 17, gameChar_y - 40, 8,25, 7);
    rect(gameChar_x + 10, gameChar_y - 40 , 8, 25, 7);
    //sleeves
    noStroke();
    fill(181, 4, 4);
    rect(gameChar_x - 17, gameChar_y - 42, 8, 12, 2.5);
    rect(gameChar_x + 10, gameChar_y - 42, 8, 12, 2.5);
    //eyes
    fill(0,0,0);
    circle(gameChar_x - 6, gameChar_y - 50, 5);
    circle(gameChar_x +6, gameChar_y - 50, 5);
	}
    
    
	///////////INTERACTION CODE//////////
	//Put conditional statements to move the game character below here
    if(isLeft){
        gameChar_x -= 5;
    }
    
    if(isRight){
        gameChar_x += 5;
    }
    
    if(gameChar_y < floorPos_y){
        gameChar_y += 4;
        isFalling = true;
    } else {
        isFalling = false;
    }
     //collectable
     
     
    for (var i = 0; i < collectables.length; i++) {
        distanceToCollectable = dist(gameChar_x, gameChar_y, collectables[i].x, collectables[i].y);

        if (distanceToCollectable < collectables[i].size * 2) {
            collectables[i].isFound = true;
            collectAudio.play(); 
            setTimeout(function() {
                collectAudio.pause();
                collect.currentTime = 0; // Reset the audio to the beginning
            }, 1000);
            gameScore++;
            
            console.log("item collected!");
    }
}

    //flagpole
  

    if(gameChar_x > flagpole.x){
        flagpole1.isReached = true;
        levelComplete = true;
        gameOver = false;
    }
        
    
    for (var i = 0; i < canyons.length; i++) {
        if (gameChar_x > canyons[i].x && gameChar_x < canyons[i].x + canyons[i].width && gameChar_y === floorPos_y) {
                isPlummeting = true;
                plummetingStartTime = undefined;
                isFalling = false;
      
   }
}

    if (isPlummeting) {
		// Increment gameChar_y to make the character fall more quickly
		gameChar_y += 4; // Adjust the value as needed
		isFalling = true; 
        isLeft = false;
        isRight = false;
        gameOver = true;
        var fallAudio = new Audio('Death6.mp3');
fallAudio.play();

// Stop the audio after 2 seconds

        
    }
    
    
     //check if game is over
   
    pop();
    
    
    //check if game is over
    
    if (isPlummeting && plummetingStartTime === undefined) {
        plummetingStartTime = millis();
    }

    // Check if the 2-second duration has passed
    if (isPlummeting && millis() - plummetingStartTime > plummetingDuration) {
        background(0);
        textAlign(CENTER, CENTER);
        textSize(48);
        fill(255, 0, 0);
        text("Game Over", width / 2, height / 2);
        fallAudio.pause()
        var loseAudio = new Audio('creepy.mp3');
        loseAudio.play();
        setTimeout(function() {
            loseAudio.pause();
            loseAudio.currentTime = 0; // Reset the audio to the beginning
        }, 5000);

    }

    
    if (levelComplete) {
        background(0);
        textAlign(CENTER,CENTER);
        textSize(48);
        fill(0, 255, 0); // Green color for level complete
        text("Level Completed", width / 2, height / 2); 
        var winAudio = new Audio ('win.ogg');
        winAudio.play();
        setTimeout(function() {
            winAudio.pause();
            winAudio.currentTime = 0; // Reset the audio to the beginning
        }, 3000);
    }
}



function keyPressed()
{
	// if statements to control the animation of the character when
	// keys are pressed.
    if (key === 'a' || key === 'A') {
        if (gameOver || levelComplete) {
            return; 
        }
    isLeft = true;
    isRight = false; // Make sure the other direction is false
    console.log('isLeft:', isLeft);
    console.log('isRight:', isRight);
  }


    if (key === 'd' || key === 'D' ) {
        if (flagpole.isReached || isPlummeting) {
            isRight = false;
            isLeft = false;
            return;} else{
                
    isLeft = false; // Make sure the other direction is false
    isRight = true;}
    console.log('isLeft:', isLeft);
    console.log('isRight:', isRight);
    }
    
    if ((key === 'w' || key === 'W') && isFalling === false){
        var jumpAudio = new Audio ('jump.ogg');
        jumpAudio.volume = 0.2;
        jumpAudio.play();

        if (gameOver || levelComplete) {
            return;
        }
        gameChar_y -= 200;
    }
    
    if(isPlummeting){
        return;
    }
    
    if(gameOver || levelComplete){
        return;
    }
    
    
      
      
	//open up the console to see how these work
	console.log("keyPressed: " + key);
	console.log("keyPressed: " + keyCode);
}

function keyReleased()
{
	// if statements to control the animation of the character when
	// keys are released.
    if(key === 'a' || key === 'A'){
        isLeft = false;
        console.log('isLeft:', isLeft);
    }
    
    if(key === 'd' || key === 'D'){
        isRight = false;
        console.log('isRight:', isRight);
    }
    
    
	console.log("keyReleased: " + key);
	console.log("keyReleased: " + keyCode);

}


