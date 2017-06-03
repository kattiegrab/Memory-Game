
(function () {
	var NUMBER_OF_TILES = 20;
	var TILES_ON_ROW = 5;
	var tiles = [];
	var downloadedTiles = [];
	var numberOfMoves = 0;
	var pairOfTiles = 0;
	var canGo = true;
	var tilesImages = [
		'jpeg/bird.png',
		'jpeg/Blue-Cat.png',
		'jpeg/cat-and-dog.png',
		'jpeg/cute-green-spider.png',
		'jpeg/frog.png',
		'jpeg/mouse.png',
		'jpeg/parrot.png',
		'jpeg/rainbow-flower.png',
		'jpeg/sun.png',
		'jpeg/turtle.png'
	];

function startGame() {
	var gameBoard = $('.gameBoard').empty();

	tiles = [];
	downloadedTiles = [];
	canGo = true;
	numberOfMoves = 0;
	pairOfTiles = 0;

	for (var i=0; i<NUMBER_OF_TILES; i++) {
		tiles.push(Math.floor(i/2));
	}		

	for (i=NUMBER_OF_TILES-1; i>0; i--) {
		var swap = Math.floor(Math.random()*i);
		var tmp = tiles[i];
		tiles[i] = tiles[swap];
		tiles[swap] = tmp;
	}

	for (i=0; i<NUMBER_OF_TILES; i++) {
    	var tile = $('<div class="tile"></div>');
    	gameBoard.append(tile);

	    tile.data('cardType',tiles[i]);
	    tile.data('index', i);

	    tile.css({
	        left : 5+(tile.width()+5)*(i%TILES_ON_ROW)
	    });
	    tile.css({
	        top : 5+(tile.height()+5)*(Math.floor(i/TILES_ON_ROW))
	    });

	    tile.bind('click',function() {clickTile($(this))});
	}
	 $('.moves').html(numberOfMoves);
}

function clickTile(element) {

	if (canGo) {	

		 if (!downloadedTiles[0] || (downloadedTiles[0].data('index') != element.data('index'))) {
	            downloadedTiles.push(element);
	            element.css({'background-image' : 'url('+tilesImages[element.data('cardType')]+')'});    
	        }

	        if (downloadedTiles.length == 2) {
	            canGo = false;
	            if (downloadedTiles[0].data('cardType')==downloadedTiles[1].data('cardType')) {
	                window.setTimeout(function() {
	                    deleteTiles();
	                }, 500);
	            } else {
	                window.setTimeout(function() {
	                    resetTiles();
	                }, 500);
	            }

	            numberOfMoves++;
	            $('.moves').html('Number of moves ' + numberOfMoves);
	        }
		}
	}

function deleteTiles() {
	downloadedTiles[0].fadeOut(function() {
        $(this).remove();
    });
    downloadedTiles[1].fadeOut(function() {
        $(this).remove();

        pairOfTiles++;
        if (pairOfTiles >= NUMBER_OF_TILES / 2) {
            alert('gameOver!');
        }

        canGo = true;
        downloadedTiles = new Array();
    });
}

function resetTiles() {
    downloadedTiles[0].css({'background-image':'url(jpeg/title.png)'})
    downloadedTiles[1].css({'background-image':'url(jpeg/title.png)'})
    downloadedTiles = new Array();
    canGo = true;
}

$(document).ready(function() {

	    $('.startGame').click(function() {
	        startGame();
	    });

	})
})();