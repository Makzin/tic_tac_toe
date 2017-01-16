$(document).ready(function() {
    $('.introScreen').fadeIn(600);

})

var player;
var tileArray = [];
var playCount = 0;

$('#playTileX').on('click', function() {
    player = 'x';
    computer = 'o';
    startGame();
})

$('#playTileO').on('click', function() {
    player = 'o';
    computer = 'x';
    startGame();
})

$('.tile').on('click', function() {
    playersTurn(this);
})

function startGame() {
    $('.introScreen').fadeOut(200);
    $('.tile').fadeIn(1000);
}

function playersTurn(arg) {
    $(arg).text(player).addClass(player);
    var identity = parseInt(($(arg).attr('id')).slice(-1));
    tileArray.push(identity);
    playCount++;
    console.log(playCount);
    if (playCount > 4) {
        console.log('game should be over');
    } else {
        setTimeout(computersTurn, 1000);
    }
}


function computersTurn() {
    var turn = Math.floor(Math.random() * (10 - 1) + 1);
    if (tileArray.indexOf(turn) > -1) {
        console.log('its already here')
        computersTurn();

    } else {
        tileArray.push(turn)
        $('#tile' + turn).text(computer).addClass(computer);
        console.log(tileArray);
    }


}
