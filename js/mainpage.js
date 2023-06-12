document.getElementById('play-button').addEventListener('click', () => {
    const selectedPack = document.getElementById('pack-select').value;
    window.location.href = 'game.html#' + selectedPack;
});
// Get the pack name from localStorage
const packName = localStorage.getItem('selectedPack');