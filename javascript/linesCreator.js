const submitButton = document.querySelector('#bt-generar')
const copyButton = document.querySelector('#bt-copy')

submitButton.addEventListener('click', (event) => handleSubmit(event))
copyButton.addEventListener('click', () => handleCopy())



/**
 * Genera una serie de líneas según un patrón
 * 
 * @param {string} patron El patrón con %%n%% donde iría el número
 * @param {number} cantidad La cantidad de líneas a generar
 * @param {number} bloque El número de repeticiones del patrón por línea
 * @returns {string} Las líneas generadas
 */
const generar = (patron, cantidad = 1, bloque = 1, divisor) => {
  let bloqueLineas = "";
  const HAY_BLOQUES = bloque >= 2
  const DEFAULT_DIVISOR = ","


  if (cantidad <= 0 || bloque <= 0) {
    return "¡Error! La cantidad y los bloques deben ser mayores de 0"
  }

  if (patron === null) {
    return "¡Error! No has introducido un patrón"
  }

  if (!patron.includes("%%n%%")) {
    return "¡Error! El patrón no incluye la posición del número"
  }

  for (let i = 1; i <= cantidad; i++) {
    let linea = "";

    if (HAY_BLOQUES) {
      for (let j = 1; j <= bloque; j++) {
        // comprueba que sea el último eleemnto del bloque o del total
        const ULTIMO_ELEMENTO_BLOQ = j == bloque || i == cantidad
        
        linea += sustituirCadena(patron, i, ULTIMO_ELEMENTO_BLOQ ? DEFAULT_DIVISOR : divisor);
        i++
        if (i > cantidad) {
          j = bloque
        }
      }
    } else {
      linea = sustituirCadena(patron, i, DEFAULT_DIVISOR);
    }

    bloqueLineas += linea + "\n";
    if (HAY_BLOQUES) {
      i--
    }
  }

  return bloqueLineas;
}

const sustituirCadena = (cadena, numero, divisor) => {
  return cadena.replace(/%%n%%/g, numero) + `${divisor} `;
}


const handleCopy = () => {
  const contenedor = document.querySelector('#code-container')
  copyPaste(contenedor.textContent)
}


const handleSubmit = (event) => {
  event.preventDefault()

  const { cadena, cantidad, bloques, divisor } = document.querySelector('form').elements
  const result = generar(cadena.value, cantidad.value, bloques.value === "" ? 1 : bloques.value, divisor.value)
  pintarCodigo(result)
}

const pintarCodigo = (codigo) => {
  const contenedor = document.querySelector('#code-container')
  contenedor.textContent = codigo
  contenedor.style.whiteSpace = "pre-line";
}

const copyPaste = (texto) => {
  navigator.clipboard.writeText(texto)
    .then(() => {
      console.log("Texto copiado al portapapeles");
    })
    .catch(err => {
      console.error("No se pudo copiar el texto: ", err);
    });
}
