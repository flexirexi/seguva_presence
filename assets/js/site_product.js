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
});