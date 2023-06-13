emailjs.init("-iX3QP9LGAX_sIWEh");



document.getElementById('play-button').addEventListener('click', () => {
    const selectedPack = document.getElementById('pack-select').value;
    //make a random number

    const email = document.getElementById('email').value;
    if (validateEmail(email)) {
        const playButton = document.getElementById('play-button');
        playButton.innerHTML = '<div class="loading-spinner"></div>'; // Show loading spinner
        playButton.disabled = true; // Disable the button
        new Audio('sound/start-computeraif-14572.mp3').play();
        
        const randomboard = Math.random();
        const randomkey = Math.random();
        const firstplayer = player();

        const randomcolors = getRandomSequenceWithSeed(randomkey, 25);
        const colors = Array(8).fill('Red').concat(Array(8).fill('Blue'), Array(7).fill('Bystander'), 'Black',firstplayer);
        for (let i = colors.length - 1; i > 0; i--) {
            const j = Math.floor(randomcolors[i] * (i + 1));
            [colors[i], colors[j]] = [colors[j], colors[i]];
        }

        const gameid =  selectedPack + '-' + randomboard + '-' + firstplayer + '-' + randomkey
        sendEmail(email, gameid,colors);
}
    else {
        alert('Please enter a valid email address');
    }
});
// Get the pack name from localStorage
const packName = localStorage.getItem('selectedPack');

const player = () => {
    var random1 = Math.random();
    if (random1 < 0.5) {
        return 'Red';
    }
    else {
        return 'Blue';
    }
}

function sendEmail(to, id, colors) {
    // var gameid = email1 + id + email2;
    gameid = '1-0.03489599270465482-Blue-0.4684129801135253';
    var currentDate = new Date();
    var date = currentDate.toDateString(); // Format the date as a string
    var time = currentDate.toLocaleTimeString() // Format the time as a string

    var subject = "EYP Spy Master: Game Date: " + date + " Game Time: " + time;

    message = createEmojiTable(colors);
    // console.log(message);

    var templateParams = {
        to_email: to,
        subject: subject,
        gameid: id,
        table1: message[0] + message[1] + message[2] + message[3] + message[4],
        table2: message[5] + message[6] + message[7] + message[8] + message[9],
        table3: message[10] + message[11] + message[12] + message[13] + message[14],
        table4: message[15] + message[16] + message[17] + message[18] + message[19],
        table5: message[20] + message[21] + message[22] + message[23] + message[24],

    };

    emailjs.send("service_nngrdus", "template_rpgvlg6", templateParams)
        .then(function (response) {
            console.log("Email sent successfully!", response);
            window.location.href = 'game.html#' + id;
        }, function (error) {
            console.error("Email sending failed:", error);
            alert("Email sending failed. Please try again.");
            const playButton = document.getElementById('play-button');
            playButton.innerHTML = 'Play'; // Show loading spinner
            playButton.disabled = false; // Disable the button
        });
}

function validateEmail(email) {
    // Regular expression pattern for email validation
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Check if the email matches the pattern
    return emailPattern.test(email);
  }




  //make emoji map


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

    function createEmojiTable(colors) {
        let emojiTable = [];
        for (let i = 0; i < 25; i++) {
            if (colors[i] === 'Red') {
                emojiTable[i] = '🟥';
            } else if (colors[i] === 'Blue') {
                emojiTable[i] = '🟦';
            } else if (colors[i] === 'Bystander') {
                emojiTable[i] = '⬜';
            } else if (colors[i] === 'Black') {
                emojiTable[i] = '⬛';
            }
        }
        return emojiTable;
    }