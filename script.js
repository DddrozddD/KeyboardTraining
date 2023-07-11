const inp = document.getElementById('NewText');
 inp.addEventListener('keydown', kDown);
 inp.addEventListener('keyup', kUp);

const ThisText = document.getElementById("ThisText");

const RandomSent = [
"We do business around the world",
"My sister runs a barber shop in Boston",
"Recognition is the most powerful motivation factor",
"We have to do some paperwork",
"We are open 24 hours a day",
"Our company operates an airline in Argentina"
]
ThisText.textContent = `${RandomSent[Math.floor(Math.random() * (RandomSent.length-1))]}`;
 var DopForText = 0;
 var DopText = "";
 var IntForNext = 0;
 var time;
 var CountOwnMis = 0;
 const AllKeys = document.querySelectorAll('.key');
 function ShowNext(){
 
var HaveLet = false;
AllKeys.forEach((item) => {
	if(ThisText.textContent[IntForNext].toUpperCase() == item.textContent.toUpperCase()){
		item.classList.add('highlighted2');
    HaveLet = true;
	}
});
if(HaveLet == false){
   document.getElementById('Space').classList.add('highlighted2');
  }
}
ShowNext();
 function kDown(e){
 	let text = `Type: ${e.type}| key: ${e.key}| Code: ${e.code}`;
 	console.log(text);
 	const KeyPressed = document.getElementById(e.code);
 	if(ThisText.textContent[0] == e.key){
 	  time = performance.now();
 	  DopForText++;
 	  DopText += e.key;
     IntForNext++;
 	}
 	else if ((ThisText.textContent[DopForText]) == e.key && e.key != "Backspace" && e.key != "Shift" && e.key != "Control"
   	&& e.key != "Meta" && e.key != " Alt" && e.key != "CapsLock"
   	&& e.key != " Tab") {
 	  DopForText++;
 	  DopText += e.key;
     IntForNext++;
   }
   else if(e.key != "Backspace" && e.key != "Shift" && e.key != "Control"
   	&& e.key != "Meta" && e.key != " Alt" && e.key != "CapsLock"
   	&& e.key != " Tab"){
   	//Здесь проверки я чисто поверхостные сделал, не заморачиваясь
   	DopForText++;
   	DopText += e.key;
   }
   else if(e.key == "Backspace"){
      AllKeys.forEach((item) => {
       item.classList.remove('highlighted2');
      });
     if((DopText[DopForText-1]) == (ThisText.textContent[DopForText-1])){
      IntForNext--;
     }
     var DopText2 = "";
     for(i = 0;i<DopText.length-1;i++){
     	DopText2 += DopText[i];
     }
     DopText = DopText2;
     DopForText--;
   
     CountOwnMis++;
     
   }
   if(KeyPressed){
      KeyPressed.classList.remove('highlighted2');
 		  KeyPressed.classList.add('highlighted');	  
 	}
 }
 function kUp(e){
 	const KeyPressed = document.getElementById(e.code);
 	if(KeyPressed){
      KeyPressed.classList.remove('highlighted2');
 		KeyPressed.classList.remove('highlighted');
 	}
 	if(DopForText==ThisText.textContent.length){
 		time = performance.now() - time;
 		alert(`Well done\n Mistakes: ${CheckText(DopText,ThisText.textContent)}\n Time:${~~(time / 100)}sec\n Mistakes that have been removed: ${CountOwnMis}`);
 		console.log(time);
 		inp.value = "";
 		DopForText = 0;
    IntForNext=0;
 		DopText = "";
    CountOwnMis = 0;
 		ThisText.textContent = `${RandomSent[Math.floor(Math.random() * (RandomSent.length-1))]}`;
 	}
 ShowNext();
 }

function CheckText(Text1,Text2){
	var Correct = 0;
	for(i = 0; i < Text1.length; i++){
		for(j = 0; j < Text2.length; j++){
		if(Text1[i] == Text2[j]){
		Correct++;
		i++;
	}
	}
	}
	return (Text1.length - Correct);
}
//не судите строго, я скорее всего многого не учел и код не очень красивый как по логике(