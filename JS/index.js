let keys = document.querySelectorAll(".key");
let equation = "";

keys.forEach((key) => {
    key.addEventListener("click", () => {
        let window = document.querySelector(".window");
        equation += ` ${key.dataset.value}`;
        window.textContent = equation;
    })
})