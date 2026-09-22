document.addEventListener("DOMContentLoaded", () => {
    const langToggle = document.getElementById("language-toggle");
    const langMenu = document.getElementById("language-menu");

    let currentLang = localStorage.getItem("lang") || "en";

    document.documentElement.lang = currentLang;
    langToggle.textContent = currentLang.toUpperCase();

    async function loadLanguage(lang) {
        document.documentElement.lang = lang;

        try {
            const response = await fetch(`locales/${lang}.json?nocache=${new Date().getTime()}`);

            if (!response.ok) {
                throw new Error(`Fehler beim Laden der Sprachdatei: ${lang}`);
            }

            const texts = await response.json();

            document.querySelectorAll("[data-lang]").forEach(el => {
                const key = el.dataset.lang;
                if (texts[key]) {
                    el.innerHTML = texts[key];
                }
            });

            localStorage.setItem("lang", lang);
            console.log(`Language successfully loaded: ${lang}`);

        } catch (error) {
            console.error("Fehler beim Laden oder Parsen der JSON:", error);
        }
    }

    async function fillDropdownBox() {
        try {
            const response = await fetch(
                `locales/languages.json?nocache=${new Date().getTime()}`
            );

            if (!response.ok) {
                throw new Error("Language list could not be loaded.");
            }

            const languages = await response.json();

            const languageData = await Promise.all(
                languages.map(async lang => {
                    const response = await fetch(
                        `locales/${lang}.json?nocache=${new Date().getTime()}`
                    );

                    if (!response.ok) {
                        throw new Error(`Language file could not be loaded: ${lang}`);
                    }

                    const data = await response.json();

                    if (!data.languageCode) {
                        throw new Error(
                            `languageCode fehlt in locales/${lang}.json`
                        );
                    }

                    return {
                        code: lang,
                        name: data.languageCode
                    };
                })
            );

            langMenu.replaceChildren();

            languageData.forEach(language => {
                const li = document.createElement("li");

                const button = document.createElement("button");

                button.classList.add("dropdown-item");
                button.type = "button";
                button.dataset.language = language.code;
                button.textContent = language.name;

                li.append(button);
                langMenu.append(li);

                if (language.code === currentLang) {
                    langToggle.textContent = language.name;
                }
            });

        } catch (error) {
            console.error("Failed to create the language list and fill the dropdown list:", error);
        }
    }

    langMenu.addEventListener("click", event => {
        const option = event.target.closest("[data-language]");
        if (!option) return;

        currentLang = option.dataset.language;

        langToggle.textContent = option.textContent;
        loadLanguage(currentLang);
    });


    loadLanguage(currentLang);
    fillDropdownBox();
});