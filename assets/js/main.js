const body = document.body;
const image = body.querySelector('#coin'); // Changed from 'coint' to 'coin'
const h1 = body.querySelector('h1');

let coins = localStorage.getItem('coins');
let total = localStorage.getItem('total') || 500; // Default total to 500
let power = localStorage.getItem('power') || 500; // Default power to 500
let count = localStorage.getItem('count') || 1; // Default count to 1

// Initial setup
localStorage.setItem('coins', coins || '0');
h1.textContent = Number(coins).toLocaleString();

body.querySelector('#total').textContent = `/${total}`;
body.querySelector('#power').textContent = power;

// Click event for the coin image
image.addEventListener('click', (e) => {
    let x = e.offsetX;
    let y = e.offsetY;

    navigator.vibrate(5); // Check if this works in your environment

    coins = localStorage.getItem('coins');
    power = localStorage.getItem('power');
    
    if (Number(power) > 0) {
        // Update coins and power
        localStorage.setItem('coins', `${Number(coins) + 1}`);
        h1.textContent = `${(Number(coins) + 1).toLocaleString()}`;
    
        localStorage.setItem('power', `${Number(power) - 1}`);
        body.querySelector('#power').textContent = `${Number(power) - 1}`;
    } 

    // Image transformation based on click position
    if (x < 150 && y < 150) {
        image.style.transform = 'translate(-0.25rem, -0.25rem) skewY(-10deg) skewX(5deg)';
    } else if (x < 150 && y > 150) {
        image.style.transform = 'translate(-0.25rem, 0.25rem) skewY(-10deg) skewX(5deg)';
    } else if (x > 150 && y > 150) {
        image.style.transform = 'translate(0.25rem, 0.25rem) skewY(10deg) skewX(-5deg)';
    } else if (x > 150 && y < 150) {
        image.style.transform = 'translate(0.25rem, -0.25rem) skewY(10deg) skewX(-5deg)';
    }

    // Reset transformation after a brief period
    setTimeout(() => {
        image.style.transform = 'translate(0px, 0px)';
    }, 100);

    // Update the progress bar
    body.querySelector('.progress').style.width = `${(100 * power) / total}%`;
});

// Interval for automatic power increase
setInterval(() => {
    power = localStorage.getItem('power');
    if (Number(total) > Number(power)) {
        localStorage.setItem('power', `${Number(power) + Number(count)}`);
        body.querySelector('#power').textContent = `${Number(power) + Number(count)}`;
        body.querySelector('.progress').style.width = `${(100 * (Number(power) + Number(count))) / total}%`;
    }
}, 1000);
