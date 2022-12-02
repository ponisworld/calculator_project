let runningTotal = 0;
let buffer = '0';
let previousOperator = null;

const screen = document.getElementById("result");

function buttonClick(value) {
    //Si es NaN el valor convertido a número...
    if (Number.isNaN(parseInt(value))) {
        //Tratarlo como símbolo
        handleSymbol(value);
    } 
    //Si no es NaN, entonces es número.
    else {
        //Y hay que tratarlo como número.
        handleNumber(value);
    }

    screen.innerText = buffer;
} 

function handleSymbol(symbol) {
    switch (symbol) {
        case 'C':
            buffer = '0';
            runningTotal = 0;
            break;
    
        case '←':
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                //Corta el string del primer elemento al de 1 menos de la longitud del string. (o sea que elimina 1)
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;  

        case '+':
        case '-':
        case '×':
        case '+':
            handleMath(symbol);
            break;

        case '=':
            if (previousOperator === null) {
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal.toString();
            runningTotal = 0;
            break;
    }
}


function handleMath(symbol) {
    if (buffer === '0') {
        //do nothing.
        return;
    }

    const intBuffer = parseInt(buffer);

    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }

    previousOperator = symbol;

    buffer = "0";
}

function flushOperation(intBuffer) {
    switch (previousOperator) {
        case '+':
            runningTotal += intBuffer;
            break;
        case '-':
            runningTotal -= intBuffer;
            break;
        case '×':
            runningTotal *= intBuffer;
            break;
        case '+':
            runningTotal /= intBuffer;
            break;
    }
}

function handleNumber(stringNumber) {
    if (buffer === '0') {
        buffer = stringNumber;
    }
    else {
        buffer += stringNumber;
    }
}


function init() {
    document.querySelector('#calculator')
        .addEventListener('click',
            (e) => {
                buttonClick(e.target.innerText)
            }
        )

}

init();