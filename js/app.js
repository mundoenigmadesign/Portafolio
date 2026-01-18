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

// ... (Tu código anterior del efecto Matrix y Tilt queda igual) ...

// LÓGICA DEL FORMULARIO A TELEGRAM
document.getElementById('telegramForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const btn = this.querySelector('button');
    const originalText = btn.innerHTML;
    
    // Feedback visual de "Enviando..."
    btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> PROCESANDO...';
    btn.disabled = true;

    // 1. Capturar datos
    const nombre = document.getElementById('nombre').value;
    const telefono = document.getElementById('telefono').value;
    const tipoWeb = document.getElementById('tipoWeb').value;
    const mensaje = document.getElementById('mensaje').value;

    // 2. Formato del mensaje (Estilo Hacker/Terminal)
    const texto = `
📟 *NUEVA TRANSMISIÓN RECIBIDA*
============================
👤 *AGENTE:* ${nombre}
📱 *CONTACTO:* ${telefono}
⚙️ *OBJETIVO:* ${tipoWeb}
----------------------------
📝 *DATA:* ${mensaje}
============================
End of transmission.
    `;

    // 3. Configuración (¡PONER TUS DATOS REALES AQUÍ!)
    const token = 'TU_TOKEN_DEL_BOT_AQUI'; 
    const chat_id = 'TU_CHAT_ID_AQUI'; 
    
    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${encodeURIComponent(texto)}&parse_mode=Markdown`;

    // 4. Enviar
    fetch(url)
        .then(response => {
            if (response.ok) {
                // Éxito: Resetear form y mostrar mensaje
                document.getElementById('telegramForm').reset();
                alert('✅ DATOS TRANSMITIDOS CON ÉXITO. EL EQUIPO ENIGMA TE CONTACTARÁ.');
            } else {
                alert('❌ ERROR EN LA TRANSMISIÓN. INTENTE VÍA WHATSAPP.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('❌ ERROR DE RED.');
        })
        .finally(() => {
            // Restaurar botón
            btn.innerHTML = originalText;
            btn.disabled = false;
        });
});