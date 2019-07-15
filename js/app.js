//creates board
function createBoard(){
    for(let y = 25; y > 0; y--) {
        const row = $("<div class=row>"); 
        // console.log(`created row ${y}`);
        for(let x = 0; x < 25; x++) {
            const square = $("<div class=square>");
            // console.log(`created square ${x}`);
            $(square).attr('x',x);
            $(square).attr('y',y);
            $(row).append(square);
        } 
    $('#game-board').append(row);
    }

}

//Global Variables
let gameOn = false;
let lastArrowPressed = 0;
let seconds = 0;
$('#time').text(seconds);
let currentShipDirection = 0;
let gameSpeed = 120;
snakeArray = [];

//The Snake Object
const ship = {
    x: 19,
    y: 5,
    render() {
        $('.square').removeClass('ship');
        $(`.square[y="${this.y}"][x="${this.x}"]`).addClass('ship'); // the snake head
    },
    updateArray() {
        snakeArray.unshift({x: this.x, y: this.y});
        snakeArray.splice(apples.points, 2);
        snakeArray.forEach((snake)=>{
            $(`.square[y="${snake.y}"][x="${snake.x}"]`).addClass('ship'); // the snake body
        })
    }
}

const apples = {
    points: 1, // the points varaible
    x: 5,
    y: 5,
    renderApples() {
        $(`.square[y="${this.y}"][x="${this.x}"]`).addClass('apples');
    },
    renderMoreApples() {
        this.x = Math.floor(Math.random() * 24) +1;
        this.y = Math.floor(Math.random() * 24) +1;
        $(`.square[y="${this.y}"][x="${this.x}"]`).addClass('apples');

    } 
}
// clear snakeArray when starting
function empty() {
    snakeArray.length = 0;
}

// clear start screen
function beginGame(){
    $(document).keydown(function(e) {
        if(e.which === 38 || e.which === 39 || e.which === 40 || e.which === 37) { 
        $(".start-screen").hide();
        }})}

//Check for walls
function wallCheck() {
    if(ship.x > 24 || ship.x < 0 || ship.y > 25 || ship.y < 1){
        clearInterval(timer);
        console.log("game over");
        $('.game-over').show();
        hideShipApples();
    }
}

//Check for snake collision
function snakeCollisionChecker() {  
    for(let i = 1; i < apples.points; i++) {
        if(ship.x === snakeArray[i].x && ship.y === snakeArray[i].y){
            clearInterval(timer);
            console.log("game over, you ate yourself");
            $('.game-over').show();
            hideShipApples();   
        }
    }
}

// This is all to make sure that when the snake is under 3 squares long,
// it cannot loop over itself! so much code, such a small result....

// makes the variables to test for early game collisions
let lastArrowPressedArray = [];
function earlyGamereverseShipChecker(){
    $(document).keydown(function(e) {
        if(e.which === 38) {    // up arrow
            lastArrowPressed = 38;
            lastArrowPressedArray.unshift(lastArrowPressed);
        } else if (e.which === 40) {    // down arrow
            lastArrowPressed = 40;
            lastArrowPressedArray.unshift(lastArrowPressed);
        } else if (e.which === 37) {    // left arrow
            lastArrowPressed = 37;
            lastArrowPressedArray.unshift(lastArrowPressed);
        } else if (e.which === 39) {    // right arrow
            lastArrowPressed = 39;
            lastArrowPressedArray.unshift(lastArrowPressed);
        }
    })
}

// checks for colliions if snake is under 3 lengths
function earlyGameCollisionDetector(){
    if(lastArrowPressed === 37 && lastArrowPressedArray[1] === 39) {
        clearInterval(timer);
            console.log("game over, you ate yourself");
            $('.game-over').show();
            hideShipApples();   
    } else if (lastArrowPressed === 39 && lastArrowPressedArray[1] === 37) {
        clearInterval(timer);
            console.log("game over, you ate yourself");
            $('.game-over').show();
            hideShipApples();   
    } else if(lastArrowPressed === 38 && lastArrowPressedArray[1] === 40) {
        clearInterval(timer);
            console.log("game over, you ate yourself");
            $('.game-over').show();
            hideShipApples();   
    } else if(lastArrowPressed === 40 && lastArrowPressedArray[1] === 38) {
        clearInterval(timer);
            console.log("game over, you ate yourself");
            $('.game-over').show();
            hideShipApples();       
    }
}

// Detect Arrow Keys - orient the ship 
function orientShip(){
    $(document).keydown(function(e) {
        if(e.which === 38) {    // up arrow
            lastArrowPressed = 38;

        } else if (e.which === 40) {    // down arrow
            lastArrowPressed = 40;

        } else if (e.which === 37) {    // left arrow
            lastArrowPressed = 37;

        } else if (e.which === 39) {    // right arrow
            lastArrowPressed = 39;
        }
    })
} 

// Move the actual ship
function shipMoves() {
        if(lastArrowPressed === 38) {
            ship.y++;
            currentShipDirection = 38;
            gameOn = true;
        } else if(lastArrowPressed === 40) {
            ship.y--;
            currentShipDirection = 40;
            gameOn = true;
        } else if(lastArrowPressed === 37) {
            ship.x--;
            currentShipDirection = 37;
            gameOn = true;
        } else if(lastArrowPressed === 39) {
            ship.x++;
            currentShipDirection = 39;
            gameOn = true;
        }
        ship.render();
}
    
//eat 1st apple -> render more apples
function eatApples(){
    if(ship.x === apples.x && ship.y === apples.y) {
        apples.points++;
        console.log(apples.points)
        $('audio#pop')[0].play();
        $('.square').removeClass('apples');
        console.log("you got one!")
        apples.renderMoreApples();
     }   
}

function hideShipApples () {
    $('.ship').css("background-color", "#40324C");
    empty();
    $('.apples').css("background-color", "#40324C");
}

//THE GAME
empty(); //clears the snake array
createBoard(); 
ship.render();
apples.renderApples();
earlyGamereverseShipChecker();

//THE LOOP
const timer = setInterval(()=>{
    beginGame();    
    orientShip();
    shipMoves();
    ship.updateArray();
    snakeCollisionChecker();
    eatApples();
    wallCheck();
    earlyGameCollisionDetector();
seconds++;
$('#game-clock').text(apples.points -1);
}, gameSpeed);


// Reset Game
$('#resetgame').click(function() {
    location.reload();
     });