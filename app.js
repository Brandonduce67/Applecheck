function inicializarTienda() {
    // 1. CONFIGURACIÓN DEL CARRUSEL PRINCIPAL (HERO) - Esto ya te funcionaba
    const heroContainer = document.querySelector(".carousel-container");
    const heroSlides = document.querySelectorAll(".slide");
    let heroInterval;

    if (heroContainer && heroSlides.length > 0) {
        const moverHero = () => {
            const slideWidth = heroContainer.offsetWidth;
            const current = Math.round(heroContainer.scrollLeft / slideWidth);
            let next = (current + 1) >= heroSlides.length ? 0 : current + 1;

            const targetLeft = next * slideWidth;
            const rect = heroContainer.getBoundingClientRect();
            const isOffScreen = rect.bottom < 0 || rect.top > window.innerHeight;

            if (isOffScreen || document.hidden) {
                heroContainer.style.scrollBehavior = "auto";
                heroContainer.scrollLeft = targetLeft;
                heroContainer.style.scrollBehavior = "smooth";
            } else {
                heroContainer.scrollTo({ left: targetLeft, behavior: "smooth" });
            }
        };

        const startHeroAutoPlay = () => {
            clearInterval(heroInterval);
            heroInterval = setInterval(moverHero, 5000);
        };
        startHeroAutoPlay();
    }

    // 2. CONFIGURACIÓN DE LAS FLECHAS DEL CATÁLOGO
    // Forzamos que las grillas tengan el comportamiento de scroll correcto
    const productGrids = document.querySelectorAll(".family-grid");
    productGrids.forEach(grid => {
        grid.style.scrollBehavior = "smooth"; 
        grid.style.overflowX = "auto"; 
    });
}

// ESTA FUNCIÓN TIENE QUE ESTAR AFUERA PARA QUE EL "ONCLICK" DEL HTML LA VEA
function scrollGrilla(btn, direction) {
    // Buscamos el contenedor 'carousel-wrapper'
    const wrapper = btn.closest('.carousel-wrapper');
    if (!wrapper) return;

    // Buscamos la grilla adentro
    const grid = wrapper.querySelector('.family-grid');
    
    if (grid) {
        // Calculamos el ancho de una tarjeta dinámicamente para que el salto sea exacto
        const card = grid.querySelector('.family-card');
        const scrollAmount = card ? card.offsetWidth + 20 : 350;

        grid.scrollBy({
            left: direction * scrollAmount,
            behavior: 'smooth'
        });
    }
}

// Iniciar todo
document.addEventListener("DOMContentLoaded", inicializarTienda);