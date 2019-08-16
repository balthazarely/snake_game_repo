const evilSnake = {
    x: 19,
    y: 5,
    render() {
        $('.square').removeClass('ship');
        $(`.square[y="${this.y}"][x="${this.x}"]`).addClass('evilSnake'); // the snake head
    },
    // updateArray() {
    //     snakeArray.unshift({x: this.x, y: this.y});
    //     snakeArray.splice(apples.points, 2);
    //     snakeArray.forEach((snake)=>{
    //         $(`.square[y="${snake.y}"][x="${snake.x}"]`).addClass('ship'); // the snake body
    //     })
    // }
}