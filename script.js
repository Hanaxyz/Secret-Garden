const UserName=document.getElementById("user-input");
const subName=document.getElementById("submit-name");
const welcomePage=document.getElementById("welcome-page");
const Hiuser=document.getElementById("hi-user");
const nameDisplay=document.getElementById("name");


const taskCard=document.querySelector(".task-card");
const flowerDisplay=document.querySelector(".task-flower");
const allSeeds = document.querySelectorAll('.seeds-container img' );

const submitFlower=document.getElementById("start-set");
const mainChoose=document.querySelector(".main-container");



const timerStepper=document.getElementById("timer-stepper");
const increaseBtn=document.getElementById("increase-time");
const decreaseBtn=document.getElementById("decrease-time");
const timeDisplay=document.getElementById("time-display");

const MinText=document.getElementById("minutes");//X

const setTimeTitle=document.getElementById("set-title");//X

const timeControl=document.querySelector(".controls-container");//T


const startMission=document.getElementById("start-now");//F



// pause & play buttons : 

const pause= document.getElementById('pause');
const play='<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 15l-5 3l0 -12l5 3l0 0M13 9l5 3l0 0l-5 3l0 0"><animate fill="freeze" attributeName="d" dur="0.6s" keyTimes="0;0.33;1" values="M9 18l-2 0l0 -12l2 0l0 12M15 6l2 0l0 12l-2 0l0 -12;M13 15l-5 3l0 -12l5 3l0 6M13 9l5 3l0 0l-5 3l0 -6;M13 15l-5 3l0 -12l5 3l0 0M13 9l5 3l0 0l-5 3l0 0"/></path></svg>'






// time variables :


const IS_TEST_MODE = true; 

let currentTime = IS_TEST_MODE ? 5 : 25; 
let totalDuration = 0;
let totalSeconds = IS_TEST_MODE ? 5 : (currentTime * 60);
let count = null;
let isRunning = false;




let activeTaskId = localStorage.getItem('activeTaskId');
let savedTasks = JSON.parse(localStorage.getItem('allTasks')) || [];
let currentTask = savedTasks.find(t => t.id === activeTaskId);

if (!IS_TEST_MODE && currentTask && currentTask.status === "Incomplete") {
    totalSeconds = currentTask.timeLeft;
    currentTime = Math.floor(totalSeconds / 60);
}








// 1) the user name check :




subName.addEventListener('click',()=>{
    const enteredName=UserName.value;
    if(enteredName){
        nameDisplay.innerText=enteredName;
    localStorage.setItem('storedName',enteredName);
     welcomePage.style.display="none"
     Hiuser.style.display="flex";
     mainChoose.style.display="flex";
     taskCard.style.display="flex";
     timerStepper.style.display='none';


    }

    

    else{
alert("Enter your name first 🌸")

    }




});


document.addEventListener("DOMContentLoaded", () => {
    const storedName = localStorage.getItem('storedName');
    if(storedName && welcomePage) {
        nameDisplay.innerText = storedName;
        welcomePage.style.display = "none";
        if(Hiuser) Hiuser.style.display = "flex";
        if(mainChoose) mainChoose.style.display = "flex";
        if(taskCard) taskCard.style.display = "flex";
    }
   
    renderGardenFlowers();
});

//2) choosing the flower and the mission OR




let selectedFlower='';

if(taskCard){
    taskCard.style.display = 'flex';
timerStepper.style.display='none';}

function chooseFlower(){
    allSeeds.forEach(element => {
        element.addEventListener('click',()=>{
             selectedFlower=element.alt;
            flowerDisplay.innerHTML="";
            const flowerImg=document.createElement('img');
            flowerImg.src=`assets/${selectedFlower}.png`;
            
    flowerImg.style.width="150px";
    flowerImg.style.display="block";
    flowerImg.style.margin="auto";

    flowerDisplay.appendChild(flowerImg);
    localStorage.setItem('selectedFlower',selectedFlower);









        })
        
    });


}




chooseFlower();


if(submitFlower){


    submitFlower.addEventListener('click',()=>{
        mainChoose.style.display="none";
        Hiuser.style.display="none";
        timerStepper.style.display='flex';


       
       


    })



}


