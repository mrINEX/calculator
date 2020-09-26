function expressionCalculator(expr) {
  let regexNum = /^-\d*\.?\d+$|[0-9]+/;
  let left = 0; let right = 0;
  let a = "TypeError: Division by zero.";
  let b = "ExpressionError: Brackets must be paired";
  let array = expr.split(' ');
  for(let i = 0; i < array.length; i++)
  {
    if(array[i] === '('){left += 1;}
    if(array[i] === ')'){right += 1;}
  }
  if (left !== right) {
    throw new TypeError(b);
  }
  while(array.length > 1) {
    for( i = 0; i < array.length; i++) {
      if(/\(/.test(array[i-1]) && regexNum.test(array[i]) && /\)/.test(array[i+1]))
      {
        array.splice(i-1, 1);array.splice(i, 1);
        i = 0;
      }

      if(regexNum.test(array[i-1]) && /\*/.test(array[i]) && regexNum.test(array[i+1]) && array[i+3] !== '(' && array[i-3] !== ')')
      {
        let answer = Number(array[i-1]) * Number(array[i+1]);
        array[i] = answer;//array[i-1] = ''; array[i+1] = '';
        array.splice(i-1, 1);array.splice(i, 1);
        i = 0;
      }

      if(regexNum.test(array[i-1]) && /\//.test(array[i]) && regexNum.test(array[i+1]) && array[i+3] !== '(' && array[i-3] !== ')')
      {
        if(Number(array[i+1]) === 0) {
          array = Infinity;
          break;
        }
        let answer = Number(array[i-1]) / Number(array[i+1]);
        array[i] = answer;//array[i-1] = ''; array[i+1] = '';
        array.splice(i-1, 1);array.splice(i, 1);
        i = 0;
      }

      if(regexNum.test(array[i-1]) && /\+/.test(array[i]) && regexNum.test(array[i+1]) && array[i+2] !== '*' && array[i+2] !== '/' && array[i-2] !== '*' && array[i-2] !== '/' && array[i+3] !== '(' && array[i-3] !== ')')
      {
        let answer = Number(array[i-1]) + Number(array[i+1]);
        array[i] = answer;//array[i-1] = ''; array[i+1] = '';
        array.splice(i-1, 1);array.splice(i, 1);
        i = 0;
      }

      if(regexNum.test(array[i-1]) && /\-/.test(array[i]) && regexNum.test(array[i+1]) && array[i+2] !== '*' && array[i+2] !== '/' && array[i-2] !== '*' && array[i-2] !== '/' && array[i+3] !== '(' && array[i-3] !== ')')
      {
        let answer = Number(array[i-1]) - Number(array[i+1]);
        array[i] = answer;//array[i-1] = ''; array[i+1] = '';
        array.splice(i-1, 1);array.splice(i, 1);
        i = 0;
      } 
    }
  }
  return array = Number(array);
}

function count(expr) {
  let array = expr.split(' ');
  console.log(array);
  let newArray = array.filter((n) => {
    return /\W/.test(n);
  });
  let [ h ] = newArray;
  switch(h) {
    case '/':
      return +array[0] / +array[2];
    case '*':
      return +array[0] * +array[2];
    case '-':
      return +array[0] - +array[2];
    case '+':
      return +array[0] + +array[2];
    default:
      return 0;
  }
}

const previousOutput = document.querySelector('[data-previous-output]');
const currentOutput = document.querySelector('[data-current-output]');

document.addEventListener('click', ({ target }) => {
  if (target.hasAttribute('data-number')) {
    currentOutput.innerHTML += target.innerHTML;
  }
  if (target.hasAttribute('data-operation')) {
    if (!currentOutput.innerHTML.length && (target.innerHTML === '-')) {
      currentOutput.innerHTML += target.innerHTML;
    }
    if (/(?<![0-9])\-[0-9]+\.[0-9]+|[0-9]+\.[0-9]+|[0-9]+|(?<![0-9])\-[0-9]+/.test(currentOutput.innerHTML)) {
      currentOutput.innerHTML += ` ${target.innerHTML} `;
      previousOutput.innerHTML += currentOutput.innerHTML;
      currentOutput.innerHTML = '';
    }
  }
  if (target.hasAttribute('data-equals')) {
    if (/[0-9]+/.test(currentOutput.innerHTML)) {
      previousOutput.innerHTML += `${currentOutput.innerHTML}`;
      let result = expressionCalculator(previousOutput.innerHTML);
      if (/\./.test(result)) {
        currentOutput.innerHTML = +result.toFixed(10);
      } else {
        currentOutput.innerHTML = +result;
      }
      previousOutput.innerHTML = '';
    }
  }
  if (target.hasAttribute('data-all-clear')) {
    previousOutput.innerHTML = '';
    currentOutput.innerHTML = '';
  }
  if (target.hasAttribute('data-delete') && currentOutput.innerHTML) {
    let result = currentOutput.innerHTML.slice(0, currentOutput.innerHTML.length - 1);
    currentOutput.innerHTML = result;
  }
})
