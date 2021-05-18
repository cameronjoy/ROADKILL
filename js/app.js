window.addEventListener("DOMContentLoaded", () => {
    let canvas1 = document.getElementById('canvas1')
    let ctx1 = canvas1.getContext("2d")
    canvas1.width = 600;
    canvas1.height = 600;

    

    let canvas2 = document.getElementById('canvas2')
    let ctx2 = canvas2.getContext("2d")
    canvas2.width = 600;
    canvas2.height = 600;

    let canvas3 = document.getElementById('canvas3')
    let ctx3 = canvas3.getContext("2d")
    canvas3.width = 600;
    canvas3.height = 600;
    
    let grid = 80;
    let keys = [];
    let score = 0;
    let collisions = 0;
    let frame = 0;
    let gameSpeed = 0;

    class Raccoon {
        constructor(){
            this.spriteHeight = 250
            this.spriteWidth = 250
            this.width = this.spriteWidth/5
            this.height = this.spriteHeight/5
            this.x = canvas1.width/2 - this.width/2
            this.y = canvas1.height - this.height
            this.moving = false
            this.frameX = 0
            this.frameY = 0
            this.keys = 0
    }

        update(){
            
            //s
            
            //a
            
            //d
            
            
        }

        draw(){
            ctx3.fillStyle = 'green'
            ctx3.fillRect(this.x, this.y, this.width, this.height)
        }

        run(){
            console.log('run')
        }
    
    
    }

    let raccoon = new Raccoon()

    function animate(){
        ctx3.clearRect(0,0, canvas1.width, canvas1.height)
        raccoon.draw()
        
        requestAnimationFrame(animate)
    }

    animate()

    window.addEventListener("keydown", moveSomething, false);
  
    function moveSomething(e) {
        switch(e.keyCode) {
            //w
            case 87:
                raccoon.keys = 87
                console.log(raccoon.keys)
                
                //w
                if (raccoon.keys = 87){
                if(raccoon.moving === false){
                    raccoon.y -= grid;
                    raccoon.moving = true
                }
            }
                break;
            //s
            case 83:
                raccoon.keys  = 83
                console.log(raccoon.keys)
                
                if (raccoon.keys = 83){
                    if(raccoon.moving === false && raccoon.y < canvas1.height - raccoon.height * 2){
                        if(raccoon.y < canvas1.height - raccoon.height * 2 && raccoon.moving === false){
                            raccoon.y += grid
                            raccoon.moving = true
                        }
                    }
                }
                break;
            //a
            case 65:
                raccoon.keys = 65
                console.log(raccoon.keys)
                
                if(raccoon.keys = 65){
                    if(raccoon.moving === false && raccoon.x > raccoon.width ){
                        raccoon.x -= grid
                        raccoon.moving = true
                    }
    
                }
                break;

            //d
            case 68:
                raccoon.keys = 68
                console.log(raccoon.keys)
                if(raccoon.keys = 68){
                    if(raccoon.moving === false && raccoon.x < canvas1.width - raccoon.width * 2){
                        raccoon.x += grid
                        this.moving = true
                    }
                }
                break;  
        }   
    }  

    window.addEventListener('keyup', function(e){
        delete raccoon.keys[0]
        raccoon.moving = false
    })

})