//timer part : 
function timersetting(){





increaseBtn.addEventListener('click',()=>{
    currentTime+=5;
    
    if(currentTime>300){

        currentTime=300;
    }

    timeDisplay.innerText=currentTime;
    totalSeconds = IS_TEST_MODE ? currentTime : currentTime * 60;


});



decreaseBtn.addEventListener('click',()=>{
    currentTime-=5;
   
    if(currentTime<5){
    currentTime=5;


    }
     timeDisplay.innerText=currentTime;
     totalSeconds = IS_TEST_MODE ? currentTime : currentTime * 60;


});

if (startMission){

startMission.addEventListener('click',()=>{
   decreaseBtn.style.display="none";
   increaseBtn.style.display="none";
   MinText.style.display="none";


   
        const titleValue = document.getElementById("task-title").value;
        const notesValue = document.getElementById("add-notes").value;
        const flowerValue = localStorage.getItem('selectedFlower')


        let allTasks=JSON.parse(localStorage.getItem('allTasks'))||[];


  let newTask = {
    id: 'task_' + Date.now(),
    title: titleValue,
    notes: notesValue ? notesValue : 'no notes....',
    flower: flowerValue,
    status: "Incomplete",
    timeLeft: IS_TEST_MODE ? currentTime : currentTime * 60,
    xPos: Math.floor(Math.random() * 60) + 20, 
    yPos: Math.floor(Math.random() * 40) + 50
}

        allTasks.push(newTask);


        localStorage.setItem('allTasks',JSON.stringify(allTasks));
        localStorage.setItem('activeTaskId', newTask.id);
   startCountDown();



});

}





}
function renderGardenFlowers(newActiveFlowerId = null) {
    let gardenContainer = document.getElementById("garden-flowers-container");
    if (!gardenContainer) {
        gardenContainer = document.createElement("div");
        gardenContainer.id = "garden-flowers-container";
        
        document.body.appendChild(gardenContainer);
    }

   
    if (!document.body.classList.contains('Garden')) {
        gardenContainer.style.display = "none";
        return;
    } else {
        gardenContainer.style.display = "block";
    }

    gardenContainer.innerHTML = "";
    let allTasks = JSON.parse(localStorage.getItem('allTasks')) || [];
    let needsUpdate = false;
 allTasks.forEach(task => {
    if (task.status === "Completed" && task.flower) {
        
     
        if (task.yPos < 50 || task.yPos > 90) {
            task.yPos = Math.floor(Math.random() * 40) + 50;
            needsUpdate = true;
        }
        // --------------------------------------------------------

        const flowerImg = document.createElement('img');
        flowerImg.src = `assets/${task.flower}.png`;
        flowerImg.className = "bloom-anim";
        flowerImg.style.position = "absolute";
        flowerImg.style.left = `${task.xPos}%`;
        flowerImg.style.top = `${task.yPos}%`;
        flowerImg.style.width = "130px";
        flowerImg.style.transform = "translate(-50%, -50%)";

      
        if (task.id === newActiveFlowerId) {
            flowerImg.style.filter = "drop-shadow(0 0 20px rgba(255, 255, 255, 0.9)) brightness(1.3)";
            flowerImg.style.transition = "all 5s ease-in-out"; 
            
            setTimeout(() => {
                flowerImg.style.filter = "none";
            }, 5000);
        }
        gardenContainer.appendChild(flowerImg);
    }
});

}
function startCountDown(){
if (count) clearInterval(count);

startVisuals();

if(pause)pause.style.display='inline-block';
startMission.style.display='none';
increaseBtn.style.display = 'none';
decreaseBtn.style.display = 'none';
setTimeTitle.style.display='none';
MinText.style.display = 'none';

timeControl.classList.add('in-garden');
timeControl.style.display = 'flex';
timeDisplay.style.display = 'block';


if (totalSeconds === 0 || isNaN(totalSeconds)) {
    totalSeconds = IS_TEST_MODE ? currentTime : currentTime * 60;
}
totalDuration = totalSeconds;

isRunning=true;

 count=setInterval(()=>{
    totalSeconds--;

    if (totalSeconds < 0) {
        totalSeconds = 0;
    }

    let mins=Math.floor(totalSeconds/60);
    let sec=totalSeconds%60;

    if (sec<10){
        sec="0"+sec;
    }

    timeDisplay.innerText = `${mins}:${sec}`;
    updateTimerVisuals(totalSeconds, totalDuration);

    if(totalSeconds<=0){
        clearInterval(count);
        isRunning=false;

        document.body.classList.add('Garden');

        if(timerStepper) timerStepper.style.display = 'none'; 
        if(timeControl) timeControl.style.display = 'none';
        if(mainChoose) mainChoose.style.display = 'none'; 
        if(taskCard) taskCard.style.display = 'none'; 

        const animThrons = document.querySelector(".anim-throns");
        const bigThorns=document.querySelector(".big-thorns");
        const patternTop = document.querySelector('.pattern-top');
        const patternBottom = document.querySelector('.pattern-bottom');

       if (bigThorns) {
    bigThorns.style.display = "none";
    bigThorns.classList.remove('reveal');
}
if (animThrons) {
    animThrons.style.display = "none";
    animThrons.classList.remove('reveal');
}
        if(patternTop) patternTop.style.display = "none";
        if(patternBottom) patternBottom.style.display = "none";

        let currentActiveId = localStorage.getItem('activeTaskId');
        let updatedTasks = JSON.parse(localStorage.getItem('allTasks')) || [];
        let taskToComplete = updatedTasks.find(t => t.id === currentActiveId);

        if (taskToComplete) {
            taskToComplete.status = "Completed";
            taskToComplete.timeLeft = 0;
            localStorage.setItem('allTasks', JSON.stringify(updatedTasks));
        }

        renderGardenFlowers(currentActiveId);

        if(typeof displayDashBoardCard === "function") {
            displayDashBoardCard();
        }

        return;
    }

},1000);


}






