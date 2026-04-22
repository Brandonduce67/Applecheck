// 1. Todo envuelto en el window.onload para que espere a la carga de la web
window.onload = function() {
    
    // 2. Definición de variables (Seleccionamos los elementos del HTML)
    const container = document.querySelector('.carousel-container');
    const slides = document.querySelectorAll('.slide');
    let autoPlay;

    if (!container || slides.length === 0) return;

    // 3. La lógica del movimiento automático
    function startAutoPlay() {
        autoPlay = setInterval(() => {
            // Calcula la posición actual del scroll para saber qué imagen sigue
            let currentSlide = Math.round(container.scrollLeft / container.offsetWidth);
            let nextSlide = (currentSlide + 1) % slides.length;
            
            container.scrollTo({
                left: nextSlide * container.offsetWidth,
                behavior: 'smooth'
            });
        }, 5000);
    }

    // 4. Los "Escuchadores de eventos" (Listeners) para el tacto
    container.addEventListener('touchstart', () => {
        clearInterval(autoPlay); // Detiene el auto-play cuando tocás
    }, {passive: true});
    
    container.addEventListener('touchend', () => {
        startAutoPlay(); // Lo reinicia cuando soltás
    }, {passive: true});

    // 5. Arrancamos el auto-play por primera vez
    startAutoPlay();
};