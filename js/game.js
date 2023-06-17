var hash = window.location.hash;
hash = hash.split('-');
player(hash[2]);
const colors = Array(8).fill('Red').concat(Array(8).fill('Blue'), Array(7).fill('Bystander'), 'Black',hash[2]);

let closeButtonElements = document.querySelectorAll('.close-button');

closeButtonElements.forEach(function (button) {
    button.onclick = function() {
        modal.style.display = "none";
    }
});

const random = getRandomSequenceWithSeed(hash[3], 75);
for (let i = colors.length - 1; i > 0; i--) {
    const j = Math.floor(random[i] * (i + 1));
    [colors[i], colors[j]] = [colors[j], colors[i]];
}

const modal = document.getElementById('gameOverModal');
const modalCloseButton = document.getElementById('modalCloseButton');
const modalCloseSpan = document.getElementById('modalCloseSpan');
const gameOverMessageEl = document.getElementById('gameOverMessage');
let redCountElement = document.getElementById('redCount');
let blueCountElement = document.getElementById('blueCount');

modalCloseButton.onclick = function() {
    window.location.href = 'index.html'
}

modalCloseSpan.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

let usedIndices = new Set();


let chechPack = () => {
    // Get the pack name from localStorage
    var fragment = window.location.hash;
    console.log(fragment);
    fragment = fragment.split('-')[0];
    if(fragment === '#1'){
    return [1,'https://raw.githubusercontent.com/MikeTsak/HTML-Codenames/main/packs/defult.json']}
    else if(fragment === '#2'){
    return [1,'https://raw.githubusercontent.com/MikeTsak/HTML-Codenames/main/packs/greek.json']}
    else if(fragment === '#3'){
    return [1,'https://raw.githubusercontent.com/MikeTsak/HTML-Codenames/main/packs/marvel.json']}
    else if(fragment === '#4'){
    return [1,'https://raw.githubusercontent.com/MikeTsak/HTML-Codenames/main/packs/starwars.json']}
    else if(fragment === '#5'){
    return [1,'https://raw.githubusercontent.com/MikeTsak/HTML-Codenames/main/packs/greekhistory.json']}
    else if(fragment === '#6'){
    return [1,'https://raw.githubusercontent.com/MikeTsak/HTML-Codenames/main/packs/disney.json']}
    else if(fragment === '#i6')
    return [2,'https://raw.githubusercontent.com/MikeTsak/HTML-Codenames/main/packs/idisney.json']
    
}

