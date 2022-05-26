class imageInput {
    constructor({position, imgSrc, scale}) {
        this.position = position
        this.width = 50
        this.height = 150  
        this.image = new Image()
        this.image.src = imgSrc 
        this.scale = scale
    } 

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y, this.image.width*scale, this.image.height*scale);       
    } 

    update() {
        this.draw();
    }
}

class Dojo {
    constructor({position, speed, changeDirection = 1}) {
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
        this.hitAudio = new Audio('./audio/hitting.mp3') 
        this.painAudio = new Audio('./audio/painsound.wav') 
        this.gameStart = new Audio('./audio/Opening Game.mp3')       
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

    update() {
        this.draw()
        this.weaponRect.position.x = this.position.x + this.weaponRect.changeDirection.x;
        this.weaponRect.position.y = this.position.y;
        
        this.position.y += this.speed.y;
        this.position.x += this.speed.x;

        if(this.position.y + this.height + this.speed.y + gravity >= canvas.height - 96){
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