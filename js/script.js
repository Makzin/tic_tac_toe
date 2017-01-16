$(document).ready(function() {
    $('.introScreen').fadeIn(600);

})

var player;

$('#playTileX').on('click', function() {
    player = 'X';
    startGame();
})

$('#playTileO').on('click', function() {
    player = 'O';
    startGame();
})

$('.tile').on('click', function() {
    $('span').text(player);

})

function startGame() {
    $('.introScreen').fadeOut(200);
    $('.tile').fadeIn(1000);
}
