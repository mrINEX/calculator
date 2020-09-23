function expressionCalculator(expr) {

  let exprNoSpace = expr.replace(/\s/g,'');
  let regex = /[0-9]+\.[0-9]+|[0-9]+|\W/g; //   /[0-9]+.[0-9]+|\W/g;
  let regexNum = /^-\d*\.?\d+$|[0-9]+/;
  let left = 0; let right = 0;
  let a = "TypeError: Division by zero.";
  let b = "ExpressionError: Brackets must be paired";
  let array = exprNoSpace.match(regex);
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
          throw new TypeError(a);
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

const previousOutput = document.querySelector('[data-previous-output]');
const currentOutput = document.querySelector('[data-current-output]');

document.addEventListener('click', ({target}) => {
  if (target.hasAttribute('data-number') || target.hasAttribute('data-operation')) {
    currentOutput.innerHTML += target.innerHTML;
  }
  if (target.hasAttribute('data-equals')) {
    previousOutput.innerHTML = currentOutput.innerHTML;
    currentOutput.innerHTML = expressionCalculator(currentOutput.innerHTML);
  }
  if (target.hasAttribute('data-all-clear')) {
    previousOutput.innerHTML = '';
    currentOutput.innerHTML = '';
  }
  if (target.hasAttribute('data-delete') && currentOutput.innerHTML) {
    currentOutput.innerHTML = currentOutput.innerHTML.slice(0, currentOutput.innerHTML.length - 1)
  }
})
