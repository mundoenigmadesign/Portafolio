// EFECTO HACKER EN TÍTULO PRINCIPAL
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_@#&";
let interval = null;

document.addEventListener('DOMContentLoaded', () => {
    const target = document.querySelector('.glitch-title');
    // Guardamos el texto original en un data attribute en el HTML o variable
    const originalText = target.dataset.text; 
    let iteration = 0;
    
    clearInterval(interval);
    
    interval = setInterval(() => {
        target.innerText = originalText
            .split("")
            .map((letter, index) => {
                if(index < iteration) {
                    return originalText[index];
                }
                return letters[Math.floor(Math.random() * letters.length)];
            })
            .join("");
        
        if(iteration >= originalText.length){ 
            clearInterval(interval);
        }
        
        iteration += 1 / 3;
    }, 50);
});

// EFECTO TILT 3D (Sin librerías, puro JS Vanilla)
const tiltElements = document.querySelectorAll('[data-tilt]');

tiltElements.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Intensidad del efecto (dividir por números más grandes = menos movimiento)
        const rotateX = ((y - centerY) / centerY) * -4; 
        const rotateY = ((x - centerX) / centerX) * 4; 

        // Aplicamos la transformación usando Tailwind utilities si fuera posible, 
        // pero es más fácil inyectar el estilo directo para valores dinámicos
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        card.style.zIndex = '10';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(1)`;
        card.style.zIndex = '1';
    });
});