window.addEventListener("DOMContentLoaded", () => {
    let canvas = document.getElementById('canvas')
    let ctx = canvas.getContext("2d")
    let moving = false

    

    let raccoon = new Image()
    raccoon.src = "/images/raccoon.png"
    let sx = 0
    let sy = 0
    let swidth = 113
    let sheight = 115
    let x = 50
    let y = 444
    let width = 30
    let height = 30

    document.addEventListener("keydown", moveRaccoon())
    document.addEventListener("keyup", stopMoveRaccoon())

    function moveRaccoon(){
        console.log('howdy')
    }

    function stopMoveRaccoon(){
        console.log('yall')
    }


    function drawBackground(){
        
        //grass
        ctx.fillStyle = 'lime'
        ctx.fillRect(0, 440, 570, 45)
        ctx.fillRect(0, 275, 570, 45)
        //road
        ctx.beginPath()
        ctx.moveTo(0, 380)
        ctx.lineTo (570, 380)
        ctx.strokeStyle = 'yellow'
        ctx.setLineDash([5])
        ctx.strokeWidth = 2
        ctx.stroke();
        //water
        ctx.fillStyle = "blue"
        ctx.fillRect(0, 100, 570, 175)
    }

    function drawRaccoon(){
        ctx.drawImage(raccoon, sx, sy, swidth, sheight, x, y , width, height)
    }

    function draw(){
        drawBackground()
        drawRaccoon()
        requestAnimationFrame(draw)
    }
    draw()

})