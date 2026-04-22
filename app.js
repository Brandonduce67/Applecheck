
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
