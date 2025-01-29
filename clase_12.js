
/*
for(let i = 1; i <= 5; i++){
    setTimeout(function timeout(){
        console.log("Hola");
    }, i * 1000);
    
}

for(let j = 1; j <= 4; j++){
    setTimeout(function timeout(){
        console.log("paralelo");
    }, j * 1000);

}

let promesa1 = new Promise(function (resolve, reject){
    setTimeout(() => {
        if (Math.random() < 0.5) {
            console.log("Procesando la promesa");
            resolve("Correcto!");
        } else {
            reject(new Error("Algo falló"));
        }
    }, 1000);
})

promesa1.then(function exito(result){
    console.log(result);
}, function rechazo(error){
    console.log(error);
}); 

function loadScript(src){
    return new Promise(function(resolve, reject){
        let script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve(script);
        script.onerror = () => reject(new Error("Script load error; " + src));
        document.head.append(script);
    })
}

//let promesa2 = loadScript("https://algunalibreria.js"); 
let promesa2 = loadScript("https://www.googletagmanager.com/gtag/js?id=UA-XXXXX-Y");
promesa2.then(
    script => alert(script.src + "cargada!"),
    error => alert("Error:" + error.message)
);
promesa2.then(script => alert("algo extra por hacer!"));*/

let flagHola = false;
let flagMundo = false;

// Función para imprimir "Hola"
function callbackHellHola() {
    setTimeout(function primerHola() {
        console.log("Hola1");
        setTimeout(function segundoHola() {
            console.log("Hola2");
            setTimeout(function tercerHola() {
                console.log("Hola3");
                setTimeout(function cuartoHola() {
                    console.log("Hola4");
                    setTimeout(function quintoHola() {
                        console.log("Hola5");
                        flagHola = true;  
                    }, 1000);
                }, 1000);
            }, 1000);
        }, 1000);
    }, 1000);
}


function callbackHellMundo() {
    setTimeout(function primerMundo() {
        console.log("Mundo1");
        setTimeout(function segundoMundo() {
            console.log("Mundo2");
            setTimeout(function tercerMundo() {
                console.log("Mundo3");
                setTimeout(function cuartoMundo() {
                    console.log("Mundo4");
                    setTimeout(function quintoMundo() {
                        console.log("Mundo5");
                        flagMundo = true;  
                    }, 1000);
                }, 1000);
            }, 1000);
        }, 1000);
    }, 1000);
}


function ifEnd() {
    if (flagHola && flagMundo) {
        console.log("FIN");
    } else {
        setTimeout(ifEnd, 100);
    }
}


callbackHellHola();
callbackHellMundo();


setTimeout(ifEnd, 5000);

function printHola(value) {
    console.log("Hola " + value);
    if (value < 10) {
      setTimeout(printHola, 1000, value + 1);
    } else {
      flagHola = true;
    }
  }
  
  function printMundo(value) {
    console.log("Mundo " + value);
    if (value < 5) {
      setTimeout(printMundo, 2000, value + 1);
    } else {
      flagMundo = true;
      ifEnd(); // Se ejecuta al terminar una de las funciones
    }
  }
  
  setTimeout(printHola, 1000, 1); // Espera 1 segundo
  setTimeout(printMundo, 2000, 1);
  
  function ifEnd() {
    if (flagHola && flagMundo) {
      console.log("FIN");
    } else {
      setTimeout(ifEnd, 100);
    }
  }

  //
  function printHola(value) {
    return new Promise(function (resolve, reject) {
      setTimeout(() => {
        console.log("Hola " + value);
        resolve(value + 1);
      }, 1000);
    });
  }
  
  // Encadenar promesas para `printHola`
  let pH = printHola(1)
    .then(result => printHola(result))
    .then(result => printHola(result))
    .then(result => printHola(result))
    .then(result => printHola(result))
    .then(() => Promise.resolve());
  
  // Lo mismo para `printMundo`
  let pM = printMundo(1)
    .then(result => printMundo(result))
    .then(result => printMundo(result))
    .then(result => printMundo(result))
    .then(result => printMundo(result))
    .then(() => Promise.resolve());
  
  pH.then(() => pM).then(() => console.log("FIN"));

  function delay(ms) {
    return new Promise(function (resolve) {
      setTimeout(() => resolve(), ms);
    });
  }
  
  function recursiveText(mensaje, tiempo, cantidad, current) {
    return delay(tiempo).then(() => {
      console.log(mensaje + ((current) * 10) + "%");
      if (current >= cantidad) return Promise.resolve();
      return recursiveText(mensaje, tiempo, cantidad, current + 1);
    });
  }
  
  let pHr = recursiveText("Hola ", 1000, 10, 1);
  let pMr = recursiveText("Mundo ", 2000, 5, 1);
  
  pHr.then(() => pMr).then(() => console.log("FIN"));
  
  //

  function delay(ms) {
    return new Promise(function (resolve) {
      setTimeout(() => resolve(), ms);
    });
  }
  
  async function printHola() {
    for (let i = 0; i < 5; i++) {
      await delay(1000);
      console.log("Hola " + i);
    }
    return Promise.resolve();
  }
  
  async function printMundo() {
    for (let i = 0; i < 5; i++) {
      await delay(2000);
      console.log("Mundo " + i);
    }
    return Promise.resolve();
  }
  
  (async function tareaFin() {
    await Promise.all([printHola(), printMundo()]);
    console.log("FIN");
  })();
  
  // O usando Promise.all directamente
  Promise.all([
    printHola(),
    printMundo()
  ]).then(() => console.log("FIN"));
  
  