const tetrisManager = new TetrisManager(document);
const tetrisLocal = tetrisManager.createPlayer();
tetrisLocal.element.classList.add('local');
tetrisLocal.run();

const connectionManager = new ConnectionManager(tetrisManager);
connectionManager.connect('ws://' + window.location.hostname + ':9000');

const keyListener = (event) => {
    [
        [65, 68, 81, 69, 83 , 37, 38, 39, 40, 90, 32],
    ].forEach((key, index) => {
        const player = tetrisLocal.player;
        if (event.type === 'keydown') {
            if (event.keyCode === key[0]) {
                player.move(-1);
            }
            if (event.keyCode === key[5]) {
                player.move(-1);
            }
            else if (event.keyCode === key[1]) {
                player.move(1);
            }else if (event.keyCode === key[7]) {
                player.move(1);
            } 
            else if (event.keyCode === key[2]) {
                player.rotate(-1);
            } 
            else if (event.keyCode === key[9]) {
                player.rotate(-1);
            } 
        }

        if (event.keyCode === key[4] || event.keyCode === key[8]) {
            if (event.type === 'keydown') {
                if (player.dropInterval !== player.DROP_FAST) {
                    player.drop();
                    player.dropInterval = player.DROP_FAST;
                }
            } else {
                player.dropInterval = player.DROP_SLOW;
            }
        }
        if (event.keyCode === key[10]) {
            if (event.type === 'keydown') {
                if (player.dropInterval !== player.DROP_INSTANT) {
                    player.drop();
                    player.dropInterval = player.DROP_INSTANT;
                }
            } else {
                player.dropInterval = player.DROP_SLOW;
            }
        }
    });
};

document.addEventListener('keydown', keyListener);
document.addEventListener('keyup', keyListener);