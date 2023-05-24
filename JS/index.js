let keys = document.querySelectorAll(".key");
let screen = document.querySelector(".window");
let operators = ["*", "-", "+", "/"]
let equation = "";
let equalPressed = false;

keys.forEach((key) => {
    key.addEventListener("click", () => {
        if(equalPressed){
            equation = "";
            equalPressed = false; 
        }
        equation += `${key.dataset.value}`;
        screen.textContent = equation;
    })
})

let equal = document.querySelector("#equal");
equal.addEventListener("click", () => {
    equation = equation.split(" ");
    if(!validEquation(equation)){ 
        screen.textContent = 'ERROR';
        return;
    }

    screen.textContent = agrupar(equation);
    equalPressed = true;
})

let validEquation = (array) => {
    let i = 0;
    while (i < array.length) {
      if ((i % 2 !== 0 && !isNaN(parseInt(array[i]))) || (i % 2 === 0 && isNaN(parseInt(array[i])))) {
        return false;
      }
      i++;
    }
    return true;
}

let agrupar = (arr) => {
    let i = 0;
    while (arr.includes("*") || arr.includes("/")) {
      if (arr[i + 1] === "*") {
        arr.splice(i, 3, parseInt(arr[i]) * parseInt(arr[i + 2]));
      } else if (arr[i + 1] === "/") {
        arr.splice(i, 3, parseInt(arr[i]) / parseInt(arr[i + 2]));
      } else {
        i++;
        continue;
      }
    }

    let j = 0;
    while (arr.includes("+") || arr.includes("-")) {
        if (arr[j + 1] === "+") {
          arr.splice(j, 3, parseInt(arr[j]) + parseInt(arr[j + 2]));
        } else if (arr[j + 1] === "-") {
          arr.splice(j, 3, parseInt(arr[j]) - parseInt(arr[j + 2]));
        } else {
          j++;
          continue;
        }
    }

    return arr[0];
  }