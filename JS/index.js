let keys = document.querySelectorAll(".key");
let screen = document.querySelector(".screen");
let operators = ["*", "-", "+", "/", "%", "^"];
let equation = [];
let equalPressed = false;
let pointer = 0;

//Function to write the character on the screen and add it to the equation
keys.forEach((key) => {
    key.addEventListener("click", () => {
        if(equalPressed){
            equation = "";
            equalPressed = false; 
        }
        
        equation.push(key.dataset.value);
        let div = document.createElement("div");
        div.setAttribute("data-info", `{index: ${equation.length - 1}, value: ${key.dataset.value}}`)
        div.textContent = key.dataset.value;
        screen.appendChild(div);
        pointer = equation.length - 1;
    })
})

//Function to indicate where the equation end and start solving it
let equal = document.querySelector("#equal");
equal.addEventListener("click", () => {
    if(equation === []){ return }

    let readableEquation = makeReadable(equation);

    if(!validEquation(readableEquation)){ 
        screen.textContent = 'ERROR';
        equalPressed = true;
        return;
    }

    screen.textContent = solve(readableEquation);
    equalPressed = true;
})

//Function to check if the equation given is correct
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

//Function to make readable a equation
let makeReadable = (eq) => {
  let arr =  eq.map((val) => val.trim());
  
  let signs = ['+', '-'];
  let op = ["*", "/", "%", "^"];


  let i = 0;
  while(arr[i+1] !== undefined){
    if(signs.includes(arr[i]) && signs.includes(arr[i+1])){
      if(arr[i] === "+" && arr[i+1]=== "+"){
        arr.splice(i, 2, "+");
      }

      if(arr[i] === "-" && arr[i+1]=== "-"){
        arr.splice(i, 2, "+");
      }

      if((arr[i] === "-" && arr[i+1]=== "+") || (arr[i] === "+" && arr[i+1]=== "-")){
        arr.splice(i, 2, "-");
      }

      i--;
    } else {
      i++;
    }
  }

  let k = 0;
  while(arr[k+1] !== undefined){
    if (k > 20){ return }
    if(op.includes(arr[k]) && signs.includes(arr[k+1])){
      arr.splice(k+1, 2, `${arr[k+1]}${arr[k+2]}`);
      k--;
    } else {
      k++;
    }
  }

  return arr;
}

//Function to resolve the equation
let solve = (arr) => {
    let k = 0;
    while (arr.includes("^")) {
      if (arr[k + 1] === "^") {
        let pot = 1;
        for(let t = 0; t < parseInt(arr[k+2]); t++){
          pot *= parseFloat(arr[k]);
        }
        arr.splice(k, 3, pot);
      } else {
        k++;
        continue;
      }
    }

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

//Function to move between characters
let moves = document.querySelectorAll(".move");
moves.forEach((move) => {
  move.addEventListener("click", () => {
    if(equation !== []){ 
      /*
      ya fueron creados los div con un data-info con los valores del interior y el del indice, ahora toca como ver para mover el focus y poder cambiar el valor si agregar otro elemento
      */
    }
  })
})