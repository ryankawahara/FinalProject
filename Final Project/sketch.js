let screen =1;
let peopleCounter=0;
//let addSpeed=200;
let addSpeed=10;
let textX;
let showStartText=false;
let screenNum=1;
var mgr;
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


let img; 
let fontSizeMax =30;
let fontSizeMin= 18;
let kerning =0.505;
let cw;
let characterx;
let whichline = 0;
let currentLine='';
let textPositions=[];
let joinedText;
let betweenWords=-1;
let m;
let showImage=false; 
let typewriter;
let typewriterBold;
let endTextSize=9;
let mode=1;
let startOpacity=0;
let fadeIn=-40;
let textFadeIn=0;


let json;
let names;
let imgList= [];
let jsonURL;
let greyBox;
let jsonURLList=[];
let imageIndex;
let resizeX=60;
let resizeY=60;
let imageStagger;
let callMethod = true;

let namePosition;
let nameVelocity;
let nameIndex=0;
let pickPeople;

function preload(){
	mapimg=loadImage("https://api.mapbox.com/styles/v1/mapbox/light-v10/static/pin-s-t+000(-112.7167,39.3833),pin-s-c+000(-114.2833,34.15),pin-s-g+000(-111.8667,32.1667),pin-s-a+000(-102.3,38.05),pin-s-h+000(-109.05,44.5167),pin-s-m+000(-118.0667,36.7333),pin-s-m+000(-114.2333,42.6667),pin-s-r+000(-91.2667,33.75),pin-s-t+000(-121.3667,41.8833),pin-s-j+000(-92.4667,33.3833)/-97,37.78,3.75,0,0/1280x720?access_token=pk.eyJ1IjoicnlyeWsxIiwiYSI6ImNraTI5dGp2czBubnUycHFubTAybWltOWcifQ.x2xSpc6x6sdAR9dzRCmgCQ");
	radio=loadImage("radio (2)-01.png");
	table=loadImage("table.png");
	evacuationImg=loadImage("Doc 3_ Evacuation Instructions.jpg");
		ringleImg=loadImage("Ringle Title.png");
		typewriter = loadFont('American Typewriter Regular.ttf');
	pearlHarbor = loadSound('PearlHarbor.mp3');
	
	
	 img = loadImage('billImage.jpg');
  lines = loadStrings('bill.txt');	
	typewriter = loadFont('American Typewriter Regular.ttf');
	typewriterBold = loadFont('AmericanTypItcDBol.ttf');

pickPeople=floor(random(1,4));
if (pickPeople==1){
	print(pickPeople);
jsonURL='https://ddr.densho.org/api/0.2/narrator/?format=json&limit=25&offset=75';


}
if (pickPeople==2){
	print(pickPeople);
jsonURL='https://ddr.densho.org/api/0.2/narrator/?format=json&limit=25&offset=275'

}

if (pickPeople==3){
	print(pickPeople);
jsonURL='https://ddr.densho.org/api/0.2/narrator/?format=json&limit=25&offset=450';


}

//for screen 1 border


		gotData=loadJSON('https://cors-anywhere.herokuapp.com/'+jsonURL,resultLoaded);



}

function resultLoaded(data){ //load data for image 

imageData=data;
backupImage=loadImage('https://cors-anywhere.herokuapp.com/https://ddr.densho.org/media/narrators/gfumiko.jpg',(event) => {print('boxloaded!') });
backupImage2=loadImage('https://cors-anywhere.herokuapp.com/https://ddr.densho.org/media/narrators/hizumi.jpg');
indexMax=imageData.objects.length;
	for (let  i=0; i<indexMax;i++){
		if ((i==23)){
			imgList.push(backupImage);
		}
		else if (i==22){
			imgList.push(backupImage2);
		}
		else{
		url=imageData.objects[i].links.img;
		//imgList.push(loadImage('https://cors-anywhere.herokuapp.com/'+url));
		loadImage(('https://cors-anywhere.herokuapp.com/'+url), img=>{

			imgList.push(img);
			console.log(i+'loaded');
			console.log(img);
		},img => { 
			//img=greyBox;
		//imgList.push(img);
		//console.log(greyBox);
		console.log(i+'failed');
    } );
	}
	}
//	img=loadImage('https://cors-anywhere.herokuapp.com/'+url);	
}



function setup()
{	
	imageMode(CENTER);
	rectMode(CENTER);

	
	radioAmp= new p5.Amplitude();

    createCanvas(canvasWidth, canvasHeight);
		  bed = createSprite(width/2, height/2);
		  	bed.addAnimation('normal', 'bed1.png','bed2.png');
				bed.animation.stop();


    mgr = new SceneManager();
    mgr.addScene ( Intro );
    mgr.addScene ( Radio );
   mgr.addScene ( usaMap );
	  mgr.addScene ( evacuation );
	mgr.addScene(leaving);
		mgr.addScene(cases);
		  mgr.addScene ( report );
	  mgr.addScene ( reparations );

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
			case 8:
					 mgr.showScene( reparations );
            break;
    }
	
      mgr.handleEvent("keyPressed");
}


