let screen =1;
let peopleCounter=0;
//let addSpeed=200;
let addSpeed=10;
let textX;
let showStartText=false;
let screenNum=1;
var mgr;
let fadeIn;
let canvasWidth=1280;
let canvasHeight=720;
let textGrow=0;
let mapimg;
let camZoom=false;
let bed;
		let draggedSprite;
let xOffset, yOffset;

let startRotate=false;
let finishedRotate=false;
let rotationDirection=1;
let korematsu;
let showKorematsuText=false;
let pearlHarbor;

function preload(){
	mapimg=loadImage("https://api.mapbox.com/styles/v1/mapbox/light-v10/static/pin-s-y+000(-87.0186,32.4055),pin-s-r+000(-90.0186,32.4055)/-97,37.78,3.75,0,0/1280x720?access_token=pk.eyJ1IjoicnlyeWsxIiwiYSI6ImNraTI5dGp2czBubnUycHFubTAybWltOWcifQ.x2xSpc6x6sdAR9dzRCmgCQ");
	radio=loadImage("radio (2)-01.png");
	table=loadImage("table.png");
	evacuationImg=loadImage("Doc 3_ Evacuation Instructions.jpg");
		ringleImg=loadImage("Ringle Title.png");
		typewriter = loadFont('American Typewriter Regular.ttf');
	pearlHarbor = loadSound('PearlHarbor.mp3');

}

function setup()
{	
	imageMode(CENTER);
    createCanvas(canvasWidth, canvasHeight);
		  bed = createSprite(width/2, height/2);

    mgr = new SceneManager();
    mgr.addScene ( Intro );
    mgr.addScene ( Radio );
   mgr.addScene ( usaMap );
	  mgr.addScene ( evacuation );
	mgr.addScene(leaving);
		mgr.addScene(cases);
		  mgr.addScene ( report );

   mgr.showNextScene();
}

function draw()
{
    mgr.draw();
}

function mousePressed()
{
    mgr.handleEvent("mousePressed");
}

function keyPressed()
{
	if (keyCode === 39){
		screenNum+=1;
		camZoom=false;
		
	}
	if (keyCode ===  37){
		
		screenNum-=1;
	}
	
    switch(screenNum)
    {
        case 1:
            mgr.showScene( Intro );
            break;
        case 2:
            mgr.showScene( Radio );
            break;
        case 3:
            mgr.showScene( evacuation );
            break;
			case 4:
					mgr.showScene(leaving);
				break;
			case 5:
				 mgr.showScene( usaMap );
            break;
			case 6:
					 mgr.showScene( cases );
            break;
			case 7:
					 mgr.showScene( report );
            break;
    }
	
      mgr.handleEvent("keyPressed");
}




function Intro()
{
    this.setup = function() {
			  createCanvas(canvasWidth, canvasHeight);

			//background(255,0,0);
	 textX =  width/2-100
    }

    this.draw = function() {
    			background(255);

	if (peopleCounter<10000){
		textX=width/2-80;	
	}
	else if (peopleCounter>=10000){
	 textX =  width/2-100

		
	}
	 if (peopleCounter>=100000){
	 textX =  width/2-120;

		
	}
	push();
	translate(textX,(height/2));
			textAlign(CENTER);

	  textSize(textGrow);
			if (textGrow<125){
			textGrow+=0.75;
			}
//	text(floor(peopleCounter),textX,(height/2));
				text(floor(peopleCounter),125,0);
			pop();
	if (peopleCounter<120000){
		addSpeed+=4;


		if (peopleCounter>=105000){
			peopleCounter+=addSpeed;
			if (addSpeed>0){
			addSpeed-=200/950;
				print(addSpeed);
			}
		
		} //planning on preventing user from progressing until counter is finished
		// Also planning on adding more title text
		
		else{
					peopleCounter+=addSpeed;
		}
		if (peopleCounter>120000){
			peopleCounter=120000;
			showStartText=true;
		}
	}
}
}

