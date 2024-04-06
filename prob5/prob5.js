const block = document.getElementById('block');
const controlBtn = document.getElementById('control-btn');

let isAnimating = false;

controlBtn.addEventListener('click', function() {
    if (!isAnimating) {
        block.style.transition = 'transform 1s linear';
        block.style.transform = 'translateX(50px)';
        isAnimating = true;
    } else {
        block.style.transition = 'transform 1s linear';
        block.style.transform = 'translateX(0)';
        isAnimating = false;
    }
});