function Intro()
{
    this.setup = function() {
			  createCanvas(canvasWidth, canvasHeight);
			//  rectMode(CENTER);
			  ellipseMode(CENTER);
			    namePosition = createVector(width/2-500, height/2+275);
  				nameVelocity = createVector(1.5, 0);

			//background(255,0,0);
	 textX =  width/2-100;
	 			textAlign(CENTER);

    }

    this.draw = function() {
    			//background(255);
noStroke();
fill(255);
rect(width/2,height/2,width-120,height-120);
ellipse(width/2,height/2,500,500);
fill(0);
  namePosition.add(nameVelocity);
    textAlign(CENTER);
  textSize(19);
  textFont(typewriterBold);
  textFont(typewriter);
text(imageData.objects[nameIndex].display_name,namePosition.x,namePosition.y); //animation adapted from https://editor.p5js.org/2sman/sketches/r1aETVwYX
  textSize(10);
    textFont(typewriter);

text('Birthplace: '+imageData.objects[nameIndex].birth_location,namePosition.x,namePosition.y+12.5); 

  if ((namePosition.x > width-140) || (namePosition.x < width/2-500)) {
    nameVelocity.x =    nameVelocity.x * -1;

   if (nameIndex<25){
nameIndex+=1;
   } 
  }
  if ((namePosition.y > height) || (namePosition.y < 0)) {
    nameVelocity.y =  nameVelocity.y * -1;
  if (nameIndex<25){
nameIndex+=1;
   } 

  }

  namePosition.add(nameVelocity);

   if(callMethod){ //only runs this function once
   //https://forum.processing.org/two/discussion/3647/how-execute-a-function-only-once
   drawGrid();
    callMethod = false;
  }
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
  textFont(typewriterBold);

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
		//Would also like to add border of images of internment camp survivors, using an array of images and API
		
		else{
					peopleCounter+=addSpeed;
		}
		if (peopleCounter>120000){
			peopleCounter=120000;
			showStartText=true;
		}
	}

	if (showStartText==true){
		fill(0,textFadeIn);
		textSize(21);
		textAlign(CENTER);
		  textFont(typewriter);

		text('Japanese Americans were interned \n between the years of 1942 and 1945.',width/2,(height/2)+40);
		textFadeIn+=10;
	}
}

function drawGrid(){
		imageMode(CORNER);


	//border adapted from Riley's Sketch 3 https://www.openprocessing.org/sketch/997496
	//for (let imageIndex =0; imageIndex<indexMax;imageIndex++){
for(let i=0; i < canvasWidth; i += canvasWidth/20){
 if (imageIndex<indexMax-1){
   	imageIndex+=1;
    if (imageIndex>2){
      	 imageStagger=imageIndex-2;
      	     		}
    else if (imageIndex<=2){
      	 imageStagger=floor(random(0,24));
			}
      	     // imageStagger+=1;
     						 }		
  else {
     imageIndex=0;
      	// noLoop();
      }

    for(let j=0; j < canvasHeight; j += canvasHeight/12){

     if (imageIndex<indexMax-1){
      	      imageIndex+=1;
      	      if (imageIndex>2){
      	      	imageStagger=imageIndex-2;
      	      }
      	      else if (imageIndex<=2){
      	      	imageStagger=floor(random(5,20));
      	      }
      	     // imageStagger+=1;

      }
      else {
      	imageIndex=0;
      }
    //	scale(0.5);
    //	print('index'+imageIndex);
      image((imgList[imageIndex]),i,0,resizeX,resizeY);
      image((imgList[imageStagger]),i,canvasHeight-resizeY,resizeX,resizeY);
      image((imgList[imageIndex]),0,j,resizeX,resizeY);
      image((imgList[imageStagger]),canvasWidth-resizeX,j,resizeX,resizeY);
    }   
  }

	imageMode(CENTER);

}
this.mousePressed=function(){

//drawGrid=true;

}

}




