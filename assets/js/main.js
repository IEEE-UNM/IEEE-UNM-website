document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE MENU
       ===================================================== */

    const menuButton = document.getElementById("menuButton");
    const mainNav = document.getElementById("mainNav");

    if (menuButton && mainNav) {
        menuButton.addEventListener("click", () => {
            const isOpen = mainNav.classList.toggle("active");

            menuButton.setAttribute(
                "aria-label",
                isOpen ? "Close menu" : "Open menu"
            );

            menuButton.innerHTML = isOpen ? "✕" : "☰";
        });

        mainNav.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                mainNav.classList.remove("active");

                menuButton.setAttribute(
                    "aria-label",
                    "Open menu"
                );

                menuButton.innerHTML = "☰";
            });
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 900) {
                mainNav.classList.remove("active");

                menuButton.setAttribute(
                    "aria-label",
                    "Open menu"
                );

                menuButton.innerHTML = "☰";
            }
        });
    }


    /* =====================================================
    DARK MODE
    ===================================================== */

    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");

    if (themeToggle) {

        const savedTheme = localStorage.getItem("theme");

        if (savedTheme === "dark") {
            document.body.classList.add("dark-mode");

            themeToggle.setAttribute(
                "aria-pressed",
                "true"
            );

            if (themeIcon) {
                themeIcon.textContent = "☀";
            }
        }

        themeToggle.addEventListener("click", () => {

            const isDark =
                document.body.classList.contains("dark-mode");

            const rect =
                themeToggle.getBoundingClientRect();

            const x =
                rect.left + rect.width / 2;

            const y =
                rect.top + rect.height / 2;

            /*
            * Calculate the distance from the button
            * to the furthest corner of the screen.
            *
            * This guarantees the circle completely
            * covers the screen.
            */

            const distances = [
                Math.hypot(x, y),
                Math.hypot(window.innerWidth - x, y),
                Math.hypot(x, window.innerHeight - y),
                Math.hypot(
                    window.innerWidth - x,
                    window.innerHeight - y
                )
            ];

            const radius =
                Math.max(...distances) + 10;

            /*
            * Create transition overlay.
            */

            const overlay =
                document.createElement("div");

            overlay.className =
                "theme-transition";

            overlay.style.setProperty(
                "--transition-x",
                `${x}px`
            );

            overlay.style.setProperty(
                "--transition-y",
                `${y}px`
            );

            overlay.style.setProperty(
                "--transition-radius",
                `${radius}px`
            );

            /*
            * Decide which colour the overlay should be.
            *
            * Light → Dark = dark overlay
            * Dark → Light = white overlay
            */

            overlay.style.setProperty(
                "--transition-color",
                isDark ? "#ffffff" : "#101820"
            );

            document.body.appendChild(overlay);

            /*
            * Start expansion.
            */

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    overlay.classList.add("expand");
                });
            });

            /*
            * Wait until the screen is completely covered,
            * then change the actual theme underneath.
            */

            setTimeout(() => {

                document.body.classList.toggle(
                    "dark-mode",
                    !isDark
                );

                localStorage.setItem(
                    "theme",
                    !isDark ? "dark" : "light"
                );

                themeToggle.setAttribute(
                    "aria-pressed",
                    !isDark ? "true" : "false"
                );

                if (themeIcon) {
                    themeIcon.textContent =
                        !isDark ? "☀" : "☾";
                }

                /*
                * Now reveal the new theme by shrinking
                * the circle back toward the button.
                */

                requestAnimationFrame(() => {
                    overlay.classList.remove("expand");
                    overlay.classList.add("contract");
                });

            }, 600);

            /*
            * Remove the overlay once the contraction
            * animation is finished.
            */

            setTimeout(() => {
                overlay.remove();
            }, 1200);
        });
    }

    /* =====================================================
    HERO TEXT ROTATION
    ===================================================== */

    const rotatingText =
        document.getElementById("rotatingText");

    if (rotatingText) {

        const words = [
            "Electrical",
            "Electronic",
            "Mechatronic",
            "Computer Science"
        ];

        let currentIndex = 0;

        setInterval(() => {

            rotatingText.style.animation = "none";

            void rotatingText.offsetWidth;

            currentIndex =
                (currentIndex + 1) % words.length;

            rotatingText.textContent =
                words[currentIndex];

            rotatingText.style.animation =
                "textSlideIn 0.45s ease";

        }, 2500);
    }

});

