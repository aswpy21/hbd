const birthdayMessage = "Happy Birthday! Thank you for always bringing so much energy and joy into my life. Here's to all the inside jokes, chaotic late-night conversations, and making many more unforgettable memories together. Have an incredible day! 🎉";

const speed = 40; 
let index = 0;
let isUnlocked = false;

function typeWriter() {
    if (index < birthdayMessage.length) {
        document.getElementById("birthday-letter").innerHTML += birthdayMessage.charAt(index);
        index++;
        setTimeout(typeWriter, speed);
    }
}

// Background Floaties
function createFloatingElement() {
    const env = document.getElementById("animation-env");
    const symbols = ['🎈', '❤️', '🌸', '🤍'];
    
    const span = document.createElement("span");
    span.classList.add("floating-element");
    span.innerText = symbols[Math.floor(Math.random() * symbols.length)];
    span.style.left = Math.random() * 100 + "vw";
    span.style.fontSize = Math.random() * 1.5 + 12 + "px";
    
    const duration = Math.random() * 3 + 5;
    span.style.animationDuration = duration + "s";
    
    env.appendChild(span);
    setTimeout(() => span.remove(), duration * 1000);
}

/* =======================================================
   ADVANCED CANVAS PARTICLE SYSTEM FOR TOUCH TRAILS
======================================================= */
const canvas = document.getElementById('trail-canvas');
const ctx = canvas.getContext('2d');
let particlesArray = [];

// Color options for the interactive trail glow
const colors = ['rgba(255, 117, 140, ', 'rgba(255, 126, 179, ', 'rgba(150, 230, 161, ', 'rgba(212, 252, 121, '];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 6 + 2; // Particle scale dimensions
        this.speedX = Math.random() * 3 - 1.5; // Horizontal drift momentum
        this.speedY = Math.random() * -2 - 1;   // Floating upward force
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = 1; // Control fading opacity
        this.decay = Math.random() * 0.015 + 0.01; // Fade speed calculation
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= this.decay;
        if (this.size > 0.1) this.size -= 0.05;
    }
    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color + this.alpha + ')';
        // Give particles a soft glowing halo effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color + '1)';
        ctx.fill();
        ctx.restore();
    }
}

function handleParticles() {
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        if (particlesArray[i].alpha <= 0) {
            particlesArray.splice(i, 1);
            i--;
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (isUnlocked) {
        handleParticles();
    }
    requestAnimationFrame(animateParticles);
}
animateParticles();

// Interaction Trackers
function spawnTrailParticles(x, y) {
    if (!isUnlocked) return;
    // Generate multiple particles per move event for dense magic effects
    for (let i = 0; i < 3; i++) {
        particlesArray.push(new Particle(x, y));
    }
}

window.addEventListener('mousemove', (e) => spawnTrailParticles(e.clientX, e.clientY));
window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
        spawnTrailParticles(e.touches[0].clientX, e.touches[0].clientY);
    }
});

// Unlock Site Hook
document.getElementById("open-btn").addEventListener("click", () => {
    isUnlocked = true;
    
    const overlay = document.getElementById("surprise-overlay");
    overlay.style.opacity = "0";
    setTimeout(() => overlay.style.visibility = "hidden", 1200);
    
    document.getElementById("main-content").classList.remove("blurred");
    
    const music = document.getElementById("bg-music");
    music.play().catch(err => console.log("Audio waiting for permission:", err));
    
    setTimeout(typeWriter, 600);
    setInterval(createFloatingElement, 350);

    const birthDate = new Date("2003-07-15T00:00:00"); // Put their actual birthdate & year here

function updateAgeCounter() {
    const now = new Date();
    const differenceInMs = now - birthDate;
    
    // Math conversions
    const years = (differenceInMs / (1000 * 60 * 60 * 24 * 365.25)).toFixed(8);
    
    document.getElementById("age-counter").innerHTML = `You have been awesome for <span class="highlight">${years}</span> years.`;
}
// Trigger it to loop every 50 milliseconds
setInterval(updateAgeCounter, 50);
});
