$(document).ready(function() {
    $('.introScreen').fadeIn(600);

})

var player;
var tileArray = [];
var playCount = 0;
var result = false;
var gameInProgress = false;

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

$('.tryAgain').on('click', function() {
    if (gameInProgress == true) {
        newGame();
    } else {
        return;
    }
})

$('.tryAgain button').on('click', function() {
    if (gameInProgress == true) {
        newGame();
    } else {
        return;
    }
})


function startGame() {
    gameInProgress = true;
    $('.introScreen').fadeOut(200);
    $('.tile').fadeIn(1000);
    setTimeout(computersTurn, 500)
}

function playersTurn(arg) {
    gameInProgress = true;
    var myInput = $(arg).text();
    if (!myInput) {
        $(arg).text(player).addClass(player);
        var identity = parseInt(($(arg).attr('id')).slice(-1));
        tileArray.push(identity);
        playCount++;
        checkIfWin(player);
        if (playCount > 5) {
            console.log('game should be over');
        } else if (gameInProgress == true) {
            setTimeout(computersTurn, 500);
        }
    }
}


function computersTurn() {
    gameInProgress = true;
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
    var tileEmpty = true;
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

    for (var i = 0; i <= 8; i++) {
        if ($('#tile' + tileArray[i]).text() != '') {
            tileEmpty = false;
        } else {
            tileEmpty = true;
        }
    }

    if (tileEmpty == false) {
        gameInProgress = false;
        setTimeout(function() {
            announceDraw()
        }, 1000);
    }



    for (var i = 0; i < optionArray.length; i++) {
        if ($('#tile' + optionArray[i][0]).text() == move && $('#tile' + optionArray[i][1]).text() == move && $('#tile' + optionArray[i][2]).text() == move) {
            result = true;
            gameInProgress = false;
            $('#tile' + optionArray[i][0]).addClass('winner');
            $('#tile' + optionArray[i][1]).addClass('winner');
            $('#tile' + optionArray[i][2]).addClass('winner');
            setTimeout(function() {
                announceWinner(move)
            }, 1000);
        } else if (tileArray.sort() == [1, 2, 3, 4, 5, 6, 7, 8, 9]) {
            gameInProgress = false;
            announceDraw();
        }
    }

}

function announceWinner(arg) {
    gameInProgress = false;
    playCount = 0;
    $('.tile').fadeOut();
    setTimeout(function() {
        $('.winScreen').fadeIn(800);
    }, 500);
    $('.winScreen').text(arg + ' won!');
    setTimeout(function() {
        $('.winScreen').text('Game Restarting');
        $('.winScreen').fadeOut(1000);
    }, 3000)
    setTimeout(function() {
        newGame();
    }, 4000)
}

function announceDraw() {
    gameInProgress = false;
    playCount = 0;
    $('.tile').fadeOut();
    setTimeout(function() {
        $('.winScreen').fadeIn(800);
    }, 500);
    $('.winScreen').text("It's a draw!");
    setTimeout(function() {
        $('.winScreen').text('Game Restarting');
        $('.winScreen').fadeOut(1000);
    }, 3000)
    setTimeout(function() {
        newGame();
    }, 4000)
}

function newGame() {
    player = '';
    tileArray = [];
    playCount = 0;
    result = false;
    $('.tile').removeClass('winner');
    $('.tile').text('');
    $('.tile').fadeOut();
    $('.introScreen').fadeIn(600);

}
