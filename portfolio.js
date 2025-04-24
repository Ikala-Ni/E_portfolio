document.addEventListener("DOMContentLoaded", () => {
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
    document.querySelectorAll(".media-thumb").forEach(el => {
        el.addEventListener("click", () => {
            content.innerHTML = "";
            const clone = el.cloneNode(true);
            if (clone.tagName === "VIDEO") clone.controls = true;
            content.appendChild(clone);
            overlay.classList.remove("hidden");
        });
    });
    //Fermer fullscreen
    document.querySelector(".fullscreen-close").addEventListener("click", () => {
        overlay.classList.add("hidden");
        content.innerHTML = "";
    });
});
