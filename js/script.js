$(document).ready(function() {
    $('.introScreen').fadeIn(600);

})

var player;
var tileArray = [];
var playCount = 0;
var result = false;

$('#playTileX').on('click', function() {
    console.log('i clicked the x button')
    player = 'x';
    computer = 'o';
    startGame();
})

$('#playTileO').on('click', function() {
    console.log('i clicked the o button')
    player = 'o';
    computer = 'x';
    startGame();
})

$('.tile').on('click', function() {
    playersTurn(this);
})

$('.tryAgain').on('click', function() {
    newGame();
})

$('.tryAgain button').on('click', function() {
    newGame();
})


function startGame() {
    console.log('game starts!');
    $('.introScreen').fadeOut(200);
    $('.tile').fadeIn(1000);
}

function playersTurn(arg) {
    var myInput = $(arg).text();
    if (!myInput) {
        $(arg).text(player).addClass(player);
        var identity = parseInt(($(arg).attr('id')).slice(-1));
        tileArray.push(identity);
        playCount++;
        checkIfWin(player);
        if (playCount > 5) {
            console.log('game should be over');

        } else if (result == true) {
            checkIfWin(player);
        } else {
            setTimeout(computersTurn, 500);
        }
    }
}


function computersTurn() {
    var turn = Math.floor(Math.random() * (10 - 1) + 1);
    if (tileArray.indexOf(turn) > -1) {
        computersTurn();

    } else {
        tileArray.push(turn)
        $('#tile' + turn).text(computer).addClass(computer);
    }

    checkIfWin(computer);
}


function checkIfWin(move) {

    //all possible options in an array:
    var optionArray = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ]

    for (var i = 0; i < optionArray.length; i++) {
        if ($('#tile' + optionArray[i][0]).text() == move && $('#tile' + optionArray[i][1]).text() == move && $('#tile' + optionArray[i][2]).text() == move) {
            result = true;
            $('#tile' + optionArray[i][0]).addClass('winner');
            $('#tile' + optionArray[i][1]).addClass('winner');
            $('#tile' + optionArray[i][2]).addClass('winner');
            setTimeout(function() {
                announceWinner(move)
            }, 1000);
        }
    }
}

function announceWinner(arg) {
    playCount = 0;
    $('.tile').fadeOut();
    setTimeout(function() {
        $('.winScreen').fadeIn(800);
    }, 500);
    $('.winScreen').text(arg + ' won!');
    setTimeout(function() {
        $('.winScreen').text('Game Restarting');
    }, 3000)
    setTimeout(function() {
        newGame();
    }, 5000)
}

function announceDraw() {
    playCount = 0;
    $('.tile').fadeOut();
    setTimeout(function() {
        $('.winScreen').fadeIn(800);
    }, 500);
    $('.winScreen').text("It's a draw!");
    setTimeout(function() {
        $('.winScreen').text('Game Restarting');
    }, 3000)
    setTimeout(function() {
        newGame();
    }, 5000)
}

function newGame() {
    $('.winScreen').fadeOut();
    player = '';
    tileArray = [];
    playCount = 0;
    result = false;
    $('.tile').removeClass('winner');
    $('.tile').text('');
    $('.introScreen').fadeIn(600);

}
