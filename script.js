const container = document.getElementById('container');
const sizeValue = document.getElementById('sizeValue')
const sizeSlider = document.getElementById('sizeSlider');
const clearButton = document.getElementById('clearButton');

let selectedColor = 'black'; // Default color

let mouseDown = false;
document.body.addEventListener('mousedown', () => {
    mouseDown = true;
});
document.body.addEventListener('mouseup', () => {
    mouseDown = false;
});

clearButton.addEventListener('click', () => {
    container.innerHTML = '';
    createGrid(sizeSlider.value);
});

sizeSlider.onmousemove = (e) => updateSize(e.target.value)
sizeSlider.onchange = (e) => createGrid(e.target.value)

document.querySelectorAll('button').forEach(button => {
    if (button.id === 'clearButton') {
        console.log('clearButton');
        return;
    }
    button.addEventListener('click', () => {
      document.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      if (button.id === 'eraseButton') {
        selectedColor = 'whitesmoke';
      }
      if (button.classList.contains('colorBtn')) {
        selectedColor = button.style.backgroundColor;
      }
    });
});
  
function updateSize(value) {
    sizeValue.innerHTML = `${value} x ${value}`
}
  
function createGrid(size) {
    container.innerHTML = '';
    const squareSize = 640 / size;
    for (let i = 0; i < size * size; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;
    
        square.addEventListener('mouseover', () => {
            if (mouseDown) {
            square.style.backgroundColor = selectedColor;
            }
        });
        square.addEventListener('mousedown', () => {
            square.style.backgroundColor = selectedColor;
        });
    
        container.appendChild(square);
    }
}

window.onload = () => {
    createGrid(32);
    selectedColor = 'black';
    const firstBtn = document.querySelector('.colorBtn');
    if (firstBtn) {
        document.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
        firstBtn.classList.add('active');
    }
}