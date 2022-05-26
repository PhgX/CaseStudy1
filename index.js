var canvas =  /**@type {HTMLCanvasElement} */ document.querySelector('canvas');
const c = canvas.getContext('2d')

canvas.width = 1024;
canvas.height = 576;

const gravity = 0.8;

const background = new imageInput ({
    position: {
        x: 0,
        y: 0
    },
    scale: {
        x: 0,
        y: 0
    },
    imgSrc: './img/background/background.png'
})

const house = new imageInput ({
    position: {
        x: 750,
        y: 390
    },
    scale: {
        x: 0,
        y: 0
    },
    imgSrc: './img/background/shop_anim.png'
})

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
        x: 0,
        y: 0
    }
})



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
    let timedecrease = setTimeout(timecountdown, 1000)      
    if(time>0){        
        time--
        player.gameStart.play()
        document.querySelector('#time').innerHTML = time;                    
        if(player.health <= 0){            
            clearTimeout(timedecrease)
            document.querySelector('#draw').innerHTML = 'Player 2 win'
            document.querySelector('#draw').style.display = 'flex'                         
        }
        if(enemy.health <= 0){            
            clearTimeout(timedecrease)
            document.querySelector('#draw').innerHTML = 'Player 1 win'
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
    background.update()
    house.update()
    player.update()
    enemy.update()    
    
    //Player speed control & attack direction
    player.speed.x = 0
    if(keys.a.pressed === true && player.lastkey === 'a' && player.moveLeftSide() === true){
        player.speed.x = -5
        player.weaponRect.changeDirection.x = -50
    } else if (keys.d.pressed === true && player.lastkey === 'd' && player.moveRightSide() === true){
        player.speed.x = 5
        player.weaponRect.changeDirection.x = 0
    } else if (keys.w.pressed === true && player.lastkey === 'w' && player.moveUp() === true){
        player.speed.y = -10
    }

    //Enemy speed control & attack direction  
    enemy.speed.x = 0
    if (keys.ArrowLeft.pressed === true && enemy.lastkey === 'ArrowLeft' && enemy.moveLeftSide() === true) {
        enemy.speed.x = -5
        enemy.weaponRect.changeDirection.x = -50
    } else if (keys.ArrowRight.pressed === true && enemy.lastkey === 'ArrowRight' && enemy.moveRightSide() === true) {
        enemy.speed.x = 5
        enemy.weaponRect.changeDirection.x = 0
    }  else if (keys.ArrowUp.pressed === true && enemy.lastkey === 'ArrowUp' && enemy.moveUp() === true) {
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
        enemy.painAudio.play()
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
         player.painAudio.play()
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
            break;
        case 'd':
            keys.d.pressed = true
            player.lastkey = 'd'           
            break
        case 'w':
            keys.w.pressed = true
            player.lastkey = 'w'           
            break;
        case ' ':
            player.attack();
            player.hitAudio.play()
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
            enemy.hitAudio.play();
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