function Radio(){
	this.setup = function(){
		createCanvas(canvasWidth, canvasHeight);
		background(255);
		
	}
	
	this.draw = function(){
				background(255);
		
		push();
		translate(width/2,height/2-100);


				push();
		//translate(width/2,height/2+100);
		scale(0.35);
				image(table,0,1000);
		
		pop();
		scale(0.125/1.25);
			image(radio,0,0);
		
		pop();
		//if you click on the radio, it will play a news clip from pearl harbor	
	}
	
	this.mousePressed= function(){
		pearlHarbor.play();
		
	}
}


function usaMap()
//this screen will have pins at each internment camp and the population of each.
{
    this.setup = function() {
						  createCanvas(canvasWidth, canvasHeight);

			ellipseMode(CENTER);
	 camera.position.x = width/2;
  camera.position.y = height/2;
	
    }

    this.draw = function() {
			background(255);
			camera.on();
	//camera.zoom = 1;
		//	background(255,0,0);
			if (camZoom==false){
					if (camera.zoom>1){
					camera.zoom -= 0.1;
				}
				image(mapimg,width/2,height/2);
			}
			else if (camZoom==true){
				if (camera.zoom<2){
					camera.zoom += 0.1;
				}
			
		  camera.position.x = constrain(mouseX, 400, 900);
  camera.position.y = constrain(mouseY, 200, 500);
			image(mapimg,width/2,height/2);
			}

    }
	
	this.mousePressed= function(){
		camZoom=!camZoom; //lets you zoom in and out of document
		  camera.position.x = width/2;
  camera.position.y = height/2;
		
		
	}
}

function evacuation()
{
    this.setup = function() {
	createCanvas(canvasWidth, canvasHeight);
			background(255);

	rectMode(CENTER);
	camera.zoom = 1;
			ellipseMode(CENTER);
			nonalien = new Clickable();
			nonalien.x = 592;
			nonalien.y = 290;
			nonalien.color = "#f1c40f66";       //Background color of the clickable (hex number as a string)
			nonalien.strokeWeight = 0;    
			nonalien.text = ""; //Stroke width of the clickable (float)
			nonalien.resize(30, 7);
			nonalien.cornerRadius = 1; 
			showNonAlienRect=false;

    }
	
	

    this.draw = function() {
	//this screen will highlight other parts of the Executive Order and explain why they're bad
			
			nonalien.onPress = function(){
				showNonAlienRect=!showNonAlienRect;
				print(showNonAlienRect);
			}
			
			nonalien.onHover = function(){
 		nonalien.color = "#e67e2266";
}
			
			nonalien.onOutside = function(){
			nonalien.color = "#f1c40f66";       //Background color of the clickable (hex number as a string)

}
	
				background(255);
		//	background(255,0,0);
			
				push();
				translate(width/2,height/2);
				scale(0.20);
				image(evacuationImg,0,0);
				pop();
					nonalien.draw();
			if (showNonAlienRect==true){
				stroke(0);
				strokeWeight(1);
				line(nonalien.x-25,nonalien.y-15,nonalien.x,nonalien.y);


				strokeWeight(0.5);
				fill(241, 196, 15);
				push();
				textSize(5);
				textAlign(LEFT);
				translate(nonalien.x-50,nonalien.y-25);
				rect(0,5,65,12.5);
				fill(0);
				noStroke();
				text('*meaning American Citizens',1,10);
				pop();


				
			}
			
			if (camZoom==false){ 
					if (camera.zoom>1){
					camera.zoom -= 0.1;
				}
		
			/*	push();
				translate(width/2,height/2);
				scale(0.20);
				image(evacuationImg,0,0);


				pop();*/
			}
			else if (camZoom==true){
						

				if (camera.zoom<2.75){
					camera.zoom += 0.1;
				}
			
		 // camera.position.x = constrain(mouseX, 500, 800);
 		 //camera.position.y = constrain(mouseY, 100, 600);
				
		 camera.position.x = map(mouseX,0,width, 500, 800);
 		 camera.position.y = map(mouseY,0,height, 100, 600);
			//	push();
			//	translate(width/2,height/2);
			//	scale(0.20);
			//image(evacuationImg,0,0);
				//pop();
			}
		
		
    }
	
	this.mousePressed= function(){
if (camZoom==true){
	camera.position.x = width/2;
  camera.position.y = height/2;
	
}
		camZoom=!camZoom;

		print(mouseX+","+mouseY);
		
		
	}
}

