let keys = document.querySelectorAll(".key");
let screen = document.querySelector(".window");
let operators = ["*", "-", "+", "/", "%"];
let equation = "";
let equalPressed = false;

//Function to write the caracter on the screen and add it to the ecuation
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

//Function to indicate where the equation end and start solving it
let equal = document.querySelector("#equal");
equal.addEventListener("click", () => {
    if(equation === ""){ return }

    equation = equation.split(" ");
    if(!validEquation(equation)){ 
        screen.textContent = 'ERROR';
        equalPressed = true;
        return;
    }

    screen.textContent = solve(equation);
    equalPressed = true;
})

//Function to check if the ecuation given is correct
let validEquation = (array) => {
    let i = 0;
    while (i < array.length) {
      if ((i % 2 !== 0 && !isNaN(parseFloat(array[i]))) || (i % 2 === 0 && isNaN(parseFloat(array[i])))) {
        return false;
      }
      i++;
    }
    return true;
}

//Function to resolve the equation
let solve = (arr) => {
    let i = 0;
    while (arr.includes("*") || arr.includes("/") || arr.includes("%")) {
      if (arr[i + 1] === "*") {
        arr.splice(i, 3, parseFloat(arr[i]) * parseFloat(arr[i + 2]));
      } else if (arr[i + 1] === "/") {
        arr.splice(i, 3, parseFloat(arr[i]) / parseFloat(arr[i + 2]));
      } else if(arr[i + 1] === "%") {
        arr.splice(i, 3, parseFloat(arr[i]) % parseFloat(arr[i + 2]));
      }else {
        i++;
        continue;
      }
    }

    let j = 0;
    while (arr.includes("+") || arr.includes("-")) {
        if (arr[j + 1] === "+") {
          arr.splice(j, 3, parseFloat(arr[j]) + parseFloat(arr[j + 2]));
        } else if (arr[j + 1] === "-") {
          arr.splice(j, 3, parseFloat(arr[j]) - parseFloat(arr[j + 2]));
        } else {
          j++;
          continue;
        }
    }

    return arr[0];
  }

//Function to clean eraser all the equation
let clean = document.querySelector(".clear");
clean.addEventListener("click", () => {
  equation = "";
  screen.textContent = equation;
})

//Function to move between caracters
let moves = document.querySelectorAll(".move");
moves.forEach((move) => {
  move.addEventListener("click", () => {

  })
})