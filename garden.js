document.addEventListener("DOMContentLoaded", () => {
  
    renderGardenFlowers();
});

function renderGardenFlowers() {
    let gardenContainer = document.getElementById("garden-flowers-container");
    if (!gardenContainer) {
        gardenContainer = document.createElement("div");
        gardenContainer.id = "garden-flowers-container";
        document.body.appendChild(gardenContainer);
    }
    
    gardenContainer.innerHTML = "";
    let allTasks = JSON.parse(localStorage.getItem('allTasks')) || [];
    
    allTasks.forEach(task => {
        if (task.status === "Completed" && task.flower) {
            const flowerImg = document.createElement('img');
            flowerImg.src = `assets/${task.flower}.png`;
            flowerImg.style.position = "absolute";
            flowerImg.style.left = `${task.xPos}%`;
            flowerImg.style.top = `${task.yPos}%`;
            flowerImg.style.width = "130px";
            flowerImg.style.transform = "translate(-50%, -50%)";
            gardenContainer.appendChild(flowerImg);
        }
    });
}