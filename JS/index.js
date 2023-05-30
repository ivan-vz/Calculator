let keys = document.querySelectorAll(".key");
let operators = ["*", "-", "+", "/", "%", "^"];
let equation = [];
let equalPressed = false;
let pointer = 0;

//Function to write the character on the screen and add it to the equation
let write = (char) => {
  let screen = document.querySelector(".screen");
        if(equalPressed){
            equation = [];
            equalPressed = false; 
        }
        
        equation[pointer] = char;
        screen.children[pointer].setAttribute("data-info", `{index: ${equation.length}, value: ${char}}`)
        screen.children[pointer].textContent = char;
        let div = document.createElement("div");
        screen.appendChild(div);
        if(pointer < equation.length){
          pointer = equation.length;
        } else {
          pointer++;
        }
}

//Writting by clicking on the window
keys.forEach((key) => {
    key.addEventListener("click", () => { write(key.dataset.value) })
})

//Function to indicate where the equation end and start solving it
let equal = document.querySelector("#equal");
equal.addEventListener("click", () => {
    let screen = document.querySelector(".screen");
    if(equation.length === 0){ return }
    let readableEquation = makeReadable(equation);

    if(!validEquation(readableEquation)){
        clear();
        screen.firstElementChild.textContent = 'ERROR';
        equalPressed = true;
        return;
    }

    let result= solve(readableEquation);
    clear();
    screen.firstElementChild.textContent = result;
    equalPressed = true;
    pointer = 0;
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

  let res = [];
  for (let t = 0; t < arr.length; t++) {
    if (!operators.includes(arr[t])) {
      if (res.length && !isNaN(parseFloat(res[res.length - 1]))) {
        res[res.length - 1] += arr[t];
      } else {
        res.push(arr[t]);
      }
    } else {
      res.push(arr[t]);
    }
  }

  return res;
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
        if(arr[i + 2] === "0"){
          return "ERROR";
        } else {
          arr.splice(i, 3, parseFloat(arr[i]) / parseFloat(arr[i + 2]));
        }
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

    if(Number.isInteger(parseFloat(arr[0]))){
      return parseFloat(arr[0]);
    } else {
      return parseFloat(arr[0]).toFixed(2);
    }
  }

//Function to clean eraser all the equation
let clean = document.querySelector(".clear");
clean.addEventListener("click", () => { clear() })

let clear = () => {
  let screen = document.querySelector(".screen");
  equation = [];
  pointer = 0;
  while (screen.firstChild) {
    screen.removeChild(screen.firstChild);
  }
  let div = document.createElement("div");
  screen.appendChild(div);
}

//Function to move between characters
let moves = document.querySelectorAll(".move");
moves.forEach((move) => {
  move.addEventListener("click", () => {
    if(equation !== []){
      if(move.dataset.dir === "right"){
        if(pointer+1 > equation.length-1){
          pointer = 0;
        } else {
          pointer++;
        }
      }
      if(move.dataset.dir === "left"){
        if(pointer-1 < 0){
          pointer = equation.length-1;
        } else {
          pointer--;
        }
      }
    }
  })
})

//Writting by pressing the keyboards
document.addEventListener("keydown", (event) => {
  let key = event.key;

  if (!isNaN(parseFloat(key)) || key === "+" || key === "-" || key === "*" || key === "/" || key === ".") {
    write(key);
  }

  if(key === "Enter") { 
    equal.click();
  }
})