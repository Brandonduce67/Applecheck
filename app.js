function inicializarCarrusel() {
    const container = document.querySelector('.carousel-container');
    const slides = document.querySelectorAll('.slide');
    let autoPlay;

    if (!container || slides.length === 0) {
        console.log("Carrusel no encontrado");
        return;
    }

    function startAutoPlay() {
        // Limpiamos cualquier intervalo previo para que no se dupliquen
        clearInterval(autoPlay); 
        autoPlay = setInterval(() => {
            let currentSlide = Math.round(container.scrollLeft / container.offsetWidth);
            let nextSlide = (currentSlide + 1) % slides.length;
            
            container.scrollTo({
                left: nextSlide * container.offsetWidth,
                behavior: 'smooth'
            });
        }, 5000);
    }

    // Eventos para PC (Mouse)
    container.addEventListener('mouseenter', () => clearInterval(autoPlay));
    container.addEventListener('mouseleave', startAutoPlay);

    // Eventos para Celu (Táctil)
    container.addEventListener('touchstart', () => clearInterval(autoPlay), {passive: true});
    container.addEventListener('touchend', startAutoPlay, {passive: true});

    startAutoPlay();
}

// Esto asegura que corra aunque el navegador sea ultra rápido
if (document.readyState === 'complete') {
    inicializarCarrusel();
} else {
    window.addEventListener('load', inicializarCarrusel);
}