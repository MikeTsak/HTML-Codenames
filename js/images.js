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

window.addEventListener('DOMContentLoaded', (event) => {

    const giturl = chechPack();
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
    
            let  randomIndex = Math.floor(random[i] * data.length);
            while (usedIndices.has(randomIndex)) {
                randomIndex = Math.floor(random[j] * data.length);
                j++;
            }
            usedIndices.add(randomIndex);

            const img = document.createElement('img');
            img.src = data[randomIndex];
            img.alt = "game image";
            item.appendChild(img);
            container.appendChild(item);
            console.log(data[randomIndex]);

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

                switch(color) {
                    case 'Red':
                        event.target.style.backgroundColor = '#be1200';
                        event.target.style.color = '#f5f5f5';
                        redCount--;
                        redCountElement.textContent = redCount; 
                        break;
                    case 'Blue':
                        event.target.style.backgroundColor = '#0000be';
                        event.target.style.color = '#f5f5f5';
                        blueCount--;
                        blueCountElement.textContent = blueCount; 
                        break;
                    case 'Bystander':
                        event.target.style.backgroundColor = '#bdb5b5';
                        event.target.style.color = '#f5f5f5';
                        break;
                    case 'Black':
                        event.target.style.backgroundColor = '#000';
                        event.target.style.color = '#f5f5f5';
                        break;
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

// ... rest of your code

function chechPack(){
    //... Your logic here
    return "https://raw.githubusercontent.com/MikeTsak/HTML-Codenames/main/packs/idisney.json"
}

// ... rest of your code
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