/* =====================================================
   HEADER SCROLL EFFECT
   ===================================================== */

const siteHeader = document.querySelector(".site-header");

if (siteHeader) {
    const updateHeader = () => {
        if (window.scrollY > 10) {
            document.body.classList.add("header-scrolled");
        } else {
            document.body.classList.remove("header-scrolled");
        }
    };

    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );
}

/* =====================================================
   COMMITTEE TABS
   ===================================================== */

const committeeTabs =
    document.querySelectorAll(".committee-tab");

const committeePanels =
    document.querySelectorAll(".committee-panel");

if (
    committeeTabs.length > 0 &&
    committeePanels.length > 0
) {

    committeeTabs.forEach((tab) => {

        tab.addEventListener("click", () => {

            const selectedTeam =
                tab.dataset.team;


            /* -------------------------
               Update active tab
               ------------------------- */

            committeeTabs.forEach((item) => {

                const isActive =
                    item === tab;

                item.classList.toggle(
                    "active",
                    isActive
                );

                item.setAttribute(
                    "aria-selected",
                    isActive
                        ? "true"
                        : "false"
                );
            });


            /* -------------------------
               Update active panel
               ------------------------- */

            committeePanels.forEach((panel) => {

                const isActive =
                    panel.dataset.team === selectedTeam;

                panel.classList.toggle(
                    "active",
                    isActive
                );

            });

        });

    });

}

/* =========================
   Updates Search & Filters
   ========================= */

const updateSearch = document.getElementById("updateSearch");
const academicYearFilter = document.getElementById("academicYearFilter");
const typeFilter = document.getElementById("typeFilter");
const clearFilters = document.getElementById("clearFilters");

const updateCards = document.querySelectorAll(".update-card");
const noResults = document.getElementById("noResults");

if (
    updateSearch &&
    academicYearFilter &&
    typeFilter &&
    clearFilters &&
    updateCards.length
) {
    const academicYears = new Set();
    const types = new Set();

    /* Collect filter values from posts */
    updateCards.forEach(card => {
        const academicYear = card.dataset.academicYear;
        const type = card.dataset.type;

        if (academicYear) {
            academicYears.add(academicYear);
        }

        if (type) {
            types.add(type);
        }
    });

    /* Populate Academic Year dropdown */
    [...academicYears]
        .sort()
        .reverse()
        .forEach(year => {
            const option = document.createElement("option");

            option.value = year;
            option.textContent = year;

            academicYearFilter.appendChild(option);
        });

    /* Populate Type dropdown */
    [...types]
        .sort()
        .forEach(type => {
            const option = document.createElement("option");

            option.value = type;
            option.textContent =
                type.charAt(0).toUpperCase() + type.slice(1);

            typeFilter.appendChild(option);
        });

    /* Apply filters */
    function filterUpdates() {
        const searchTerm = updateSearch.value
            .trim()
            .toLowerCase();

        const selectedYear = academicYearFilter.value;
        const selectedType = typeFilter.value;

        let visibleCount = 0;

        updateCards.forEach(card => {
            const title = card.dataset.title || "";
            const academicYear = card.dataset.academicYear || "";
            const type = card.dataset.type || "";

            const matchesSearch =
                title.includes(searchTerm);

            const matchesYear =
                selectedYear === "all" ||
                academicYear === selectedYear;

            const matchesType =
                selectedType === "all" ||
                type === selectedType;

            if (
                matchesSearch &&
                matchesYear &&
                matchesType
            ) {
                card.style.display = "";
                visibleCount++;
            } else {
                card.style.display = "none";
            }
        });

        /* Show / hide no-results message */
        noResults.style.display =
            visibleCount === 0 ? "block" : "none";
    }

    /* Events */
    updateSearch.addEventListener("input", filterUpdates);

    academicYearFilter.addEventListener(
        "change",
        filterUpdates
    );

    typeFilter.addEventListener(
        "change",
        filterUpdates
    );

    clearFilters.addEventListener("click", () => {
        updateSearch.value = "";
        academicYearFilter.value = "all";
        typeFilter.value = "all";

        filterUpdates();
    });
}