

// Dash Board Section : 
let currentIndex=0;
let allTasks = JSON.parse(localStorage.getItem('allTasks')) || [];
allTasks.reverse();

function displayDashBoardCard(index){

    if(allTasks.length===0){

         document.querySelector(".main-dash .title").innerText = "No Missions Yet";


    }



    // retriving  the tasks  according to the index num:

    const currentTask=allTasks[index];

if(currentTask) {
        if(document.querySelector(".main-dash .title")) document.querySelector(".main-dash .title").innerText = currentTask.title;
        if(document.querySelector(".main-dash .notes")) document.querySelector(".main-dash .notes").innerText = currentTask.notes;
        if(document.querySelector(".main-dash .statue")) document.querySelector(".main-dash .statue").innerText = currentTask.status;
}



    // calculate the left mins : 


    let mins=Math.floor(currentTask.timeLeft/60);
     document.querySelector(".main-dash .time").innerText=currentTask.status==='Completed'?'Done':`${mins} Minutes Left`;


     const dashWrapper = document.querySelector(".dash-wrapper");

     if(currentTask.status==='Incomplete'){

        dashWrapper.style.cursor='pointer';
        dashWrapper.onclick=function(){
            localStorage.setItem('activeTaskId',currentTask.id);
            window.location.href = "index.html";


        };

        



     }
     else {
        dashWrapper.style.cursor = "default";
        dashWrapper.onclick = null;
    }
    


}


    document.getElementById("right").addEventListener("click", () => {
    if (currentIndex < allTasks.length - 1) {
        currentIndex++; 
        (currentIndex);
        displayDashBoardCard(currentIndex);
    }
});



document.getElementById("left").addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--; // 
        displayDashBoardCard(currentIndex);
    }
});

    document.addEventListener("DOMContentLoaded", () => {
    displayDashBoardCard(currentIndex);
});
      















