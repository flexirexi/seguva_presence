document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".phase-card").forEach(card => {
        card.addEventListener("click", event => {
            event.preventDefault();

            const radio = document.getElementById(card.htmlFor);
            if (!radio) return;

            radio.checked = true;
            radio.focus({
                preventScroll: true
            });

            radio.dispatchEvent(
                new Event("change", {
                    bubbles: true
                })
            );
        });
    });

    const video = document.getElementById("prodVideoDemo");
    const playButton = document.getElementById("prodVideoPlay");

    playButton.addEventListener("click", () => {
        const source = video.querySelector("source");

        playButton.hidden = true;
        video.play();
    });

    video.addEventListener("play", () => {
        playButton.hidden = true;
    });

    video.addEventListener("pause", () => {
        playButton.hidden = false;
    });

    video.addEventListener("ended", () => {
        playButton.hidden=false;
    });


});