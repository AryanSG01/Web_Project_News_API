// const switchMode = document.getElementById('switch-mode');

// switchMode.addEventListener('change', function () {
//     if (this.checked) {
//         document.body.classList.add('dark');
//     } else {
//         document.body.classList.remove('dark');
//     }
// })

const themeToggler = document.querySelector(".theme-toggler");

themeToggler.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme-variables");
    document.body.classList.toggle("dark");
    themeToggler.querySelectorAll("span").forEach(icon => {
        icon.classList.toggle("active");
    });
});

themeToggler.addEventListener('change', function () {
    if (this.checked) {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
})
