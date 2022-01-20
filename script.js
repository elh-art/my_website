const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

let particlesArray

//Kudos to Franks laboratory's youtube channel where the base of the code came from.
//get mouse position
let mouse = {
  x: null,
  y: null,
  radius: (canvas.height / 100) * (canvas.width / 100),
}

window.addEventListener('mousemove', function (event) {
  mouse.x = event.x
  mouse.y = event.y
})

//create particle
class Particle {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x
    this.y = y
    this.directionX = directionX
    this.directionY = directionY
    this.size = size
    this.color = color
  }
  // method to draw individual particle
  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false)
    ctx.fillStyle = '#a9a9a9'
    ctx.fill()
  }
  //check particle position, check mouse position, move the particle, draw the particle
  update() {
    //check if particle is still within canvas
    if (this.x > canvas.width || this.x < 0) {
      this.directionX = -this.directionX
    }
    if (this.y > canvas.height || this.y < 0) {
      this.directionY = -this.directionY
    }

    //check collision detection / mouse position / particle position
    let dx = mouse.x - this.x
    let dy = mouse.y - this.y
    let distance = Math.sqrt(dx * dx + dy * dy)
    if (distance < mouse.radius + this.size) {
      if (mouse.x < this.x && this.x < canvas.width - this.size * 5) {
        this.x += 20
      }
      if (mouse.x > this.x && this.x > this.size * 5) {
        this.x -= 20
      }
      if (mouse.y < this.y && this.y < canvas.height - this.size * 5) {
        this.y += 20
      }
      if (mouse.y > this.y && this.y > this.size * 5) {
        this.y -= 20
      }
    }
    //move particle
    this.x += this.directionX
    this.y += this.directionY
    //draw particle
    this.draw()
  }
}

//create particle array
function init() {
  particlesArray = []
  let numberOfParticles = (canvas.height * canvas.width) / 40000
  if (numberOfParticles > 200) {
    numberOfParticles = 200
  }
  for (let i = 0; i < numberOfParticles; i++) {
    let size = Math.random() * 10 + 6
    let x = Math.random() * (innerWidth - size * 2 - size * 2 + size * 2)
    let y = Math.random() * (innerHeight - size * 2 - size * 2 + size * 2)
    let directionX = Math.random() * 2 - 1.5
    let directionY = Math.random() * 2 - 1.5
    let color = '#8C5523'

    particlesArray.push(new Particle(x, y, directionX, directionY, size, color))
  }
}

//check if particles are close enough to draw line between them
function connect() {
  let opacityValue = 1
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a; b < particlesArray.length; b++) {
      let distance =
        (particlesArray[a].x - particlesArray[b].x) *
          (particlesArray[a].x - particlesArray[b].x) +
        (particlesArray[a].y - particlesArray[b].y) *
          (particlesArray[a].y - particlesArray[b].y)
      if (distance < (canvas.width / 4) * (canvas.height / 4)) {
        opacityValue = 1 - distance / 30000
        ctx.strokeStyle = 'rgba(226,226,226,' + opacityValue + ')'
        ctx.lineWidth = 8
        ctx.beginPath()
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
        ctx.stroke()
      }
    }
  }
}

//animation loop
function animate() {
  requestAnimationFrame(animate)
  ctx.clearRect(0, 0, innerWidth, innerHeight)

  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update()
  }
  connect()
}

//resize event
window.addEventListener('resize', function () {
  canvas.width = innerWidth
  canvas.height = innerHeight
  mouse.radius = (canvas.height / 100) * (canvas.height / 100)
  init()
})

// mouseout
window.addEventListener('mouseout', function () {
  mouse.x = undefined
  mouse.y = undefined
})

init()
animate()
