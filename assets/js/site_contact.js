emailjs.init({
    publicKey: "NQdO5mpAvyWxAk2sx"
});

const contactForm = document.getElementById("contact-form");
const submitButton = document.getElementById("contact-submit");
const submitSpinner = document.getElementById("contact-spinner");
const contactStatus = document.getElementById("contact-status");

let isSubmitting = false;

contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    if (isSubmitting) return;
    isSubmitting = true;

    submitButton.disabled = true;
    submitSpinner.classList.remove("d-none");
    contactForm.setAttribute("aria-busy", "true");
    contactStatus.textContent = "";
    contactStatus.className = "mt-3";

    const isGerman = document.documentElement.lang === "de";
    const templateId = isGerman
        ? "template_lyo40am"
        : "template_au82zcs";

    try {
        await emailjs.sendForm(
            "service_8aoy2lg",
            templateId,
            contactForm
        );
        contactForm.reset();
        contactStatus.textContent = isGerman
            ? "Nachricht erfolgreich gesendet! Wir melden uns bald."
            : "Message sent successfully! We'll get back to you soon.";

        contactStatus.className = "mt-3 text-success";

    } catch (error) {
        console.error("Email could not be sent:", error);
        contactStatus.textContent = isGerman
            ? "Die Nachricht konnte nicht gesendet werden. Bitte versuche es später erneut."
            : "The message could not be sent. Please try again later.";

        contactStatus.className = "mt-3 text-danger";

    } finally {
        isSubmitting = false;
        submitButton.disabled = false;
        submitSpinner.classList.add("d-none");
        contactForm.removeAttribute("aria-busy");
    }
});