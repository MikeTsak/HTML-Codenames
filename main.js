window.addEventListener('DOMContentLoaded', (event) => {
    fetch('https://raw.githubusercontent.com/Gullesnuffs/Codenames/master/wordlist-eng.txt')
    .then(response => response.text())
        .then(data => {
            console.log(data);
            const container = document.getElementById('grid-container');

            for(let i = 0; i < 25; i++){
                const item = document.createElement('div');
                item.className = 'grid-item';
                
                // Generate a random index to pick an item from the JSON array
                const randomIndex = Math.floor(Math.random() * data.length);
                item.textContent = data[randomIndex];
                container.appendChild(item);
            }
        });
});
