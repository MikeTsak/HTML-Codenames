document.getElementById('play-button').addEventListener('click', () => {
    const selectedPack = document.getElementById('pack-select').value;
    //make a random number
    const random = Math.random();
    const random1 = Math.random();
    window.location.href = 'game.html#' + selectedPack + '-' + random + '-' + player() + '-' + random1;
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