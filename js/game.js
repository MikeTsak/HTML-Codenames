window.addEventListener('DOMContentLoaded', (event) => {
    fetch('https://raw.githubusercontent.com/MikeTsak/HTML-Codenames/main/packs/defult.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('grid-container');

            for(let i = 0; i < 25; i++){
                const item = document.createElement('div');
                item.className = 'grid-item';
                
                // Generate a random index to pick an item from the JSON array
                const randomIndex = Math.floor(Math.random() * data.length);
                console.log(randomIndex);
                item.textContent = data[randomIndex];
                container.appendChild(item);
            }

            let redButtonClicked = false;
            let blueButtonClicked = false;
            
            const redButton = document.querySelector('.button-red');
            redButton.addEventListener('click', () => {
                redButtonClicked = true;
                blueButtonClicked = false; // reset the other flags
            });

            const blueButton = document.querySelector('.button-blue');
            blueButton.addEventListener('click', () => {
                blueButtonClicked = true;
                redButtonClicked = false; // reset the other flags
            });

            container.addEventListener('click', event => {
                if(redButtonClicked && event.target.classList.contains('grid-item')) {
                    event.target.style.backgroundColor = '#be1200';
                    event.target.style.color = 'white';
                    redButtonClicked = false; // Reset the flag
                } else if(blueButtonClicked && event.target.classList.contains('grid-item')) {
                    event.target.style.backgroundColor = 'blue';
                    event.target.style.color = 'white';
                    blueButtonClicked = false; // Reset the flag
                }
            });
        });
});
