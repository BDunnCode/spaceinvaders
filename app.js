document.addEventListener('DOMContentLoaded', () => {
  const gridHandle = document.querySelector('.grid')
  const resultsDisplay = document.querySelector('#results')
  let currentSquatterIndex = 202
  const width = 15
  let direction = 1
  let returnersId
  let goingRight = true
  let returnersRemoved = []
  let results = 0

  for (let i = 0; i < 225; i++) {
    const square = document.createElement('div')
    gridHandle.appendChild(square)
  }

  const squares = document.querySelectorAll('.grid div')

  const earthReturners = [
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39
  ]

  function draw() {
    for (let i = 0; i < earthReturners.length; i++) {
      if (!returnersRemoved.includes(i)) {
        squares[earthReturners[i]].classList.add('returner')
      }
    }
    if (returnersRemoved.length == earthReturners.length) {
      resultsDisplay.innerHTML = 'YOU WIN'
      clearInterval(returnersId)
    }
  }

draw()

function remove() {
  for (let i = 0; i < earthReturners.length; i++) {
    squares[earthReturners[i]].classList.remove('returner')
  }
}


squares[currentSquatterIndex].classList.add('squatter')

function moveShooter(e) {
  squares[currentSquatterIndex].classList.remove('squatter')
  switch(e.key) {
    case 'a' :
      console.log('a')
      if (currentSquatterIndex % width !== 0) currentSquatterIndex -= 1
      break
    
    case 'd' :
      if (currentSquatterIndex % width < width -1) currentSquatterIndex += 1
      break
  }
  squares[currentSquatterIndex].classList.add('squatter')
}
document.addEventListener('keydown', moveShooter)

function moveInvaders() {
  const leftEdge = earthReturners[0] % width === 0
  const rightEdge = earthReturners[earthReturners.length -1] % width === width -1
  remove()

  if (rightEdge && goingRight) {
    for (let i = 0; i < earthReturners.length; i++) {
      earthReturners[i] += width
      direction = -1
      goingRight = false
    }
  }

  if(leftEdge && !goingRight) {
    for (let i = 0; i < earthReturners.length; i++) {
      earthReturners[i] += width
      direction = 1
      goingRight = true
    }
  }

  for (let i = 0; i < earthReturners.length; i++) {
    earthReturners[i] += direction
  }

    draw()

    if(squares[currentSquatterIndex].classList.contains('returner', 'squatter')) {
      resultsDisplay.innerHTML = 'GAME OVER'
      clearInterval(returnersId)
    }
}

returnersId = setInterval(moveInvaders, 300)

function shoot(e) {
  let laserId 
  let currentLaserIndex = currentSquatterIndex
  function moveLaser() {
    squares[currentLaserIndex].classList.remove('laser')
    currentLaserIndex -= width
    squares[currentLaserIndex].classList.add('laser')

    if(squares[currentLaserIndex].classList.contains('returner')) {
      squares[currentLaserIndex].classList.remove('returner')
      squares[currentLaserIndex].classList.remove('laser')
      squares[currentLaserIndex].classList.add('boom')

      setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 400)
      clearInterval(laserId)

      const returnerRemoved = earthReturners.indexOf(currentLaserIndex)
      returnersRemoved.push(returnerRemoved)
      results++
      resultsDisplay.innerHTML = results
      console.log(returnersRemoved)

    }

  }
  switch(e.key) {
    case ' ' :
      laserId = setInterval(moveLaser, 100)
  }

} 

document.addEventListener('keydown', shoot)

})