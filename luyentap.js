var canvas = /**@type {HTMLCanvasElement} */ document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect (0,0,canvas.width, canvas.height);
let gravity = 0.7

class Dojo {
    constructor({position, velocity, color, turnface}) {
        this.position = position;
        this.velocity = velocity;
        this.width = 50;
        this.height = 150;
        
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            turnface: turnface,
            width: 100,
            height: 50
        }
        this.color = color;
        this.isAttacking;
    }

    attack() {
        this.isAttacking = true;
        setTimeout (() => {
            this.isAttacking = false;
        }, 100)
        
    }

    draw() {        
        c.fillStyle = this.color;
        c.fillRect(this.position.x, this.position.y, this.width, this.height); 
        
        if(this.isAttacking){
            c.fillStyle = 'blue'
            c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);
        }        
    }

    update() {
        this.draw()
        this.attackBox.position.x = this.position.x + this.attackBox.turnface.x;
        this.attackBox.position.y = this.position.y;
        
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;

        if(this.position.y + this.height + this.velocity.y + gravity >= canvas.height){
            this.velocity.y = 0;
        }
        else {
            this.velocity.y += gravity;
        } 
    }
}

let player = new Dojo({
    position: {
    x: 0,
    y: 0  
    },
    velocity: {
    x: 0,
    y: 0
    },
    color: 'red',   /**Thêm vào để phân biệt player và enemy */
    turnface: {
    x: 0,
    y: 0
    }
}) 
player.draw()

let enemy = new Dojo({
    position: {
    x: 300,
    y: 0  
    },
    velocity: {
    x: 0,
    y: 0
    },
    color: 'green',   /**Thêm vào để phân biệt player và enemy */
    turnface: {       /**Quay mặt enemy về phía player */
    x: -50,
    y: 0
    }
}) 
enemy.draw()

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }
}

//Điều kiện va chạm giữa vũ khí và nhân vật
function dieukienvacham({rect1, rect2}) {
    return(rect1.attackBox.position.x + rect1.attackBox.width >= rect2.position.x &&
           rect1.attackBox.position.x <= rect2.position.x + rect2.width &&
           rect1.attackBox.position.y + rect1.attackBox.height >= rect2.position.y &&
           rect1.attackBox.position.y <= rect2.position.y + rect2.height)
        }

function animate(){
    window.requestAnimationFrame(animate);
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()
                            // console.log('kiem tra vong lap')

    //kiem soat di chuyen player
    player.velocity.x = 0
    if(keys.a.pressed && player.lastkey === 'a'){
        player.velocity.x = -5
    } else if (keys.d.pressed && player.lastkey === 'd') {
        player.velocity.x = 5
    } else if (keys.w.pressed && player.lastkey === 'w') {
        player.velocity.y = -10
    } 

    //kiem soat di chuyen enemy
    enemy.velocity.x = 0
    if (keys.ArrowLeft.pressed && enemy.lastkey === 'ArrowLeft') {
        enemy.velocity.x = -5
    } else if (keys.ArrowRight.pressed && enemy.lastkey === 'ArrowRight') {
        enemy.velocity.x = 5
    }  else if (keys.ArrowUp.pressed && enemy.lastkey === 'ArrowUp') {
        enemy.velocity.y = -10
    } 

    //Hàm player attack enemy
    if(
        dieukienvacham({
        rect1: player,
        rect2: enemy}) 
        && player.isAttacking
    ){
        player.isAttacking = false
        document.querySelector('#PlayerHealth').style.width = 20%   
                        console.log('player danh enemy')
    }

    //Hàm enemy attack player
    if(
        dieukienvacham({
        rect1: enemy,
        rect2: player}) 
        && enemy.isAttacking
    ){
        enemy.isAttacking = false   
        document.querySelector('#EnemyHealth').style.width = 20%   
                            console.log('enemy danh player')
    }
}
animate();

//Nhấn nút
window.addEventListener('keydown', (event) => {
    switch(event.key) {
        case 'a':
            keys.a.pressed = true;
            player.lastkey = 'a'            
            break;
        case 'd':
            keys.d.pressed = true;
            player.lastkey = 'd'
            break;
        case 'w':
            keys.w.pressed = true;
            player.lastkey = 'w'
            break;
        case ' ':
            // player.isAttacking = true;
            player.attack();
            break;        

        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            enemy.lastkey = 'ArrowLeft'
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            enemy.lastkey = 'ArrowRight'
            break;
        case 'ArrowUp':
            keys.ArrowUp.pressed = true;
            enemy.lastkey = 'ArrowUp'
            break;
        case 'ArrowDown':
            // enemy.isAttacking = true;
            enemy.attack()
            break;
    }
                            console.log(event.key)
} )

//Thả nút
window.addEventListener('keyup', (event) => {
    switch(event.key) {
        case 'a':
            keys.a.pressed = false;
            player.lastkey = 'a'
            break;
        case 'd':
            keys.d.pressed = false;
            player.lastkey = 'd'
            break;
        case 'w':
            keys.w.pressed = false;
            player.lastkey = 'w'
            break;
        

        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            enemy.lastkey = 'ArrowLeft'
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            enemy.lastkey = 'ArrowRight'
            break;
        case 'ArrowUp':
            keys.ArrowUp.pressed = false;
            enemy.lastkey = 'ArrowUp'
            break;        
    }
                            console.log(event.key)
} )