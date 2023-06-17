var hash = window.location.hash;
hash = hash.split('-');
player(hash[2]);
const colors = Array(8).fill('Red').concat(Array(8).fill('Blue'), Array(7).fill('Bystander'), 'Black',hash[2]);

const random = getRandomSequenceWithSeed(hash[3], 75);
for (let i = colors.length - 1; i > 0; i--) {
    const j = Math.floor(random[i] * (i + 1));
    [colors[i], colors[j]] = [colors[j], colors[i]];
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

if(type === 1){
    window.addEventListener('DOMContentLoaded', (event) => {

        const giturl = chechPack()[1];
        fetch(giturl)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('grid-container');


            const random = getRandomSequenceWithSeed(hash[1], data.length);

            let j = 25;

            for(let i = 0; i < 25; i++){
                const item = document.createElement('div');
                item.className = 'grid-item';
                item.dataset.color = colors[i];
                // const random = Math.random();
                // console.log(random);
        
                // Generate a random index to pick an item from the JSON array
                let randomIndex = Math.floor(random[i] * data.length);

                while (usedIndices.has(randomIndex)) {
                    // Redraw the random number if the index has been used
                    randomIndex = Math.floor(random[j] * data.length);
                    j++;
                }
                usedIndices.add(randomIndex);
                item.textContent = data[randomIndex];

                const color = item.dataset.color;
                switch(color) {
                    case 'Red':
                        item.style.backgroundColor = '#be1200';
                        item.style.color = '#f5f5f5';
                        break;
                    case 'Blue':
                        item.style.backgroundColor = '#0000be';
                        item.style.color = '#f5f5f5';
                        break;
                    case 'Bystander':
                        item.style.backgroundColor = '#bdb5b5';
                        item.style.color = 'black';
                        break;
                    case 'Black':
                        item.style.backgroundColor = 'black';
                        item.style.color = '#f5f5f5';
                        break;
                }

                container.appendChild(item);
            }

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
            let usedIndices = new Set();
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
    
                const color = item.dataset.color;
                switch(color) {
                    case 'Red':
                        item.style.backgroundColor = '#be1200';
                        break;
                    case 'Blue':
                        item.style.backgroundColor = '#0000be';
                        break;
                    case 'Bystander':
                        item.style.backgroundColor = '#bdb5b5';
                        break;
                    case 'Black':
                        item.style.backgroundColor = 'black';
                        break;
                }
    
                container.appendChild(item);
            }
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