function leaving(){
	//at this screen, the user will drag items to sell them and see how much money was lost
	this.setup=function(){


			createCanvas(canvasWidth, canvasHeight);
		bed.addAnimation('normal', 'bed1.png','bed2.png');
				bed.animation.stop();
	

//		bed.addAnimation('new','bed2.png');
		
		bed.scale=0.25;
	}
	
	this.draw=function(){
		
		camera.off();
		background(255);
		ellipse(mouseX,mouseY,50,50);
		// adapted from https://molleindustria.github.io/p5.play/examples/index.html?fileName=mouseEvents.js
		  if (draggedSprite != null) {
       bed.position.x = mouseX - xOffset;
	
    bed.position.y = mouseY - yOffset;
		
  }
		  drawSprites();
	}
	bed.onMousePressed=function(){
		  // bed.changeAnimation('new');
				bed.animation.nextFrame();
		if (draggedSprite == null) {
      draggedSprite = this;
    } // adapted from https://molleindustria.github.io/p5.play/examples/index.html?fileName=mouseEvents.js
		
	xOffset = mouseX - bed.position.x;
  yOffset = mouseY - bed.position.y;
		//this code is nifty because it lets you drag the bed from anywhere. Adapted from https://p5js.org/examples/input-mouse-functions.html
	
	}
	
	bed.onMouseReleased=function(){
	 if (draggedSprite == this) {
      draggedSprite = null;
    }
	
}

	
	
}
function cases(){
	// here, users will click on each case to "decide" them, and see that all were struck down
	this.setup=function(){
		  bed.remove();
			createCanvas(canvasWidth, canvasHeight);
					korematsu=createSprite(width/2,height/2);

	  gavel = createSprite(width/2, height/2);
		gavel.addAnimation('normal', 'Gavel.png');
		gavel.scale=0.15; 
		gavel.setCollider("circle", 25, 25, 5);
		gavel.rotation=60;
		
		korematsu.addAnimation('normal', 'Korematsu.png');
		korematsu.scale=0.45;




		
	}
	
	this.draw=function(){
		background(255);
		gavel.position.x=mouseX;
		gavel.position.y=mouseY;
		if (startRotate==true&&gavel.rotation==0){
			finishedRotate=true;
			showKorematsuText=true;
		}
		if (startRotate==true&&gavel.rotation<0){
			rotationDirection=1;
		}
		if (gavel.rotation==60&&finishedRotate==true){
			startRotate=false;
		}
		if (startRotate==true&&gavel.rotation>60){
				rotationDirection=-3;
		}
	//	else if (startRotate==true&&gavel.rotation==45){
	//		startRotate=false;
	//	}
				if (startRotate==true){
		gavel.rotation=gavel.rotation+rotationDirection;
		}
		print(gavel.rotation);
		drawSprites();
		if (showKorematsuText==true){
					textSize(45);
		textFont(typewriter);
			fill(255,0,0);
			text('Denied',korematsu.position.x-80,korematsu.position.y+150);
		}


	}
	
	this.mousePressed=function(){
		startRotate=true;
		finishedRotate=false;
		
	}
	
	
}

function report(){
	//This screen will highlight parts of the Ringle Report that show that internment was NOT necessary
	this.setup=function(){
			createCanvas(canvasWidth, canvasHeight);
				  gavel.remove();
		  korematsu.remove();
		background(255);


		
	}
	
	this.draw=function(){
		push();
		translate(width/2,height/2);
		scale(0.45);
		image(ringleImg,0,0);
		pop();
		
		
	}
	
	
}

/*
function template(){
	this.setup=function(){
			createCanvas(canvasWidth, canvasHeight);


		
	}
	
	this.draw=function(){
		
		
	}
	
	
}
*/


	




	
	
