
    const container = document.querySelector('.carousel-container');
    const slides = document.querySelectorAll('.slide');
    let currentIndex = 0;

    function nextSlide() {
        currentIndex++;

        // Si llegamos al final (después de la 4ta imagen), volvemos a la primera
        if (currentIndex >= slides.length) {
            currentIndex = 0;
        }

        const slideWidth = slides[0].clientWidth;
        container.scrollTo({
            left: slideWidth * currentIndex,
            behavior: 'smooth'
        });
    }

    // Cambia la foto cada 5 segundos (5000 milisegundos)
    let autoPlay = setInterval(nextSlide, 5000);

    // Opcional: Detener el auto-play si el usuario toca el carrusel manualmente
    container.addEventListener('mousedown', () => clearInterval(autoPlay));
    container.addEventListener('touchstart', () => clearInterval(autoPlay));

    window.onload = function() {
    const container = document.querySelector('.carousel-container');
    const slides = document.querySelectorAll('.slide');
    let currentIndex = 0;
    let autoPlay;

    if (!container || slides.length === 0) return;

    function startAutoPlay() {
        autoPlay = setInterval(() => {
            currentIndex++;
            if (currentIndex >= slides.length) {
                currentIndex = 0;
            }
            const slideWidth = container.offsetWidth;
            container.scrollTo({
                left: slideWidth * currentIndex,
                behavior: 'smooth'
            });
        }, 5000);
    }

    // Si el usuario toca el carrusel, frenamos el movimiento automático
    container.addEventListener('touchstart', () => {
        clearInterval(autoPlay);
    }, {passive: true});

    // Si deja de tocarlo, podemos hacer que el auto-play vuelva después de un tiempo
    container.addEventListener('touchend', () => {
        // Opcional: reiniciar el auto-play después de 10 segundos de inactividad
        setTimeout(startAutoPlay, 5000);
    }, {passive: true});

    startAutoPlay();
};