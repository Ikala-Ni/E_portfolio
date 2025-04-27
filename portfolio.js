document.addEventListener("DOMContentLoaded", () => {
    // Catégories disponibles
    const categories = ["photo", "video", "carte", "logo", "site"];

    // Éléments communs
    const overlay = document.getElementById("fullscreen-overlay");
    const content = document.getElementById("fullscreen-content");
    const miniMenu = document.getElementById("mini-header-menu");
    const sidebarMenu = document.getElementById("sidebar-menu");
    const burgerBtns = document.querySelectorAll(".burger-toggle");

    // 1) Toggle menus (mobile & desktop)
    burgerBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            miniMenu.classList.toggle("active");
        });
    });

    // 2) Fonction d'affichage d'une catégorie
    function showCategory(cat) {
        categories.forEach(c => {
            const block = document.getElementById(c + "-category");
            if (block) {
                block.classList.toggle("hidden", c !== cat);
            }

            // Gérer sous-liste mobile et desktop
            const listMobile = document.getElementById(`${c}-list-mobile`);
            const listDesk = document.getElementById(`${c}-list-desktop`);
            [listMobile, listDesk].forEach(list => {
                if (list) {
                    list.innerHTML = "";
                    if (c === cat) {
                        document
                            .getElementById(c + "-category")
                            .querySelectorAll(".media-title")
                            .forEach(titleEl => {
                                const li = document.createElement("li");
                                const btn = document.createElement("button");
                                btn.textContent = titleEl.textContent;
                                btn.addEventListener("click", () => {
                                    titleEl.scrollIntoView({ behavior: "smooth", block: "center" });
                                });
                                li.appendChild(btn);
                                list.appendChild(li);
                            });
                    }
                    list.classList.toggle("hidden", c !== cat);
                }
            });
        });

        // Fermer le mini-menu mobile
        miniMenu.classList.remove("active");
    }

    // 3) Attacher la fonction aux boutons data-cat
    document.querySelectorAll("[data-cat]").forEach(btn => {
        btn.addEventListener("click", () => showCategory(btn.dataset.cat));
    });

    // 4) Fullscreen au clic sur une media-thumb
    document.querySelectorAll(".media-thumb").forEach(el => {
        el.addEventListener("click", () => {
            content.innerHTML = "";
            const clone = el.cloneNode(true);
            if (clone.tagName === "VIDEO") {
                clone.controls = true;
            }
            content.appendChild(clone);
            overlay.classList.remove("hidden");
        });
    });

    // 5) Fermer le fullscreen
    document.querySelector(".fullscreen-close").addEventListener("click", () => {
        overlay.classList.add("hidden");
        content.innerHTML = "";
    });

    // 6) Afficher la première catégorie par défaut
    showCategory("photo");
});