let type = chechPack()[0];
if (type === 1) {
    window.addEventListener('DOMContentLoaded', (event) => {

        const giturl = chechPack()[1];
        fetch(giturl)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('grid-container');


            const random = getRandomSequenceWithSeed(hash[1], data.length);

            let redCount = 0;
            let blueCount = 0;
            let j = 25;

            for(let i = 0; i < 25; i++){
                const item = document.createElement('div');
                item.className = 'grid-item';
                item.dataset.color = colors[i];
                // const random = Math.random();
                // console.log(random);
        
                // Generate a random index to pick an item from the JSON array
                let  randomIndex = Math.floor(random[i] * data.length);
                // Check if the index has been used already
                while (usedIndices.has(randomIndex)) {
                    // Redraw the random number if the index has been used
                    randomIndex = Math.floor(random[j] * data.length);
                    j++;
                }
                usedIndices.add(randomIndex);
                item.textContent = data[randomIndex];
                container.appendChild(item);

                if(colors[i] === 'Red') redCount++;
                if(colors[i] === 'Blue') blueCount++;
                redCountElement.textContent = redCount; // Update the red count display
                blueCountElement.textContent = blueCount; // Update the blue count display
            }

            // let redButtonClicked = false;
            // let blueButtonClicked = false;
            
            // const redButton = document.querySelector('.button-red');
            // redButton.addEventListener('click', () => {
            //     redButtonClicked = true;
            //     blueButtonClicked = false; // reset the other flags
            // });

            // const blueButton = document.querySelector('.button-blue');
            // blueButton.addEventListener('click', () => {
            //     blueButtonClicked = true;
            //     redButtonClicked = false; // reset the other flags
            // });

            container.addEventListener('click', event => {
                if(event.target.classList.contains('grid-item')) {
                    // Create and play the audio
                    if (event.target.dataset.clicked) {
                        // If the item has been clicked already, do nothing and return
                        return;
                    }
                            // Set the clicked attribute to true
                    event.target.dataset.clicked = true;
                    new Audio('sound/blip-131856.mp3').play();
                    const color = event.target.dataset.color;


                    switch(color) {
                        case 'Red':
                            event.target.style.backgroundColor = '#be1200';
                            event.target.style.color = '#f5f5f5';
                            redCount--;
                            redCountElement.textContent = redCount; // Update the red count display
                            break;
                        case 'Blue':
                            event.target.style.backgroundColor = '#0000be';
                            event.target.style.color = '#f5f5f5';
                            blueCount--;
                            blueCountElement.textContent = blueCount; // Update the blue count display
                            break;
                        case 'Bystander':
                            event.target.style.backgroundColor = '#bdb5b5';
                            event.target.style.color = 'black';
                            break;
                        case 'Black':
                            event.target.style.backgroundColor = 'black';
                            event.target.style.color = '#f5f5f5';
                            gameOverMessageEl.textContent = 'Game over!';
                            modal.style.display = "block";
                            new Audio('sound/gameover-153314.mp3').play();
                            return;
                    }
                }
                if(redCount === 0) {
                    gameOverMessageEl.textContent = 'Red wins!';
                    modal.style.display = "block";
                    redCountElement.textContent = redCount; // Update the red count display
                    new Audio('sound/gameover-153314.mp3').play();
                }
                if(blueCount === 0) {
                    gameOverMessageEl.textContent = 'Blue wins!';
                    modal.style.display = "block";
                    blueCountElement.textContent = blueCount; // Update the blue count display
                    new Audio('sound/gameover-153314.mp3').play();
                }

            });
        });
    
    });
}else if (type === 2) {
    window.addEventListener('DOMContentLoaded', (event) => {

        const giturl = chechPack()[1];
        fetch(giturl)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('grid-container');
            const random = getRandomSequenceWithSeed(hash[1], data.length);
    
            let redCount = 0;
            let blueCount = 0;
            let j = 25;
    
            for(let i = 0; i < 25; i++){
                const item = document.createElement('div');
                item.className = 'grid-item';
                item.dataset.color = colors[i];
            
                let randomIndex = Math.floor(random[i] * data.length);
                while (usedIndices.has(randomIndex)) {
                    randomIndex = Math.floor(random[j] * data.length);
                    j++;
                }
                usedIndices.add(randomIndex);
                
                // Create an img element and append it to the item
                const img = document.createElement('img');
                img.src = data[randomIndex];
                img.className = 'grid-img';
                item.appendChild(img);
            
                container.appendChild(item);
                // console.log(data[randomIndex]);
    
                if(colors[i] === 'Red') redCount++;
                if(colors[i] === 'Blue') blueCount++;
                redCountElement.textContent = redCount; // Update the red count display
                blueCountElement.textContent = blueCount; // Update the blue count display
            }
    
            container.addEventListener('click', event => {
                if(event.target.classList.contains('grid-item')) {
                    if (event.target.dataset.clicked) {
                        return;
                    }
                    event.target.dataset.clicked = true;
                    new Audio('sound/blip-131856.mp3').play();
                    const color = event.target.dataset.color;
            
                    // Get the img element inside the item
                    const img = event.target.querySelector('.grid-img');
            
                    switch(color) {
                        case 'Red':
                            img.src = 'img/red.png';
                            redCount--;
                            event.target.style.backgroundColor = '#be1200';
                            redCountElement.textContent = redCount; 
                            break;
                        case 'Blue':
                            img.src = 'img/blue.png';
                            blueCount--;
                            event.target.style.backgroundColor = '#0000be';
                            blueCountElement.textContent = blueCount;
                            break;
                        case 'Bystander':
                            img.src = 'img/bystander.png';
                            event.target.style.backgroundColor = '#bdb5b5';
                            break;
                        case 'Black':
                            img.src = 'img/black.png';
                            gameOverMessageEl.textContent = 'Game over!';
                            event.target.style.backgroundColor = '#bdb5b5';
                            modal.style.display = "block";
                            new Audio('sound/gameover-153314.mp3').play();
                            return;
                    }
    
                    if(color === 'Black') {
                        modal.style.display = "block";
                        gameOverMessageEl.textContent = "Game Over, " + getOppositeTeam(hash[2]) + " Team Wins!";
                        return;
                    }
    
                    if((redCount === 0 && hash[2] === 'Red') || (blueCount === 0 && hash[2] === 'Blue')) {
                        modal.style.display = "block";
                        gameOverMessageEl.textContent = "Game Over, " + hash[2] + " Team Wins!";
                        return;
                    }
    
                    if((redCount === 0 && hash[2] === 'Blue') || (blueCount === 0 && hash[2] === 'Red')) {
                        modal.style.display = "block";
                        gameOverMessageEl.textContent = "Game Over, " + getOppositeTeam(hash[2]) + " Team Wins!";
                        return;
                    }
                }
            });
        });
    });
}




