document.addEventListener("DOMContentLoaded", () => {
<<<<<<< HEAD
    // catégories
    const categories = ["photo", "video", "carte", "logo", "site"];

    // éléments communs
    const overlay = document.getElementById("fullscreen-overlay");
    const content = document.getElementById("fullscreen-content");
    const miniMenu = document.getElementById("mini-header-menu");
    const sidebarMenu = document.getElementById("sidebar-menu");
    const burgerBtns = document.querySelectorAll(".burger-toggle");

    // 1) toggle menus (mobile & desktop burger icon just shows mobile menu)
    burgerBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            miniMenu.classList.toggle("active");
        });
    });

    // 2) fonction d'affichage d'une catégorie
    function showCategory(cat) {
        categories.forEach(c => {
            const block = document.getElementById(c + "-category");
            block.classList.toggle("hidden", c !== cat);
            // remplir sous-liste mobile
            const listMobile = document.getElementById(`${c}-list-mobile`);
            const listDesk = document.getElementById(`${c}-list-desktop`);
            [listMobile, listDesk].forEach(list => {
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
            });
        });
        // fermer le mini-menu mobile
        miniMenu.classList.remove("active");
    }

    // 3) attacher aux boutons data-cat
    document.querySelectorAll("[data-cat]").forEach(btn => {
        btn.addEventListener("click", () => showCategory(btn.dataset.cat));
    });

    // 4) fullscreen au clic sur media-thumb
=======
    const submenu = document.getElementById("submenu");
    const photoCat = document.getElementById("photo-category");
    const videoCat = document.getElementById("video-category");
    const photoList = document.getElementById("photo-list");
    const videoList = document.getElementById("video-list");
    const overlay = document.getElementById("fullscreen-overlay");
    const content = document.getElementById("fullscreen-content");
    const toggleBtn = document.querySelector(".sidebar-toggle");

    // Toggle mobile menu
    toggleBtn?.addEventListener("click", () => {
        submenu.classList.toggle("hidden");
    });

    // Remplit une sous-liste à partir des .media-item d’une catégorie
    function populateList(catId, listElem) {
        listElem.innerHTML = ""; // vider
        const items = document
            .getElementById(catId)
            .querySelectorAll(".media-item .media-title");
        items.forEach((titleEl, idx) => {
            const li = document.createElement("li");
            const btn = document.createElement("button");
            btn.textContent = titleEl.textContent;
            btn.addEventListener("click", () => {
                // scroll vers la vignette
                titleEl.scrollIntoView({ behavior: "smooth", block: "center" });
            });
            li.appendChild(btn);
            listElem.appendChild(li);
        });
    }

    // Affiche la catégorie + sa sous-liste
    function showCategory(category) {
        const isPhoto = category === "photo";
        photoCat.classList.toggle("hidden", !isPhoto);
        videoCat.classList.toggle("hidden", isPhoto);

        // peupler et afficher la bonne sous-liste
        if (isPhoto) {
            populateList("photo-category", photoList);
            photoList.classList.remove("hidden");
            videoList.classList.add("hidden");
        } else {
            populateList("video-category", videoList);
            videoList.classList.remove("hidden");
            photoList.classList.add("hidden");
        }
    }

    // Attache showCategory à chaque bouton data-cat
    document.querySelectorAll(".sidebar-menu button[data-cat]").forEach(btn => {
        btn.addEventListener("click", () => showCategory(btn.dataset.cat));
    });

    // Fullscreen
>>>>>>> 98661f487dc2a32f1d705979545749a1fc7c8753
    document.querySelectorAll(".media-thumb").forEach(el => {
        el.addEventListener("click", () => {
            content.innerHTML = "";
            const clone = el.cloneNode(true);
            if (clone.tagName === "VIDEO") clone.controls = true;
            content.appendChild(clone);
            overlay.classList.remove("hidden");
        });
    });
<<<<<<< HEAD
=======
    //Fermer fullscreen
>>>>>>> 98661f487dc2a32f1d705979545749a1fc7c8753
    document.querySelector(".fullscreen-close").addEventListener("click", () => {
        overlay.classList.add("hidden");
        content.innerHTML = "";
    });
<<<<<<< HEAD

    // 5) affiche la 1ʳᵉ catégorie par défaut
    showCategory("photo");
=======
>>>>>>> 98661f487dc2a32f1d705979545749a1fc7c8753
});
