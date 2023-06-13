var hash = window.location.hash;
hash = hash.split('-');
player(hash[2]);
const colors = Array(8).fill('Red').concat(Array(8).fill('Blue'), Array(7).fill('Bystander'), 'Black',hash[2]);

const random = getRandomSequenceWithSeed(hash[3], colors.length);
for (let i = colors.length - 1; i > 0; i--) {
    const j = Math.floor(random[i] * (i + 1));
    [colors[i], colors[j]] = [colors[j], colors[i]];
}

const modal = document.getElementById('gameOverModal');
const modalCloseButton = document.getElementById('modalCloseButton');
const modalCloseSpan = document.getElementsByClassName('close')[0];
const gameOverMessageEl = document.getElementById('gameOverMessage');

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

window.addEventListener('DOMContentLoaded', (event) => {

    const giturl = chechPack();
    fetch(giturl)
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('grid-container');


        const random = getRandomSequenceWithSeed(hash[1], data.length);

        let redCount = 0;
        let blueCount = 0;

        for(let i = 0; i < 25; i++){
            const item = document.createElement('div');
            item.className = 'grid-item';
            item.dataset.color = colors[i];
            // const random = Math.random();
            // console.log(random);
    
            // Generate a random index to pick an item from the JSON array
            const randomIndex = Math.floor(random[i] * data.length);
            item.textContent = data[randomIndex];
            container.appendChild(item);

            if(colors[i] === 'Red') redCount++;
            if(colors[i] === 'Blue') blueCount++;
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
                const color = event.target.dataset.color;
                switch(color) {
                    case 'Red':
                        event.target.style.backgroundColor = '#be1200';
                        event.target.style.color = '#f5f5f5';
                        redCount--;
                        break;
                    case 'Blue':
                        event.target.style.backgroundColor = '#0000be';
                        event.target.style.color = '#f5f5f5';
                        blueCount--;
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
                        return;
                }
            }
            if(redCount === 0) {
                gameOverMessageEl.textContent = 'Red wins!';
                modal.style.display = "block";
            }
            if(blueCount === 0) {
                gameOverMessageEl.textContent = 'Blue wins!';
                modal.style.display = "block";
            }

        });
    });
   
});


const chechPack = () => {
        // Get the pack name from localStorage
        var fragment = window.location.hash;
        console.log(fragment);
        fragment = fragment.split('-')[0];
        if(fragment === '#1'){
        return 'https://raw.githubusercontent.com/MikeTsak/HTML-Codenames/main/packs/defult.json'}
        else if(fragment === '#2'){
        return 'https://raw.githubusercontent.com/MikeTsak/HTML-Codenames/main/packs/greek.json'}
        else if(fragment === '#3'){
        return 'https://raw.githubusercontent.com/MikeTsak/HTML-Codenames/main/packs/marvel.json'}
        else if(fragment === '#4'){
        return 'https://raw.githubusercontent.com/MikeTsak/HTML-Codenames/main/packs/starwars.json'}
        else if(fragment === '#5'){
        return 'https://raw.githubusercontent.com/MikeTsak/HTML-Codenames/main/packs/greekhistory.json'}
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
