function inicializarTienda() {
    // 1. CONFIGURACIÓN DEL CARRUSEL PRINCIPAL (HERO)
    const heroContainer = document.querySelector(".carousel-container");
    const heroSlides = document.querySelectorAll(".slide");
    let heroInterval;

    if (heroContainer && heroSlides.length > 0) {
        
        const moverHero = () => {
            const slideWidth = heroContainer.offsetWidth;
            const current = Math.round(heroContainer.scrollLeft / slideWidth);
            const next = (current + 1) % heroSlides.length;
            const targetLeft = next * slideWidth;

            const rect = heroContainer.getBoundingClientRect();
            const isOffScreen = rect.bottom < 0 || rect.top > window.innerHeight;
            const isTabHidden = document.hidden;

            if (isOffScreen || isTabHidden) {
                heroContainer.style.scrollBehavior = "auto";
                heroContainer.scrollLeft = targetLeft;
                heroContainer.style.scrollBehavior = "smooth";
            } else {
                heroContainer.scrollTo({
                    left: targetLeft,
                    behavior: "smooth"
                });
            }
        };

        const startHeroAutoPlay = () => {
            clearInterval(heroInterval); // Limpia por las dudas
            heroInterval = setInterval(moverHero, 5000);
        };

        // BORRAMOS LOS EVENTLISTENER DE "MOUSEENTER" Y "MOUSELEAVE"
        // Ahora el carrusel no se detiene aunque el mouse esté encima.

        startHeroAutoPlay();
    }

    // 2. CONFIGURACIÓN DE LAS GRILLAS DE PRODUCTOS (DRAG TO SCROLL)
    const productGrids = document.querySelectorAll(".family-grid");

    productGrids.forEach(grid => {
        let isDown = false;
        let startX;
        let scrollLeft;

        grid.addEventListener("mousedown", (e) => {
            isDown = true;
            startX = e.pageX - grid.offsetLeft;
            scrollLeft = grid.scrollLeft;
            grid.style.scrollBehavior = "auto"; 
            grid.style.cursor = "grabbing";
        });

        const stopDragging = () => {
            isDown = false;
            grid.style.scrollBehavior = "smooth"; 
            grid.style.cursor = "grab";
        };

        grid.addEventListener("mouseleave", stopDragging);
        grid.addEventListener("mouseup", stopDragging);

        grid.addEventListener("mousemove", (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - grid.offsetLeft;
            const walk = (x - startX) * 2; 
            grid.scrollLeft = scrollLeft - walk;
        });

        grid.style.cursor = "grab";
    });
}

document.addEventListener("DOMContentLoaded", inicializarTienda);
const moverHero = () => {
    const slideWidth = heroContainer.offsetWidth;
    const current = Math.round(heroContainer.scrollLeft / slideWidth);
    let next = current + 1;

    // Si llegamos al final, volvemos al inicio
    if (next >= heroSlides.length) {
        next = 0;
    }

    const targetLeft = next * slideWidth;

    const rect = heroContainer.getBoundingClientRect();
    const isOffScreen = rect.bottom < 0 || rect.top > window.innerHeight;
    const isTabHidden = document.hidden;

    if (isOffScreen || isTabHidden) {
        heroContainer.style.scrollBehavior = "auto";
        heroContainer.scrollLeft = targetLeft;
        heroContainer.style.scrollBehavior = "smooth";
    } else {
        // Forzamos el scroll suave
        heroContainer.scrollTo({
            left: targetLeft,
            behavior: "smooth"
        });
    }
};