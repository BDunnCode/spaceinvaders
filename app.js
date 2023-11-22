document.addEventListener('DOMContentLoaded', () => {
  const gridHandle = document.querySelector('.grid') 

  for (let i = 0; i < 225; i++) {
    const square = document.createElement('div')
    gridHandle.appendChild(square)
  }



})