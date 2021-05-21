window.addEventListener("DOMContentLoaded", () => {
    

    
    document.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
          startGame()
        }
    });

        


        

    function startGame(){   
        


        let startScreen = document.getElementById('startScreen')
        startScreen.style.display = 'none' 

        

        
        
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

        let canvas4 = document.getElementById('canvas4')
        let ctx4 = canvas4.getContext("2d")
        canvas4.width = 600;
        canvas4.height = 600;

        let youDied = new Image()
        youDied.src = 'images/roadkill.png'


        

        


        //global variables
        let grid = 80;
        let keys = [];
        let score = 0;
        let frame = 0;
        let gameSpeed = 1;
        let streetObstacles = [];
        let trashObstacles = [];
        let hitCar = false
        
        

        //show level
        let showLevel = document.querySelector('span')
        showLevel.innerText = score

        //images
        let background = new Image();
        background.src = 'images/background-img.png'
        let trash = new Image()
        trash.src = 'images/trash.png'
        let bigTrash = new Image()
        bigTrash.src ='images/big-trash.png'
        let car = new Image()
        car.src = 'images/cars.png'
        let raccoonSprite = new Image()
        raccoonSprite.src = 'images/raccoon.png'

        // raccoon class
        class Raccoon {
            constructor(){
                this.spriteHeight = 250
                this.spriteWidth = 250
                this.width = this.spriteWidth/5
                this.height = this.spriteHeight/5
                this.x = canvas1.width/2 - this.width/2
                this.y = canvas1.height - this.height * 1.70
                this.moving = false
                this.frameX = 0
                this.frameY = 0
                this.keys = 0
                this.onTrash = false
        }

            //create raccoon
            draw(){
                
                
                ctx3.drawImage(raccoonSprite, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteHeight, this.spriteWidth, this.x - 25, this.y - 25, this.width * 2, this.height * 2
                    )
            }

            //
            run(){
                console.log('run')
            }
        
        
        }

        

        //class for obstacles
        class Obstacle {
            constructor(x, y, width, height, type, speed){
                this.x = x
                this.y = y
                this.height = height
                this.width = width
                this.type = type
                this.speed = speed
            }
            
            draw(){
                if(this.type === "trash"){
                    ctx2.drawImage(trash, this.x, this.y, this.width, this.height)
                }else if(this.type === 'bigTrash'){
                    ctx2.drawImage(bigTrash, this.x, this.y, this.width, this.height)
                }else if(this.type === 'car'){
                    ctx2.drawImage(car, this.x, this.y, this.width, this.height)
                }
                
                
            
            }

            update(){
                this.x = this.x + this.speed * gameSpeed
                if(this.speed > 0){
                    if(this.x > canvas1.width + this.width){
                        this.x = 0 - this.width
                    } 
                
                } else if(this.x < 0 - this.width){
                        this.x = canvas1.width + this.width
                }
                
            }

        }
        //make obstacles
        function obstacles(){
            //cars
            for (let i = 0; i < 3; i++){
                let x = i * 350;
                streetObstacles.push(new Obstacle(x, canvas1.height - grid * 2 - 20, grid * 2, grid, 'car', 1))
                
            }
            for (let i = 0; i < 2; i++){
                let x = i * 300;
                streetObstacles.push(new Obstacle(x, canvas1.height - grid * 3 - 20, grid * 2, grid, 'car', -2))
                
            }

            //trash
            for (let i = 0; i < 3; i++){
                let x = i * 250;
                trashObstacles.push(new Obstacle(x, canvas1.height - grid * 5 - 20, grid * 1, grid, 'trash', 1))
                
            }
            for (let i = 0; i < 3; i++){
                let x = i * 200;
                trashObstacles.push(new Obstacle(x, canvas1.height - grid * 6 - 20, grid * 2, grid, 'bigTrash', -2))
                
            }
        }

        obstacles()

        function moveObstacles(){
            for (let i = 0; i < streetObstacles.length; i++){
                streetObstacles[i].update()
                streetObstacles[i].draw()
                
            }
            for (let i = 0; i < streetObstacles.length; i++){
                trashObstacles[i].update()
                trashObstacles[i].draw()
                
            }

            

        }

        //variable for raccoon
        let raccoon = new Raccoon()

        
        

            //loop for animation
        function animate(){
            ctx3.clearRect(0,0, canvas1.width, canvas1.height)
            ctx2.clearRect(0,0, canvas1.width, canvas1.height)
            // ctx1.drawImage(background, 0 , 0, canvas1.width, canvas1.height)
            moveObstacles()
            
            raccoon.draw()
            detectFloat()
            detectHit()
            
            
            requestAnimationFrame(animate)
        }

        animate()

        //collision detection
        function detectHit(){
            
            
            
        streetObstacles.forEach(function(obstacle) {
            
                if(raccoon.x < obstacle.x + obstacle.width &&
                    raccoon.x + raccoon.width > obstacle.x &&
                    raccoon.y < obstacle.y + obstacle.height &&
                    raccoon.y + raccoon.height > obstacle.y){
                        

                        console.log('hit')
                        raccoon.x = canvas1.width/2 - raccoon.width/2
                        raccoon.y = canvas1.height - raccoon.height * 1.70
                        
                    }
            
        });


        //test

        // if (raccoon.y < 450 && raccoon.y > 300){
        //     hitCar = false
        //  hitCar = streetObstacles.some(function(obstacle){
                
        //     if(raccoon.x < obstacle.x + obstacle.width &&
        //         raccoon.x + raccoon.width > obstacle.x &&
        //         raccoon.y < obstacle.y + obstacle.height &&
        //         raccoon.y + raccoon.height > obstacle.y){
        //             return true
        //         } else{
        //             return false
        //         }
                
        //     })

        // if(hitCar == true){
        //     // ctx4.drawImage(youDied,0,0)
        //     console.log('hit')
            
            
        // } else if (hitCar == false){
            
        //     console.log('ontrash')
            
                
        // }
                    
                
                    
                    
        //         }   
            



    };

    //float on logs
    function detectFloat(){
        
        
        if (raccoon.y < 250 && raccoon.y > 100){
            
                let onTrash = trashObstacles.some(function(obstacle){
                
                    if(raccoon.x < obstacle.x + obstacle.width &&
                        raccoon.x + raccoon.width > obstacle.x &&
                        raccoon.y < obstacle.y + obstacle.height &&
                        raccoon.y + raccoon.height > obstacle.y){
                            if(obstacle.type == 'trash'){
                                
                                raccoon.x =  obstacle.x + (obstacle.width/2) - (raccoon.width/2)
                                
                                
                                
                            } if(obstacle.type =='bigTrash'){
                                raccoon.x =  obstacle.x + (obstacle.width/2) - (raccoon.width/2)
                            }
                            return true
                        } else{
                            return false
                        }
                        
                    })

                if(onTrash == true){
                    console.log('ontrash')
                } 
                if (onTrash == false){
                    
                    raccoon.x = canvas1.width/2 - raccoon.width/2
                        raccoon.y = canvas1.height - raccoon.height * 1.70
                        // ctx4.drawImage(youDied,0,0)
                        
                }
                            
                            

                            
                            
                        } 
                    }        
                
        
        


        window.addEventListener("keydown", moveRaccoon, false);
    
        function moveRaccoon(e) {
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
                        raccoon.frameX = 1
                        raccoon.frameY = 0
                    }
                }
                    if (raccoon.y < 0){
                        win()
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
                                raccoon.frameX = 1
                                raccoon.frameY = 3
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
                            raccoon.frameX = 1
                            raccoon.frameY = 2
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
                            raccoon.frameX = 1
                            raccoon.frameY = 1
                        }
                    }
                    break;  
            }   
        }  


        //when not pressing key
        window.addEventListener('keyup', function(e){
            
            delete raccoon.keys
            raccoon.frameX = 0
            raccoon.moving = false
            
        })

        //run when leave canvas top
        function win(){
            score ++
            showLevel.innerText = score
            console.log(score)
            gameSpeed += .5
            raccoon.x = canvas1.width/2 - raccoon.width/2
            raccoon.y = canvas1.height - raccoon.height * 1.70
        }


        
        
        
    }
})

