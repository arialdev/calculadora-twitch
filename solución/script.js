/** Esto es un documento de JavaScript (JS). Esto SÍ es programar.
 * Aquí escribimos el código que haga que nuestra calculadora funcione.
 * 
** Para ello escribimos funciones (métodos), a los que iremos llamando según
 * los vayamos necesitando (función suma, función resolver, función limpiar pantalla, etc.). 
 * 
*/

const screen = document.getElementById('screen');   //Guardamos en una variable el elemento de la pantalla para acceder a él más comodamente

//Aquí guardamos los operando y el operador. Todos empiezan sin ningún valor inicial (null=nada)
var operando1 = null;
var operando2 = null;
var operador = null;

function addToCalc(elemento) {
    //Esta función es llamada cuando pulsamos la tecla de cualquier número u operador.
    // Los botones de número y de operador se diferencian en que los últimos tienen un atributo más, llamado data-operator.
    if (elemento.getAttribute('data-operator')) {
        //Si tiene el atributo data-operator, es un operador, por lo que lo que había en pantalla lo guardamos
        //en el registro de operando1 y el operador pulsado lo guardamos en el registro de operador
        operando1 = screen.value;
        operador = elemento.getAttribute('data-operator');
    }
    else {
        //Si no, era un número.

        /**Esto es un truco que hacemos para que cuando se haya escogido el operador, y ya vayamos a escribir el segundo operando,
         * la siguiente vez que pulsemos un número no se concatene al final de lo anteriormente escrito, sino que empiece de cero en la pantalla
         */
        if (operador) screen.value = 0; 
        if (screen.value == 0) {    //Si es el primer número, borramos el cero que había en pantalla y lo sustituimos por este
            screen.value = elemento.value;
        }
        else {  //Si no, simplemente lo concatenamos (añadimos) al final de la pantalla
            screen.value += elemento.value;
        }
    }
}

function clearScreen() {
    /** Reseteamos todos los registros y escribimos un cero en la pantalla, borrando todo lo demás */
    screen.value = 0;
    operando1 = null;
    operando2 = null;
    operador = null;
}

function deleteLast() {
    const value = screen.value; //obtengo el valor actual de la pantalla
    let newValue = value.slice(0, -1)   //creo una nueva variable con el valor anterior salvo el último dígito
    if (newValue == '') {    
        /*Si ya no hay ningún valor, significa que antes sólo había un dígito, y ahora no hay ningúno, por lo
        que directamente escribimos un cero para que la pantalla no esté vacía*/   
        screen.value = 0;
    }
    else {
        //En caso contrario, escribimos en la pantalla el nuevo valor
        screen.value = newValue;
    }
}

function resolve() {
    //Se llama cuanod se pulsa el =
    operando2 = screen.value;
    let resultado = 0;
    switch (operador) { //Esto es como un if pero con varias posibilidades en vez de un if-else (2 posibilidades)
        case 'sumar': {
            resultado = +operando1 + +operando2;
            break;  //con break salimos del switch para que no haga falta evaluar el resto de condiciones
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
    //Ya tenemos el resultado, por lo que lo imprimimos por pantalla y reseteamos los registros
    screen.value = resultado;
    operando1 = null;
    operando2 = null;
    operador = null;
}