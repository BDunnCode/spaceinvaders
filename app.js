document.addEventListener('DOMContentLoaded', () => {
  const gridHandle = document.querySelector('.grid') 
  let currentSquatterIndex = 202;

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
      squares[earthReturners[i]].classList.add('returner')
    }
  }

draw()

squares[currentSquatterIndex].classList.add('squatter')

function moveShooter(e) {
  squares[currentSquatterIndex].classList.remove('squatter')
  switch(e.key) {
    case 'A'
    
    case 'D'

  }
}

})