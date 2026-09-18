// Seleciona elementos
var root = document.documentElement;
var btn = document.getElementById("themeToggle");

// Função para aplicar o tema
function applyTheme(theme) {
    // Define o tema no HTML (Bulma lê o atributo data-theme)
    root.setAttribute("data-theme", theme);
    // Salva no localStorage
    localStorage.setItem("theme", theme);
    // Se o botão existir, atualiza o ícone
    if (btn) {
        if (theme === "dark") {
            btn.innerHTML = '<span class="icon"><i class="fa-solid fa-sun"></i></span>';
        } else {
            btn.innerHTML = '<span class="icon"><i class="fa-solid fa-moon"></i></span>';
        }
    }
}

// Verifica se já existe tema salvo
var savedTheme = localStorage.getItem("theme");

if (savedTheme) {
    applyTheme(savedTheme);
} else {
    applyTheme("light");
}

// Evento de clique no botão de tema
if (btn) {
    btn.addEventListener("click", function () {
        var currentTheme = root.getAttribute("data-theme");
        if (currentTheme === "light") {
            applyTheme("dark");
        } else {
            applyTheme("light");
        }
    });
}

var burger = document.getElementById("navBurger");
if (burger) {
    burger.addEventListener("click", function () {
        var target = document.getElementById(burger.dataset.target);
        burger.classList.toggle("is-active");
        target.classList.toggle("is-active");
    });
}

var navbar = document.querySelector(".navbar");

if (navbar) {
    window.addEventListener("scroll", function () {
        if (window.scrollY > 10) {
            navbar.classList.add("is-scrolled");
        } else {
            navbar.classList.remove("is-scrolled");
        }
    });
}

var revealTargets = document.querySelectorAll("main section, .box");
revealTargets.forEach(function (el) {
    el.classList.add("reveal");
});

var revealObserver = new IntersectionObserver(
    function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.15 }
);

revealTargets.forEach(function (el) {
    revealObserver.observe(el);
});

var sections = document.querySelectorAll("main section[id]");
var navLinks = document.querySelectorAll(".navbar-end .navbar-item[href]");

function setActiveLink(id) {
    navLinks.forEach(function (link) {
        var isActive = link.getAttribute("href") === "#" + id;
        link.classList.toggle("is-current-section", isActive);
    });
}

var sectionObserver = new IntersectionObserver(
    function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                setActiveLink(entry.target.id);
            }
        });
    },
    { rootMargin: "-40% 0px -55% 0px" }
);

sections.forEach(function (section) {
    sectionObserver.observe(section);
});