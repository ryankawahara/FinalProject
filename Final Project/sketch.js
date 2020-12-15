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
let draggedSprite;
let xOffset, yOffset;
let indexMax=25;

let startRotate=false;
let finishedRotate=false;
let rotationDirection=1;
let korematsu;
let showKorematsuText=false;
let pearlHarbor;
let showSupervised;
let showResidence;
let showImprisoned;
let showDisrupt;

let img; 
let fontSizeMax =40;
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
let grandmaHistory;
let grandpaHistory;
let imageData;
let listen;

let goToNext=false;

let kitchenBackground;

//for slider
let sliderLength=200;
let sliderTop=200;
let sliderBottom;
let circleSliderX;
let circleSliderY;
let circleStartX;
let circleStartY;
let circleEndX;
let circleEndY;
let mapValue=0;
let sliderPositionX;


function preload(){
	mapimg=loadImage("https://api.mapbox.com/styles/v1/mapbox/light-v10/static/pin-s-t+000(-112.7167,39.3833),pin-s-c+000(-114.2833,34.15),pin-s-g+000(-111.8667,32.1667),pin-s-a+000(-102.3,38.05),pin-s-h+000(-109.05,44.5167),pin-s-m+000(-118.0667,36.7333),pin-s-m+000(-114.2333,42.6667),pin-s-r+000(-91.2667,33.75),pin-s-t+000(-121.3667,41.8833),pin-s-j+000(-92.4667,33.3833)/-97,37.78,3.75,0,0/1280x720?access_token=pk.eyJ1IjoicnlyeWsxIiwiYSI6ImNraTI5dGp2czBubnUycHFubTAybWltOWcifQ.x2xSpc6x6sdAR9dzRCmgCQ");
	radio=loadImage("radio (2)-01.png");
	table=loadImage("table.png");
	evacuationImg=loadImage("Doc 3_ Evacuation Instructions.jpg");
		ringleImg=loadImage("Ringle Title.png");
		typewriter = loadFont('American Typewriter Regular.ttf');
	pearlHarbor = loadSound('PearlHarbor.mp3');
	grandmaHistory=loadSound('GrandmaOralHistory.mp3');
	grandpaHistory=loadSound('GrandpaOralHistory.mp3');
	asakopic = loadImage("auntie internment.png");
	kitchenBackground = loadImage("kitchen.jpeg")
	//setsuko = loadImage("grandma.png");
//	denby = loadImage("grandpa internment.png");
	//backupImage=loadImage('https://cors-anywhere.herokuapp.com/https://ddr.densho.org/media/narrators/gfumiko.jpg', (event)=> {print('loaded')}, (event)=> { img=loadImage('backupImage1.png') });
//backupImage2=loadImage('https://cors-anywhere.herokuapp.com/https://ddr.densho.org/media/narrators/hizumi.jpg', (event)=> {print('loaded')}, (img)=> { img=loadImage('backupImage2.png') });
backupJSONData=loadJSON('densho.json');
	listen=loadImage('listen.png')
	 img = loadImage('billImage.png');
  lines = loadStrings('bill.txt');	
	typewriter = loadFont('American Typewriter Regular.ttf');
	typewriterBold = loadFont('AmericanTypItcDBol.ttf');
	//3 possible borders, one is chosen at random before shown

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


		//gotData=loadJSON('https://cors-anywhere.herokuapp.com/'+jsonURL,resultLoaded,urlLoadFail); 
		//	gotData=loadJSON(jsonURL,resultLoaded,urlLoadFail); 

		//this (this as well as the resultloaded function) could be my milestone. It uses a combination of preload and a callback function to load images from a JSON.
		//This took me a long time to figure out but I think it's pretty cool.
}