function getRandomSequenceWithSeed(seed, length) {
    const a = 1664525;
    const c = 1013904223;
    const m = Math.pow(2, 32);
  
    const sequence = [];
    let current = seed;
  
    for (let i = 0; i < length; i++) {
      current = (a * current + c) % m;
      sequence.push(current / m);
    }
  
    return sequence;
    }

function player(x) {
    const firstPlayerElement = document.getElementById('first-player');
    if (x === 'Red') {
        firstPlayerElement.textContent = `Red plays first`;;
        firstPlayerElement.style.color = '#be1200';
    }else{ firstPlayerElement.textContent = `Blue plays first`;
    firstPlayerElement.style.color = '#0000be';}
}
//  TIMER STAFF
let intervalId = null;

const startTimerButton = document.getElementById('startTimerButton');
const timerDisplay = document.getElementById('timer');

startTimerButton.addEventListener('click', resetAndStartTimer);

function startTimer() {
    let seconds = 0;
    let minutes = 1;  // Set it to 59 for 60 minutes
    timerDisplay.textContent = formatTime(minutes) + ':' + formatTime(seconds);
    timerDisplay.classList.add('running');
    intervalId = setInterval(function() {
        seconds--;
        if (seconds < 0) {
            seconds = 59;
            minutes--;
        }
        timerDisplay.textContent = formatTime(minutes) + ':' + formatTime(seconds);
        if (minutes === 0 && seconds === 0) {
            clearInterval(intervalId);
            new Audio('sound/timer_alarm-123412.mp3').play();
            timerDisplay.classList.remove('running');
        }
    }, 1000);
}

function resetAndStartTimer() {
    // If a timer is already running, clear it
    if (intervalId) {
        clearInterval(intervalId);
        timerDisplay.classList.remove('running');
    }

    // Start the timer
    startTimer();
}

function formatTime(time) {
    return time < 10 ? '0' + time : time;
}


// Share link button


const shareButton = document.getElementById('shareButton');
shareButton.addEventListener('click', () => {
    let link = 'https://miketsak.gr/projects/spy/solution.html#' + window.location.hash;
    if (navigator.share) {
      navigator.share({
        title: 'Codename Game Key',
        text: 'Here is the key to our game: ' + link,
        url: link,
      })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error));
    } else {
      console.log('Share not supported on this browser, copy this link: ' + link);
    }
  });


// Show QR code button
const qrcodeButton = document.getElementById('qrcodeButton');
const qrcodeDiv = document.getElementById('qrcode');
const qrModal = document.getElementById('qrModal');
const qrClose = document.getElementById('qrClose');

qrcodeButton.addEventListener('click', () => {
    // Clear the div and create the QR code
    qrcodeDiv.innerHTML = '';
    let link = 'https://miketsak.gr/projects/spy/solution.html' + window.location.hash;
    let qrcode = new QRCode(qrcodeDiv, {
        text: link,
        width: 128,
        height: 128,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });

    // Show the modal
    qrcodeDiv.classList.add('visible');
    qrModal.style.display = "block";
});

// When the user clicks on <span> (x), close the modal
qrClose.addEventListener('click', () => {
    qrModal.style.display = "none";
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == qrModal) {
        qrModal.style.display = "none";
    }
}