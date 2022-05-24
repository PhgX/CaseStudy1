var canvas = /** @type {HTMLCanvasElement} */ document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height) /** Thừa có thể xóa */

const gravity = 1;

class Sprite {    
    constructor({position, velocity, color = 'blue'}) {
        this.position = position;
        this.velocity = velocity;
        this.height = 150;
        this.width = 50;
        this.lastkey
        this.attackBox = {
            position: { 
                x: this.position.x,
                y: this.position.y
            },
            offset: {

            },
            width: 120,
            height: 50
        }
        this.color = color;
        this.isAttacking    
    }
    
    draw () {
        c.fillStyle = this.color;
        c.fillRect(this.position.x, this.position.y, this.width, this.height);

        if(this.isAttacking) {
        c.fillStyle = 'red'
        c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);
        }
        
    }

    update() {
        this.draw();
        this.attackBox.position.x = this.position.x - this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y;

        this.position.x += this.velocity.x;     
        this.position.y += this.velocity.y;

        if(this.position.y + this.height + this.velocity.y + gravity >= canvas.height ){
            this.velocity.y = 0;            
            this.velocity.x = 0;
        }
        else {
            this.velocity.y += gravity;
        } 
    }

    attack() {
        this.isAttacking = true;
        setTimeout (() => {
            this.isAttacking = false
        }, 100)
    }

}

const player = new Sprite({
    position: {
    x: 0,
    y: 0
},   
    velocity: {
    x: 0,
    y: 0
    }
})

player.draw()

const enemy = new Sprite({
    position: {
    x: 400,
    y: 150
    }, 
    velocity: {
    x: 0,
    y: 0
    },
    color: 'gray'
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

function animate() {
    window.requestAnimationFrame(animate)    
    c.fillStyle = "black"
    c.fillRect(0,0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    //player key
    player.velocity.x = 0;
    if(keys.d.pressed && player.lastkey === 'd'){
        player.velocity.x = 5;
    } else if (keys.a.pressed && player.lastkey === 'a') {
        player.velocity.x = -5;
    } else if (keys.w.pressed && player.lastkey === 'w') {
        player.velocity.y = -5;
    }

    //enemy key
    enemy.velocity.x = 0;
    if(keys.ArrowRight.pressed && enemy.lastkey === 'ArrowRight'){
        enemy.velocity.x = 5;
    } else if (keys.ArrowLeft.pressed && enemy.lastkey === 'ArrowLeft') {
        enemy.velocity.x = -5;
    } 
    else if (keys.ArrowUp.pressed && enemy.lastkey === 'ArrowUp') {
        enemy.velocity.y = -5;
    }

    //obstacle detection
    if (
        player.attackBox.position.x + player.attackBox.width >= enemy.position.x &&
        player.attackBox.position.x <= enemy.position.x + enemy.width &&
        player.attackBox.y + player.attackBox.height >= enemy.position.y &&
        player.attackBox.y <= enemy.position.y + enemy.height&&
        player.isAttacking
    ) { 
        player.isAttacking = false        
    }
}
animate()

// Hàm kiểm soát event keydown
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd': {
            keys.d.pressed = true;
            player.lastkey = 'd'
            break;
        }
        case 'a': {
            keys.a.pressed = true;
            player.lastkey = 'a'
            break;
        }
        case 'w': {
            keys.w.pressed = true;
            player.lastkey = 'w'
            break;
        }
        case ' ': {
            player.attack()
            break;
        }


        case 'ArrowRight': {
            keys.ArrowRight.pressed = true;
            enemy.lastkey = 'ArrowRight'
            break;
        }
        case 'ArrowLeft': {
            keys.ArrowLeft.pressed = true;
            enemy.lastkey = 'ArrowLeft'
            break;
        }
        case 'ArrowUp': {
            keys.ArrowUp.pressed = true;
            enemy.lastkey = 'ArrowUp'
            break;
        }
    }
})  

//Hàm kiểm soát event keyup
window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd': {
            keys.d.pressed = false;  
            break;
        }
        case 'a': {
            keys.a.pressed = false;
            break;
        }
        case 'w': {
            keys.w.pressed = false;
            break;
        }
        case 'ArrowRight': {
            keys.ArrowRight.pressed = false;  
            break;
        }
        case 'ArrowLeft': {
            keys.ArrowLeft.pressed = false;
            break;
        }
        case 'ArrowUp': {
            keys.ArrowUp.pressed = false;
            break;
        }
    }
})  