function setup()
{	

backupImage=loadImage('https://cors-anywhere.herokuapp.com/https://ddr.densho.org/media/narrators/gfumiko.jpg', (event)=> {print('loaded')}, (event)=> { img=loadImage('backupImage1.png') });
backupImage2=loadImage('https://cors-anywhere.herokuapp.com/https://ddr.densho.org/media/narrators/hizumi.jpg', (event)=> {print('loaded')}, (img)=> { img=loadImage('backupImage2.png') });


	imageMode(CENTER);
	rectMode(CENTER);
gotData=loadJSON('https://cors-anywhere.herokuapp.com/'+jsonURL,resultLoaded,urlLoadFail); 

//	gotData=loadJSON(jsonURL,resultLoaded,urlLoadFail); 
	
	radioAmp= new p5.Amplitude();
	grandmaAmp= new p5.Amplitude();
	grandpaAmp= new p5.Amplitude();

    createCanvas(canvasWidth, canvasHeight);
	

	denbyPosition=createVector(width/2-350,height/2+25);
	asakoPosition=createVector(width/2+350,height/2+25);
	setsukoPosition=createVector(width/2,height/2+25);

	denby = createSprite (denbyPosition.x,denbyPosition.y);
	//width/2+350,height/2+25
	denby.scale=0.15;
	denby.addAnimation('normal','grandpa internment.png');
	setsuko = createSprite (setsukoPosition.x,setsukoPosition.y);
	//width/2-350,height/2+25
		setsuko.scale=0.15;
	setsuko.addAnimation('normal','grandma.png');
	asako = createSprite (asakoPosition.x,asakoPosition.y);
	//width/2,height/2+25
	asako.addAnimation('normal','auntie internment.png');
		asako.scale=0.15;
	  grandparents = new Group();
	grandparents.add(denby);
		grandparents.add(setsuko);
		grandparents.add(asako);

	//for slider
  sliderPositionX=width-40;
  rectMode(CENTER);
  ellipseMode(CENTER);
  sliderBottom=sliderTop+sliderLength;
  circleStartX=(sliderPositionX)+20;
circleStartY=sliderTop+10;
  circleEndX=(sliderPositionX)+20;
circleEndY= sliderBottom-10;
circleSliderX=circleEndX;
circleSliderY=circleEndY;

	words = lines.toString().split(' ');
	

    mgr = new SceneManager();
		mgr.addScene (dedication);
    mgr.addScene ( Intro );
    mgr.addScene ( Radio );
   mgr.addScene ( usaMap );
	  mgr.addScene ( evacuation );
		mgr.addScene(cases);
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

function resultLoaded(data){ //load data for image 

imageData=data;
goToNext=true;
//backupImage=loadImage('https://cors-anywhere.herokuapp.com/https://ddr.densho.org/media/narrators/gfumiko.jpg',(event) => {backupImage.save("backupImage1","png"); });
//backupImage2=loadImage('https://cors-anywhere.herokuapp.com/https://ddr.densho.org/media/narrators/hizumi.jpg');
indexMax=imageData.objects.length;
	//print("indexmax="+indexMax);
	for (let  i=0; i<indexMax;i++){
		if ((i==23)){
			imgList.push(backupImage); //I found some parts of the JSON I was using was missing some images, so I filled those in myself
			
		}
		else if (i==22){
			imgList.push(backupImage2);
			//backupImage2.save("backupImage2","png");
		}
		else{
		url=imageData.objects[i].links.img;
		//imgList.push(loadImage('https://cors-anywhere.herokuapp.com/'+url));
		loadImage(('https://cors-anywhere.herokuapp.com/'+url), img=>{

			imgList.push(img); //adds to an array of objects
			   //img.save('img'+i, 'png');
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

function urlLoadFail(data){
		print('failed!');
	goToNext=true;
	data=backupJSONData
	imageData=data;
	for (let  i=0; i<25;i++){
		if ((i==23)){
			failbackupImage=loadImage("backupImage1.png");
			imgList.push(failbackupImage); //I found some parts of the JSON I was using was missing some images, so I filled those in myself
			
		}
		else if (i==22){
						failbackupImage2=loadImage("backupImage2.png");

			imgList.push(failbackupImage2);
			//backupImage2.save("backupImage2","png");
		}
		else{
	//	url=imageData.objects[i].links.img;
		//imgList.push(loadImage('https://cors-anywhere.herokuapp.com/'+url));
		loadImage(("img"+i+".png"), img=>{

			imgList.push(img); //adds to an array of objects
			   // img.save('img'+i, 'png');
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
	
}


function keyPressed()
{
	if ((keyCode === 39)&&(goToNext==true)){
		screenNum+=1;
		camZoom=false;
		
	}
	if (keyCode ===  37){
		
		screenNum-=1;
	}
	
    switch(screenNum)
    {
       case 1:
            mgr.showScene( dedication );
            break;  
		case 2:
            mgr.showScene( Intro );
            break;
        case 3:
            mgr.showScene( Radio );
            break;
        case 4:
            mgr.showScene( evacuation );
            break;
		case 5:
				 mgr.showScene( usaMap );
				break;
		case 6:
					 mgr.showScene( cases );
            break;
		case 7:
					 mgr.showScene( reparations );
            break;
    }
	
      mgr.handleEvent("keyPressed");
}

function dedication(){
	this.setup=function(){
			createCanvas(canvasWidth, canvasHeight);

print(asakopic.width+","+asakopic.height);
		showDenbyText=false;
		showAsakoText=false;
		showSetsukoText=false;
		
	}
	
	denby.onMouseOver = function() {
	showDenbyText=true;

  };

  denby.onMouseOut = function() {
		showDenbyText=false;

	};

	denby.onMousePressed = function(){

if ((grandpaHistory.isPlaying()==false)&&(screenNum==1)){
			grandpaHistory.setVolume(0.3);
		grandpaHistory.play();


		}
	}

	asako.onMouseOver = function() {
	showAsakoText=true;
  };

  asako.onMouseOut = function() {
		showAsakoText=false;
	};
	
		  setsuko.onMouseOver = function() {
	showSetsukoText=true;
  };

  setsuko.onMouseOut = function() {
		showSetsukoText=false;
	};

		setsuko.onMousePressed = function(){

if ((grandmaHistory.isPlaying()==false)&&(screenNum==1)){
			grandmaHistory.setVolume(0.3);
		grandmaHistory.play();
		}
	}
	
	this.draw=function(){
			background(255);


			      if (goToNext==false){
			      	   textAlign(CENTER);
			      		 textFont(typewriterBold);
			textSize(24);
  	fill(0);
  	text("Loading...\nPlease wait",width/2,height-75);

  }

  else if (goToNext==true){
  	   textAlign(CENTER);
  		 textFont(typewriterBold);
			textSize(24);
  	  	fill(0);
  	text("Project loaded.\nPress right arrow to continue",width/2,height-75);

  }
			//print(goToNext);
		    textAlign(CENTER);
  textSize(60);
  textFont(typewriterBold);
	
		push();
		translate(denbyPosition.x,denbyPosition.y);
	
		scale(0.15);
		//image(setsuko,0,0);
		//stroke(231, 76, 60);
	//	stroke(241, 196, 15);

				stroke(52, 152, 219);
		let grandpaVolume=grandpaAmp.getLevel();
		let grandpaBorderSize=map(grandpaVolume,0,0.3,50,1000);
		if (grandpaHistory.isPlaying()==true){
			strokeWeight(grandpaBorderSize);
		}
		else{
		strokeWeight(50);
		}
	
		noFill();
		rect(0,0,1564,1565);
		pop();
		push();
		translate(asakoPosition.x,asakoPosition.y);
		scale(0.15);
		//image(denby,0,0);
	//	stroke(52, 152, 219);

			stroke(241, 196, 15);
		strokeWeight(50);
		noFill();
		rect(0,0,1564,1565);
		pop();
		
			push();
		translate(setsukoPosition.x,setsukoPosition.y);
		let grandmaVolume=grandmaAmp.getLevel();
		let grandmaBorderSize=map(grandmaVolume,0,0.3,50,1000);
		scale(0.15);
		//image(asako,0,0);
	//	stroke(241, 196, 15);
			stroke(231, 76, 60);
			if (grandmaHistory.isPlaying()==true){
				strokeWeight(grandmaBorderSize);
		}
		else{
		strokeWeight(50);
		}
	
		noFill();
		rect(0,0,1564,1565);
		pop();
		fill(0);
		text("In Loving Memory Of",width/2,150);
			drawSprites(grandparents);

		push();
		translate(denbyPosition.x+85,denbyPosition.y-85)
		scale(0.05);
		image(listen,0,0);
		pop();

			push();
		translate(setsukoPosition.x+85,setsukoPosition.y-85)
		scale(0.05);
		image(listen,0,0);
		pop();


		if (showDenbyText==true){
			 textFont(typewriterBold);
			textSize(20);
			text("\"Grandpa\" Denby Kawahara",denbyPosition.x,denbyPosition.y+145);
			 textFont(typewriter);
			textSize(15);
			text("Age at Internment: 20",denbyPosition.x,denbyPosition.y+165);
			text("Relocated from: Los Angeles, CA",denbyPosition.x,denbyPosition.y+185);
			text("Internment Camp: Gila River",denbyPosition.x,denbyPosition.y+205);
		}
		
				if (showSetsukoText==true){
			 textFont(typewriterBold);
			textSize(20);
			text("\"Grandma\" Setsuko Nishizono",setsukoPosition.x,setsukoPosition.y+145);
			 textFont(typewriter);
			textSize(15);
			text("Age at Internment: 18",setsukoPosition.x,setsukoPosition.y+165);
			text("Relocated from: Oakland, CA",setsukoPosition.x,setsukoPosition.y+185);
			text("Internment Camp: Topaz",setsukoPosition.x,setsukoPosition.y+205);
		}
		
		if (showAsakoText==true){
			 textFont(typewriterBold);
			textSize(20);
			text("\"Auntie\" Asako Nishizono",asakoPosition.x,asakoPosition.y+145);
			 textFont(typewriter);
			textSize(15);
			text("Age at Internment: 21",asakoPosition.x,asakoPosition.y+165);
			text("Relocated from: Oakland, CA",asakoPosition.x,asakoPosition.y+185);
			text("Internment Camp: Topaz",asakoPosition.x,asakoPosition.y+205);
		}
		

	}

	
	
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

		text('Japanese Americans were unjustly interned \n between the years of 1942 and 1945.',width/2,(height/2)+40);
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
		background(142, 202, 230);


	}
	
	this.draw = function(){
				background(142, 202, 230);
					imageMode(CENTER);
		push();
		translate(width/2,height/2);
		scale(1.15);
		image(kitchenBackground,0,0);
		pop();
		
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
			textAlign(CENTER);
			textFont(typewriter);
			textSize(18);
			text('Japanese Americans on the West Coast, many of whom were American citizens, were sent to one of 10 different camps across the country.',width/2,height-650);
						textFont(typewriterBold);

			text('\n\nMany were hastily built and in remote areas.',width/2,height-650);

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

			supervised = new Clickable();
			supervised.x = 635;
			supervised.y = 613;
			supervised.color = "#f1c40f66";       //Background color of the clickable (hex number as a string)
			supervised.strokeWeight = 0;    
			supervised.text = ""; //Stroke width of the clickable (float)
			supervised.resize(83, 7);
			supervised.cornerRadius = 1; 
			showSupervised=false;

				residence = new Clickable();
			residence.x = 507;
			residence.y = 433;
			residence.color = "#f1c40f66";       //Background color of the clickable (hex number as a string)
			residence.strokeWeight = 0;    
			residence.text = ""; //Stroke width of the clickable (float)
			residence.resize(65, 7);
			residence.cornerRadius = 1; 
			showResidence=false;

			imprisoned = new Clickable();
			imprisoned.x = 649;
			imprisoned.y = 290;
			imprisoned.color = "#f1c40f66";       //Background color of the clickable (hex number as a string)
			imprisoned.strokeWeight = 0;    
			imprisoned.text = ""; //Stroke width of the clickable (float)
			imprisoned.resize(33, 7);
			imprisoned.cornerRadius = 1; 
			showImprisoned=false;

				disrupt = new Clickable();
			disrupt.x = 470;
			disrupt.y = 448;
			disrupt.color = "#f1c40f66";       //Background color of the clickable (hex number as a string)
			disrupt.strokeWeight = 0;    
			disrupt.text = ""; //Stroke width of the clickable (float)
			disrupt.resize(180, 7);
			disrupt.cornerRadius = 1; 
			showDisrupt=false;


    }
	
	

    this.draw = function() {
    					background(255);

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
	
			supervised.onPress = function(){
				showSupervised=!showSupervised;
			}
			
			supervised.onHover = function(){
 		supervised.color = "#e67e2266";
}
			
			supervised.onOutside = function(){
			supervised.color = "#f1c40f66";       //Background color of the clickable (hex number as a string)

}

			residence.onPress = function(){
				showResidence=!showResidence;
			}
			
			residence.onHover = function(){
 		residence.color = "#e67e2266";
}
			
			residence.onOutside = function(){
			residence.color = "#f1c40f66";       //Background color of the clickable (hex number as a string)

}

		imprisoned.onPress = function(){
				showImprisoned=!showImprisoned;
				
			}
			
			imprisoned.onHover = function(){
 		imprisoned.color = "#e67e2266";
}
			
			imprisoned.onOutside = function(){
			imprisoned.color = "#f1c40f66";       //Background color of the clickable (hex number as a string)

}

		disrupt.onPress = function(){
				showDisrupt=!showDisrupt;
				
			}
			
			disrupt.onHover = function(){
 		disrupt.color = "#e67e2266";
}
			
			disrupt.onOutside = function(){
			disrupt.color = "#f1c40f66";       //Background color of the clickable (hex number as a string)

}
	
		//	background(255,0,0);
			
				push();
				translate(width/2,height/2);
				scale(0.20);
				image(evacuationImg,0,0);
				pop();
					nonalien.draw();
					supervised.draw();
					residence.draw();
					imprisoned.draw();
					disrupt.draw();
			if (showNonAlienRect==true){
				stroke(0);
				strokeWeight(1);
				line(nonalien.x-25,nonalien.y-15,nonalien.x,nonalien.y);


				strokeWeight(0.5);
				fill(241, 196, 15);
				push();
				textSize(5.25);
				textAlign(LEFT);
				translate(nonalien.x-50,nonalien.y-25);
				rect(0,5,65,12.5);
				fill(0);
				noStroke();
				textFont('Times New Roman');

				text('*meaning American Citizens',1,12);
				pop();
			}

					if (showSupervised==true){
				stroke(0);
				strokeWeight(1);
				line(supervised.x-25,supervised.y-15,supervised.x,supervised.y);


				strokeWeight(0.5);
				fill(241, 196, 15);
				push();
				textSize(5.25);
				textAlign(LEFT);
				translate(supervised.x-50,supervised.y-25);
				rect(0,5,45,12.5);
				fill(0);
				noStroke();
				textFont('Times New Roman');

				text('*Often at gunpoint',1,12);
				pop();
			}

			if (showResidence==true){
				stroke(0);
				strokeWeight(1);
				line(residence.x-25,residence.y-15,residence.x,residence.y);


				strokeWeight(0.5);
				fill(241, 196, 15);
				push();
				textSize(5.25);
				textAlign(LEFT);
				translate(residence.x-50,residence.y-25);
				rect(0,5,115,12.5);
				fill(0);
				noStroke();
				textFont('Times New Roman');

				text('*sometimes horse stables & racetracks for MONTHS',1,12);
				pop();
			}

			if (showImprisoned==true){
				stroke(0);
				strokeWeight(1);
				line(imprisoned.x-25,imprisoned.y-15,imprisoned.x,imprisoned.y);


				strokeWeight(0.5);
				fill(241, 196, 15);
				push();
				textSize(5.25);
				textAlign(LEFT);
				translate(imprisoned.x-50,imprisoned.y-25);
				rect(0,5,(textWidth('*removed and imprisoned')-2),12.5);
				fill(0);
				noStroke();
				textFont('Times New Roman');

				text('*removed and imprisoned',1,12);
				pop();
			}


			if (showDisrupt==true){
				stroke(0);
				strokeWeight(1);
				line(disrupt.x,disrupt.y+15,disrupt.x,disrupt.y);


				strokeWeight(0.5);
				fill(241, 196, 15);
				push();
				textSize(5.25);
				textAlign(LEFT);
				translate(disrupt.x,disrupt.y+5);
				rect(0,5,(textWidth('5) Disrupt the lives and accomplishments of 120,000 Japanese Americans')-15),12.5);
				fill(0);
				noStroke();
				textFont('Times New Roman');

				text('5) Disrupt the lives and accomplishments of 120,000 Japanese Americans',1,12);
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
		textAlign(LEFT);
	textFont(typewriterBold);
	textSize(30);
	fill(0);
	text("Civilian Exclusion Orders",15,height/6);
		textSize(25);

	textFont(typewriter);
	text("\n\n\n\n\ninformed Japanese Americans\nwith euphemistic language \nthat the U.S. government was\nremoving them from their homes.",15,height/6);
	text("\n\n\n\n\nClick on the highlighted text\nto see how artist Qris Yamashita\nmodified the euphemistic\nlanguage.",width-410,height/6);
		
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

function cases(){
	// here, users will click on each case to "decide" them, and see that all were struck down
	this.setup=function(){
	
			createCanvas(canvasWidth, canvasHeight);
					korematsu=createSprite(width/2,height/2);

	  gavel = createSprite(width/2, height/2);
		gavel.addAnimation('normal', 'Gavel.png');
		gavel.scale=0.15; 
		gavel.setCollider("circle", 25, 25, 5);
		gavel.rotation=60;
		
		korematsu.addAnimation('normal', 'Korematsu.png');
		korematsu.scale=0.45;

	  internmentCases = new Group();
	internmentCases.add(korematsu);
		internmentCases.add(gavel);
		
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
		drawSprites(internmentCases);
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

function reparations(){
//planning on building on Sketch 4 
// Going to add bolded text for certain words with words[i]
//also going to have it do different things with mousePressed
	this.setup=function(){
//createCanvas(960,668);
					createCanvas(canvasWidth, canvasHeight);

textAlign(LEFT,CENTER);
textSize(18);

textFont(typewriter);
		


		
	}
	
	this.draw=function(){
	//	m = map(mouseX, 200, width - 500, 0, 1);
		m = map(mapValue, 0, 100, 0, 1);

		//insert mapValue here
	m = constrain(m, 0, 1);
	background(255);
let x = 0;
let y=20;
let counter =0;
img.loadPixels();
//paragraph formatting adapted from text parse- Alice https://www.openprocessing.org/sketch/782516
 let margin = 40;
  let thex = margin; // start at the left
	let they=12;
	let endStartY=9;
	let startY = lerp(they, endStartY, m);
  they = startY; // start one line down
	let leading = 20.2; 
		for(i in words) // (for i = 0;i<phrasearray.length;i++)
  {
    if((words[i]=='Japanese')||(words[i]=='$20,000')||(words[i]=='grave')||(words[i]=='injustice')||(words[i]=='without'))//Makes the words "executive" and "order" bold
    {
			let newfontSizeMax = fontSizeMax;
			newfontSizeMax=endTextSize;
			let interFontSizeMax = lerp(fontSizeMax, newfontSizeMax, m);
		//if(mouseX<width/2){
			if (mapValue<50){
		textFont(typewriterBold);
			}
      textSize(interFontSizeMax);
    }
    else
    {
			textStyle(NORMAL);
				textFont(typewriter);
//textSize(fontSizeMin);
    }
		if (they>0){
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
			newLeading=7;
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
			//let newr= map(mouseX,100,width-100,startr,endr);
			//let newg= map(mouseX,100,width-100,startg,endg);
 //let newb= map(mouseX,100,width-100,startb,endb);
 let newr= map(mapValue,0,100,startr,endr);
			let newg= map(mapValue,0,100,startg,endg);
 
 let newb= map(mapValue,0,100,startb,endb);
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


	if (mouseX>width-250){
		tint(255, 255/2);
		push();
		//translate(width/2,height/2);
		//scale(1.10);
		imageMode(CORNER);
		// image(img, 0, 0);	
		 pop();
		
	}
		  fill(255);

  rectMode(CORNER);
  rect(sliderPositionX,sliderTop,40,sliderLength);
  rectMode(CENTER);
  ellipse(circleSliderX,circleSliderY,20,20);

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
function mouseDragged(){
	if(screenNum==7){
    if ((mouseY<=sliderBottom)&&(mouseY>=sliderTop)){
      circleSliderX=map(mouseY,sliderTop,sliderBottom,circleStartX,circleEndX);
      circleSliderY=map(mouseY,sliderTop,sliderBottom,circleStartY,circleEndY);
    mapValue=map(mouseY,sliderTop,sliderBottom,100,0);
  }
 else if (mouseY>sliderBottom){
   circleSliderY=circleEndY;
   mapValue=0;
 }
  else if (mouseY<sliderTop){
       circleSliderY=circleStartY;
    mapValue=100;
    
  }
}
}

	




	
	
