class Game {
    constructor() {
        this.time = 0;
        this.player = null; // will store an instance of the class Player
        this.obstacleArr = []; // will store instances of the class Obstacle
    }

    start() {
        this.player = new Player();
        this.addEventListeners();

        // create moving obstacles
        setInterval(() => {

            // move all obstacles
            this.obstacleArr.forEach((obstacleInstance) => {
                obstacleInstance.moveDown();
            });

            // create new obstacle
            if(this.time % 60 === 0){
                const newObstacle = new Obstacle();
                this.obstacleArr.push(newObstacle);
            }    

            //detect collision
            this.obstacleArr.forEach(obstacleInstance => {
                
                if(this.player.positionX < obstacleInstance.positionX + obstacleInstance.width &&
                    this.player.positionX + this.player.width > obstacleInstance.positionX &&
                    this.player.positionY < obstacleInstance.positionY + obstacleInstance.height &&
                    this.player.height + this.player.positionY > obstacleInstance.positionY) {
                        //collision detected !!
                        console.log("collision detected !!");
                    }
            });

            this.time++;

        }, 50);
    }

    addEventListeners() {
        document.addEventListener('keydown', (event) => {
            if (event.key === "ArrowLeft") {
                this.player.moveLeft();
            } else if (event.key === "ArrowRight") {
                this.player.moveRight();
            }
        })
    }
}


class Player {
    constructor() {
        this.positionX = 50;
        this.positionY = 0;
        this.height = 20;
        this.width = 10;
        this.domElement = this.createDomElement();
        
    }

    createDomElement() { 
        // create dom element
        const newElement = document.createElement('div');

        //set it and css
        newElement.id = "player";
        newElement.style.left = this.positionX + "vw";
        newElement.style.bottom = this.positionY + "vh";
        newElement.style.width = this.width + "vw";
        newElement.style.height = this.height + "vh";

        // append to the dom
        const boardElm = document.getElementById("board");
        boardElm.appendChild(newElement);

        return newElement;
    }

    moveLeft() {
        this.positionX--;
        this.domElement.style.left = this.positionX + "vw";
    }

    moveRight() {
        this.positionX++;
        this.domElement.style.left = this.positionX + "vw";
    }
}


class Obstacle {
    constructor() {
        this.positionX = Number(Math.random().toFixed(2)) * 100;
        this.positionY = 100;
        this.width = 10;
        this.height = 10;

        this.domElement = this.createDomElement();
    }

    createDomElement(){
        // create dom element
        const newElement = document.createElement('div');

        // set id and css 
        newElement.className = "obstacle";
        newElement.style.left = this.positionX + "vw";
        newElement.style.bottom = this.positionY + "vh";
        newElement.style.width = this.width + "vw";
        newElement.style.height = this.height + "vh";

        // append to the dom
        const boardElm = document.getElementById("board"); //
        boardElm.appendChild(newElement);

        return newElement;
    }

    moveDown() {
        this.positionY--;
        this.domElement.style.bottom = this.positionY + "vh";
    }
}

const game = new Game();
game.start();