    const showcaseModalElement =
        document.getElementById('showcaseModal');

    const showcaseCarouselElement =
        document.getElementById('showcaseCarousel');


    const showcaseModal =
        bootstrap.Modal.getOrCreateInstance(showcaseModalElement);


    const showcaseCarousel =
        bootstrap.Carousel.getOrCreateInstance(
            showcaseCarouselElement,
            {
                interval: false,
                touch: false,
                wrap: true
            }
        );


    /*
     * Open modal directly at requested showcase.
     */

    document.querySelectorAll('.showcase-trigger').forEach(button => {

        button.addEventListener('click', () => {

            const caseIndex =
                Number(button.dataset.caseIndex);

            showcaseCarousel.to(caseIndex);

            showcaseModal.show();

        });

    });