function Radio(){
	this.setup = function(){
		createCanvas(canvasWidth, canvasHeight);
		background(255);


	}
	
	this.draw = function(){
				background(255);
		
		let radioVolume=radioAmp.getLevel();
		let diameter=map(radioVolume,0,0.3,80,350);
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
		noStroke();	
		fill(0,50);
		ellipse(width/2-2.5,height/2-40,diameter,diameter);

	}
	
	this.mousePressed= function(){
		if (pearlHarbor.isPlaying()==false){
			pearlHarbor.setVolume(0.3);
		pearlHarbor.play();


		}
		
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
  textAlign(CENTER);
  textSize(19);

	
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
			text('Japanese Americans on the West Coast, many of whom were American citizens, were sent to one of 10 different camps across the country. \n \n Many were hastily built and in remote areas.',width/2,height-650);

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

	//rectMode(CENTER);
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
			rectMode(CORNER);
		
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

function reparations(){
//planning on building on Sketch 4 
// Going to add bolded text for certain words with words[i]
//also going to have it do different things with mousePressed
	this.setup=function(){
//createCanvas(960,668);
					createCanvas(canvasWidth, canvasHeight);

textAlign(LEFT,CENTER);
textSize(18);
words = lines.toString().split(' ');
textFont(typewriter);
		


		
	}
	
	this.draw=function(){
		m = map(mouseX, 200, width - 200, 0, 1);
	m = constrain(m, 0, 1);
	background(255);
let x = 0;
let y=20;
let counter =0;
img.loadPixels();
//paragraph formatting adapted from text parse- Alice https://www.openprocessing.org/sketch/782516
 let margin = 0;
  let thex = margin; // start at the left
	let they=10;
	let endStartY=5;
	let startY = lerp(they, endStartY, m);
  they = startY; // start one line down
	let leading = 20.2; 
		for(i in words) // (for i = 0;i<phrasearray.length;i++)
  {
    if((words[i]=='Executive')||(words[i]=='Order')||(words[i]=='Order,'))//Makes the words "executive" and "order" bold
    {
			let newfontSizeMax = fontSizeMax;
			newfontSizeMax=endTextSize;
			let interFontSizeMax = lerp(fontSizeMax, newfontSizeMax, m);
		if(mouseX<width/2){
		textFont(typewriterBold);
			}
      textSize(interFontSizeMax);
    }
		else if (words[i-1]=='9066') //puts a newline after the word "Executive"
		{
			let newLeading = leading;
			let newMargin = margin;
			newLeading=0;
			newMargin=characterx;
			let interLeading = lerp(leading, newLeading, m); 
			//repositioning animation adapted from Generative Design P_3_1_3_05 (http://www.generative-gestaltung.de/2/sketches/?01_P/P_3_1_3_05)
 			let interMargin = lerp(margin, newMargin, m);
			 they+=interLeading;
			thex=interMargin;	
		}
    else
    {
			textStyle(NORMAL);
				textFont(typewriter);
//textSize(fontSizeMin);
    }
		if (they>20){
					let newfontSizeMin = fontSizeMin;
			newfontSizeMin=endTextSize;
			let interFontSizeMin = lerp(fontSizeMin, newfontSizeMin, m);
			 textSize(interFontSizeMin);
		}
    //fill(random(255), random(255), random(255));
   // fill(0);
    var tw = textWidth(words[i]+' ');
		let textw;
		//print(textWidth(words[0]));
		//line(0,20,textWidth(words[0]),20);
    
    if(thex+tw>width-margin) // if we are close to the edge
    {
			let newLeading = leading;
			newLeading=9;
			let interLeading = lerp(leading, newLeading, m);
      thex=margin;
      //they+=leading;
			they+=interLeading;
    }
    //text(words[i], thex, they);
		letters=words[i]; 
		textw=textWidth(words[i]);
		let keyspace;
		characterx=thex;
		for (let j in letters){
				let c = color(img.get(characterx,they)); //adapted from Generative Design P_4_3_2_01 (http://www.generative-gestaltung.de/2/sketches/?01_P/P_4_3_2_01)
				//gets color of each pixel, and set the characters of each word to the color of the pixel
			//	fill(c);
			let startr=0;
			let startg=0;
			let startb=0;
			let endr= red(c);
			let endg=green(c);
			let endb=blue(c);
			let newr= map(mouseX,100,width-100,startr,endr);
			let newg= map(mouseX,100,width-100,startg,endg);
 let newb= map(mouseX,100,width-100,startb,endb);
			fill(newr,newg,newb);
			text(letters[j], characterx, they);
			characterx+=textWidth(letters[j]);
		//	text(letters.length, thex, they);
		//	text(floor(keyspace), thex+keyspace, they);

		}
		keyspace=0;
		//text(str(i+','+they), thex, they);
    thex+=tw+betweenWords;
  }

	if (showImage==true){
	if (mouseX>width/2){
	if (startOpacity<255/2){
			tint(255, startOpacity+=fadeIn); // Fade in to half opacity
	}
  image(img, 0, 0);	
	}
	}  
	if (mouseX>width-50){
		tint(255, 255/2);
		  image(img, 0, 0);	
		
	}
		
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


	




	
	
