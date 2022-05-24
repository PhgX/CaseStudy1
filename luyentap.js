var canvas = /**@type {HTMLCanvasElement} */ document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect (0,0,canvas.width, canvas.height);
let gravity = 0.7

class Dojo {
    constructor({position, velocity, color}) {
        this.position = position;
        this.velocity = velocity;
        this.width = 50;
        this.height = 150;
        this.velocity = velocity;
        this.attackBox = {
            position: this.position,
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
        
        c.fillStyle = 'blue'
        c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);
    }

    update() {
        this.draw()
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;

        if(this.position.y + this.height + this.velocity.y + gravity >= canvas.height){
            this.velocity.y = 0;
        }
        else {
            this.velocity.y += gravity;
        }    
        
        if(player.attackBox.position.x + player.attackBox.width >= enemy.position.x&&
           player.attackBox.position.x <= enemy.position.x + enemy.width &&
           player.attackBox.position.y + player.attackBox.height >= enemy.position.y&&
           player.attackBox.position.y <= enemy.position.y + enemy.height&&
           player.isAttacking)
           {
            this.isAttacking = false   
            console.log('va cham')
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
    color: 'red'   /**Thêm vào để phân biệt player và enemy */
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
    color: 'green'   /**Thêm vào để phân biệt player và enemy */
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

function animate(){
    window.requestAnimationFrame(animate);
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()
    // console.log('a')

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
            enemy.attack();
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
        case ' ':
            player.attack();
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