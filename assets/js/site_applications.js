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
});
