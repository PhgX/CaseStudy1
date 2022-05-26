var canvas =  /**@type {HTMLCanvasElement} */ document.querySelector('canvas');
const c = canvas.getContext('2d')

canvas.width = 1024;
canvas.height = 576;

const gravity = 0.8;

class Dojo {
    constructor({position, speed, changeDirection}) {
        this.position = position
        this.speed = speed
        this.width = 50
        this.height = 150  
        this.lastkey      
        this.weaponRect = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            changeDirection,
            width: 100,
            height: 50            
        }
        this.isAttack  
        this.health = 100    
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

        if(this.isAttack) {
            c.fillStyle = 'blue'
            c.fillRect(this.weaponRect.position.x, this.weaponRect.position.y, this.weaponRect.width, this.weaponRect.height)
        }        
    }

    moveLeftSide() {
        if(this.position.x < 0){
            return false;
        } else {
            return true;
        }
    }
    
    moveRightSide() {
        if(this.position.x + this.width > canvas.width){
            return false;
        } else {
            return true;
        }
    }  

    moveUp() {
        if(this.position.y < 0){
            return false;
        } else {
            return true;      
        }   
    }
// if((this.position.x > 0 && this.position.x + this.width <= canvas.width)        
//     || this.position.y + this.position.height >= 0) {
//         return true;
//     } else {
//         return false;
//     }    
      
    update() {
        this.draw()
        this.weaponRect.position.x = this.position.x + this.weaponRect.changeDirection.x;
        this.weaponRect.position.y = this.position.y;
        
        this.position.y += this.speed.y;
        this.position.x += this.speed.x;

        if(this.position.y + this.height + this.speed.y + gravity >= canvas.height){
            this.speed.y = 0;
        }
        else {
            this.speed.y += gravity;
        } 
    }
    
    attack() {
        this.isAttack = true;
        setTimeout (() => {
            this.isAttack = false;
        }, 100)
    }
}

const player = new Dojo ({
    position: {
        x: 0,
        y: 0
    },
    speed: {
        x: 0,
        y: 0
    },
    changeDirection: {
        x: 0,
        y: 0
    }
})
player.draw()


const enemy = new Dojo ({
    position: {
        x: 400,
        y: 0
    },
    speed: {
        x: 0,
        y: 0
    },
    changeDirection: {
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

let time = 20 //set time
function timecountdown() {       
    if(time>0){
        let timedecrease = setTimeout(timecountdown, 1000)
        time--
        document.querySelector('#time').innerHTML = time;         
        if(player.health <= 0){            
            clearTimeout(timedecrease)
            document.querySelector('#draw').innerHTML = 'Người chơi 2 win'
            document.querySelector('#draw').style.display = 'flex'           
        }
        if(enemy.health <= 0){            
            clearTimeout(timedecrease)
            document.querySelector('#draw').innerHTML = 'Người chơi 1 win'
            document.querySelector('#draw').style.display = 'flex'
    }    
}
    
    if(time === 0) {
        document.querySelector('#draw').style.display = 'flex'
        if(player.health > enemy.health){
            document.querySelector('#draw').innerHTML = 'Người chơi 1 win'        
        } else if (enemy.health > player.health) {
            document.querySelector('#draw').innerHTML = 'Người chơi 2 win'
        } else {
            document.querySelector('#draw').innerHTML = 'Hòa'
        }
    }
    
}
timecountdown();

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()    
    
    //Player speed control
    player.speed.x = 0
    if(keys.a.pressed && player.lastkey === 'a' && player.moveLeftSide() === true){
        player.speed.x = -5
    } else if (keys.d.pressed && player.lastkey === 'd' && player.moveRightSide() === true){
        player.speed.x = 5
    } else if (keys.w.pressed && player.lastkey === 'w' && player.moveUp() === true){
        player.speed.y = -10
    }

    //Enemy speed control   
    enemy.speed.x = 0
    if (keys.ArrowLeft.pressed && enemy.lastkey === 'ArrowLeft' && enemy.moveLeftSide() === true) {
        enemy.speed.x = -5
    } else if (keys.ArrowRight.pressed && enemy.lastkey === 'ArrowRight' && enemy.moveRightSide() === true) {
        enemy.speed.x = 5
    }  else if (keys.ArrowUp.pressed && enemy.lastkey === 'ArrowUp' && enemy.moveUp() === true) {
        enemy.speed.y = -10
    } 

    //Check collision for player
    if(player.weaponRect.position.x + player.weaponRect.width >= enemy.position.x&&
       player.weaponRect.position.x <= enemy.position.x + enemy.width&&
       player.weaponRect.position.y + player.weaponRect.height >= enemy.position.y&&
       player.weaponRect.position.y <= enemy.position.y + enemy.height&&
       player.isAttack)
    {
        player.isAttack = false
        enemy.health -= 20
        document.querySelector('#enemyhealth').style.width = enemy.health + '%'
        // console.log('player')
    }

    //Check collision for enemy
    if(enemy.weaponRect.position.x + enemy.weaponRect.width >= player.position.x&&
        enemy.weaponRect.position.x <= player.position.x + player.width&&
        enemy.weaponRect.position.y + player.weaponRect.height >= enemy.position.y&&
        enemy.weaponRect.position.y <= player.position.y + player.height&&
        enemy.isAttack)
     {
         enemy.isAttack = false
         player.health -= 20
         document.querySelector("#playerhealth").style.width = player.health + '%'
        //  console.log('va cham1')
     }
}
animate()

window.addEventListener('keydown', (event) => {
    switch(event.key){
        case 'a': 
            keys.a.pressed = true
            player.lastkey = 'a'
            stopPlayerMovement()
            break;
        case 'd':
            keys.d.pressed = true
            player.lastkey = 'd'
            stopPlayerMovement()
            break
        case 'w':
            keys.w.pressed = true
            player.lastkey = 'w'
            stopPlayerMovement()
            break;
        case ' ':
            player.attack();
            break;

        case 'ArrowRight': 
            keys.ArrowRight.pressed = true
            enemy.lastkey = 'ArrowRight'

            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastkey = 'ArrowLeft'
            break
        case 'ArrowUp':
            keys.ArrowUp.pressed = true
            enemy.lastkey = 'ArrowUp'
            break;
        case 'ArrowDown':
            enemy.attack();
            break;        
    }
    // console.log(event.key)
})

window.addEventListener('keyup', (event) => {
    switch(event.key){
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
    // console.log(`check event enemy ${event.key}`)
})