timersetting();
if(typeof displayDashBoardCard === "function") {
    displayDashBoardCard();
}








// the visual part : 


// fisrt the we shoudl go to the user garden and then the elements appear:
function startVisuals(){
    document.body.classList.add('Garden');
    
    const patternTop = document.querySelector('.pattern-top');
    const patternBottom = document.querySelector('.pattern-bottom');
    const animThrons = document.querySelector(".anim-throns");
    const bigThorns = document.querySelector(".big-thorns");

  
    if(patternTop) patternTop.style.display = "block";
    if(patternBottom) patternBottom.style.display = "block";
    
    if(bigThorns){
        bigThorns.style.display = "block"; 
        bigThorns.classList.add('reveal');
    }
    if(animThrons){
        animThrons.style.display = "block"; 
        animThrons.classList.add('reveal');
    }
}

function updateTimerVisuals(timeLeft, totalDuration){
    const patternTop = document.querySelector('.pattern-top');
    const patternBottom = document.querySelector('.pattern-bottom');
    const bigThorns = document.querySelector(".big-thorns");

    const timePercent = timeLeft / totalDuration;
    const fadingPercent = (1 - timePercent) * 100;

    if(patternTop){
        patternTop.style.transform = `translateX(-50%) scale(2.5) translateY(-${fadingPercent}%)`;
        patternTop.style.opacity = timePercent;
    }
    if(patternBottom){
        patternBottom.style.transform = `translateX(-50%) scale(2.5) rotate(180deg) translateY(-${fadingPercent}%)`;
        patternBottom.style.opacity = timePercent;
    }
    if(bigThorns) {
        bigThorns.style.opacity = timePercent;
    }
}

function stopVisuals() {
    const animThrons = document.querySelector(".anim-throns");
    const bigThorns = document.querySelector(".big-thorns");
    const patternTop = document.querySelector('.pattern-top');
    const patternBottom = document.querySelector('.pattern-bottom');
    
    if (bigThorns) bigThorns.classList.remove('reveal');
    if (animThrons) animThrons.classList.remove('reveal');
    if (bigThorns) bigThorns.style.display = "none";
    if (animThrons) animThrons.style.display = "none";
    
  
    if (patternTop) patternTop.style.transform = "";
    if (patternBottom) patternBottom.style.transform = "";
}

if (pause) {
    pause.addEventListener('click', () => {
        if (isRunning) {
            
            clearInterval(count);
            count = null;
            isRunning = false;

            
            pause.innerHTML = play;

            
            if (currentTask) {
                currentTask.timeLeft = totalSeconds;
                localStorage.setItem('allTasks', JSON.stringify(savedTasks));
            }
        } else {
           
            startCountDown();

          
            pause.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 18l-2 0l0 -12l2 0l0 12M15 6l2 0l0 12l-2 0l0 -12"/></svg>';
            
            isRunning = true;
        }
    });
}

const gardenNavBtn = document.getElementById("nav-garden-btn"); 

if (gardenNavBtn) {
    gardenNavBtn.addEventListener('click', () => {
        document.body.classList.add('Garden');
        renderGardenFlowers();
        const gardenContainer = document.getElementById("garden-flowers-container");
        if (gardenContainer) {
            gardenContainer.style.display = "block";
        }
    });
}