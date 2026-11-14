document.addEventListener("DOMContentLoaded", () => {
    const showcaseModalElement = document.getElementById('showcaseModal');
    const showcaseCarouselElement = document.getElementById('showcaseCarousel');
    const showcaseModal = bootstrap.Modal.getOrCreateInstance(showcaseModalElement);
    
    const showcaseCarousel = bootstrap.Carousel.getOrCreateInstance(
        showcaseCarouselElement,
        {
            interval: false,
            touch: false,
            wrap: true
        }
    );

    document.querySelectorAll('.showcase-trigger').forEach(button => {
        button.addEventListener('click', () => {
            const caseIndex = Number(button.dataset.caseIndex);
            showcaseCarousel.to(caseIndex);
            showcaseModal.show();
        });
    });
    
    
    
    /* const showcaseModal = document.getElementById('showcaseModal'); */
    const imageLightbox = document.getElementById('imageLightbox');
    const imageLightboxImg = document.getElementById('imageLightboxImg');
    const imageLightboxClose = document.querySelector('.image-lightbox-close');

    showcaseModalElement.addEventListener('click', event => {
        const image = event.target.closest('img');
        if (!image) return;
        imageLightboxImg.src = image.src;
        imageLightboxImg.alt = image.alt;
        imageLightbox.showModal();
    });

    imageLightboxClose.addEventListener('click', () => {
        imageLightbox.close();
    });

    imageLightboxImg.addEventListener('click', () => {
        imageLightbox.close();
    });

    imageLightbox.addEventListener('click', event => {
        if (event.target === imageLightbox) {
            imageLightbox.close();
        }
    });

    document.querySelectorAll(".gallery-wrapper").forEach(wrapper => {
        const scroller = wrapper.querySelector(".showcase-output-scroll");
        const left = wrapper.querySelector(".gallery-arrow-left");
        const right = wrapper.querySelector(".gallery-arrow-right");

        function updateArrows() {
            left.hidden = scroller.scrollLeft <= 1;

            right.hidden =
                scroller.scrollLeft + scroller.clientWidth >=
                scroller.scrollWidth - 1;
        }

        function scrollGallery(direction) {
            const item = scroller.firstElementChild;
            if (!item) return;
            const gap = parseFloat(getComputedStyle(scroller).columnGap) || 0;
            const distance = item.getBoundingClientRect().width + gap;

            scroller.scrollBy({
                left: direction * distance,
                behavior: "smooth"
            });
        }

        left.addEventListener("click", () => scrollGallery(-1));
        right.addEventListener("click", () => scrollGallery(1));
        scroller.addEventListener("scroll", updateArrows, { passive: true });
        new ResizeObserver(updateArrows).observe(scroller);

        updateArrows();
    });
});
