document.getElementById('play-button').addEventListener('click', () => {
    const selectedPack = document.getElementById('pack-select').value;
    localStorage.setItem('selectedPack', selectedPack);
    window.location.href = 'game.html';
});
// Get the pack name from localStorage
const packName = localStorage.getItem('selectedPack');