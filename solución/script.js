const screen = document.getElementById('screen');

var operando1 = null;
var operando2 = null;
var operador = null;

function addToCalc(elemento) {
    if (elemento.getAttribute('data-operator')) {
        operando1 = screen.value;
        operador = elemento.getAttribute('data-operator');
    }
    else {
        if (operador) screen.value = 0;
        if (screen.value == 0) {
            screen.value = elemento.value;
        }
        else {
            screen.value += elemento.value;
        }
    }
}

function clearScreen() {
    screen.value = 0;
    operando1 = null;
    operando2 = null;
    operador = null;
}

function deleteLast() {
    const value = screen.value;
    newValue = value.slice(0, -1)
    if (newValue == '') {
        screen.value = 0;
    }
    else {
        screen.value = newValue;
    }
}

function resolve() {
    operando2 = screen.value;
    let resultado = 0;
    switch (operador) {
        case 'sumar': {
            resultado = +operando1 + +operando2;
            break;
        }
        case 'restar': {
            resultado = operando1 - operando2;
            break;
        }
        case 'multiplicar': {
            resultado = operando1 * operando2;
            break;
        }
        case 'dividir': {
            resultado = operando1 / operando2;
            break;
        }
    }
    screen.value = resultado;
    operando1 = null;
    operando2 = null;
    operador = null;
}