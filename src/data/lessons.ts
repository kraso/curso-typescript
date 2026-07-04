import { Lesson } from "@/types/course";

export const lecciones: Lesson[] = [
  // ===== MODULO 1: FUNDAMENTOS =====
  {
    id: "que-es-typescript",
    titulo: "Que es TypeScript",
    descripcion: "Introduccion, historia, motores y por que usarlo.",
    modulo: 1,
    moduloNombre: "Fundamentos",
    orden: 1,
    duracion: "15 min",
    icono: "BookOpen",
    contenido: `## Introduccion

TypeScript es un lenguaje de programacion de **codigo abierto** desarrollado por Microsoft. Es un **superconjunto tipado** de JavaScript, lo que significa que any codigo JavaScript valido es tambien codigo TypeScript valido.

> **Dato clave:** TypeScript no reemplaza a JavaScript, lo potencia. Se convierte en JavaScript antes de ejecutarse.

## Por que TypeScript?

| Ventaja | Descripcion |
|---------|-------------|
| **Deteccion de errores** | Encuentra errores en tiempo de compilacion, no en runtime |
| **Mejor IDE** | Autocompletado, navegacion, refactoring automatico |
| **Documentacion** | Los tipos actuan como documentacion viva |
| **Escalabilidad** | Mantiene el codigo limpio en proyectos grandes |
| **Adopcion** | Usado por Angular, Vue, Deno, y miles de empresas |

## Historia

- **2012** — Microsoft internamente (Anders Hejlsberg)
- **2013** — Anuncio publico en QCon
- **2014** — Open source en CodePlex
- **2016** — Angular 2 adopta TypeScript
- **2020** — Deno lo usa como lenguaje principal
- **2023** — TypeScript 5.x con mejoras de rendimiento

## Como funciona TypeScript

\`\`\`
TypeScript (.ts) --> Compilador (tsc) --> JavaScript (.js) --> Ejecucion
\`\`\`

1. Escribes codigo con tipos
2. El compilador verifica los tipos
3. Genera JavaScript limpio
4. Se ejecuta en cualquier navegador/Node

## Ejemplo: JavaScript vs TypeScript

**JavaScript:**
\`\`\`javascript
function sumar(a, b) {
  return a + b;
}
sumar("5", 3); // "53" — Error logico no detectado
\`\`\`

**TypeScript:**
\`\`\`typescript
function sumar(a: number, b: number): number {
  return a + b;
}
sumar("5", 3); // Error de compilacion!
\`\`\``,
    ejercicio: {
      descripcion: "Declara una variable 'nombre' de tipo string y una variable 'edad' de tipo number. Luego crea un console.log que muestre ambas.",
      codigoInicial: `// Declara las variables con sus tipos
let nombre: 
let edad: 

// Muestra el mensaje
`,
      codigoSolucion: `let nombre: string = "Ana";
let edad: number = 25;
console.log(\`Mi nombre es \${nombre} y tengo \${edad} anios\`);`,
      tests: [
        {
          descripcion: "Existe una variable 'nombre' con tipo string",
          codigo: `__code.includes("nombre") && __code.includes(": string")`,
        },
        {
          descripcion: "Existe una variable 'edad' con tipo number",
          codigo: `__code.includes("edad") && __code.includes(": number")`,
        },
        {
          descripcion: "Se uso console.log para mostrar un mensaje",
          codigo: `__logs.length >= 1`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Primeros-pasos-ts", puntos: 10 },
  },
  {
    id: "instalacion-configuracion",
    titulo: "Instalacion y Configuracion",
    descripcion: "Instalar TypeScript, configurar tsconfig.json y tu primer compile.",
    modulo: 1,
    moduloNombre: "Fundamentos",
    orden: 2,
    duracion: "20 min",
    icono: "Code2",
    contenido: `## Instalacion

### Requisitos previos
- Node.js 16+ instalado
- Un editor de codigo (VS Code recomendado)

### Instalar globalmente

\`\`\`bash
npm install -g typescript
\`\`\`

### Verificar instalacion

\`\`\`bash
tsc --version
\`\`\`

## Tu primer archivo TypeScript

Crea un archivo \`hola.ts\`:

\`\`\`typescript
const mensaje: string = "Hola, TypeScript!";
console.log(mensaje);
\`\`\`

Compilalo:

\`\`\`bash
tsc hola.ts
\`\executa

Esto genera \`hola.js\` que puedes ejecutar:

\`\`\`bash
node hola.js
\`\`\`

## tsconfig.json

El archivo de configuracion de TypeScript:

\`\`\`json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "strict": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"]
}
\`\`\`

### Opciones importantes

| Opcion | Que hace | Recomendado |
|--------|----------|-------------|
| **strict** | Activa todas las verificaciones estrictas | \`true\` |
| **target** | Version de JS que genera | \`ES2022\` |
| **module** | Sistema de modulos | \`ESNext\` |
| **outDir** | Directorio de salida | \`./dist\` |
| **rootDir** | Directorio fuente | \`./src\` |
| **noEmit** | Solo verificar, no generar archivos | \`true\` en libs |`,
    ejercicio: {
      descripcion: "Crea una funcion 'saludar' que reciba un nombre (string) y retorne un string con el saludo.",
      codigoInicial: `// Crea la funcion saludar
function saludar(nombre: string): string {
  // Completa la funcion
}

console.log(saludar("Mundo"));
`,
      codigoSolucion: `function saludar(nombre: string): string {
  return \`Hola, \${nombre}!\`;
}
console.log(saludar("Mundo"));`,
      tests: [
        {
          descripcion: "La funcion saludar existe y es una funcion",
          codigo: `typeof saludar === "function"`,
        },
        {
          descripcion: "La funcion retorna un string con 'Hola'",
          codigo: `saludar("Test").includes("Hola")`,
        },
        {
          descripcion: "Se ejecuto console.log con el resultado",
          codigo: `__logs.length >= 1`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Configurador", puntos: 10 },
  },
  {
    id: "tipos-basicos",
    titulo: "Tipos Basicos",
    descripcion: "number, string, boolean, null, undefined y void.",
    modulo: 1,
    moduloNombre: "Fundamentos",
    orden: 3,
    duracion: "15 min",
    icono: "Code2",
    contenido: `## Los tipos primitivos de TypeScript

TypeScript tiene los mismos tipos primitivos que JavaScript, pero te permite declararlos explicitamente.

## number

Para enteros y decimales. Tambien incluye \`Infinity\`, \`NaN\` y \`-Infinity\`.

\`\`\`typescript
let entero: number = 42;
let decimal: number = 3.14;
let hexadecimal: number = 0xff;
let binario: number = 0b1010;
let octal: number = 0o744;
\`\`\`

## string

Para texto. Funciona con comillas simples, dobles o backticks.

\`\`\`typescript
let nombre: string = "Ana";
let apellido: string = 'Garcia';
let saludo: string = \`Hola, \${nombre}\`;
\`\`\`

## boolean

Solo \`true\` o \`false\`.

\`\`\`typescript
let activo: boolean = true;
let esAdmin: boolean = false;
\`\`\`

## null y undefined

- \`undefined\`: Variable sin valor asignado
- \`null\`: Ausencia intencional de valor

\`\`\`typescript
let x: undefined = undefined;
let y: null = null;
\`\`\`

> **Nota:** En TypeScript estricto, \`null\` y \`undefined\` son tipos separados.

## void

Para funciones que no retornan nada.

\`\`\`typescript
function saludar(nombre: string): void {
  console.log(\`Hola \${nombre}\`);
}
\`\`\`

## never

Para funciones que nunca terminan o siempre lanzan error.

\`\`\`typescript
function error(msg: string): never {
  throw new Error(msg);
}

function infinito(): never {
  while (true) {}
}
\`\`\`

## Ejemplo completo

\`\`\`typescript
let nombre: string = "TypeScript";
let version: number = 5.0;
let esPopular: boolean = true;
let website: null = null;
let Framework: undefined = undefined;

console.log(\`\${nombre} v\${version} - Popular: \${esPopular}\`);
\`\`\``,
    ejercicio: {
      descripcion: "Declara variables con cada tipo primitivo y muestra sus valores con console.log.",
      codigoInicial: `// Declara una variable de cada tipo
let miString: 
let miNumber: 
let miBoolean: 
let miNull: 
let miUndefined: 

// Muestra todos los valores
`,
      codigoSolucion: `let miString: string = "TypeScript";
let miNumber: number = 42;
let miBoolean: boolean = true;
let miNull: null = null;
let miUndefined: undefined = undefined;

console.log(miString, miNumber, miBoolean, miNull, miUndefined);`,
      tests: [
        {
          descripcion: "miString es un string",
          codigo: `__code.includes("miString") && __code.includes(": string")`,
        },
        {
          descripcion: "miNumber es un number",
          codigo: `__code.includes("miNumber") && __code.includes(": number")`,
        },
        {
          descripcion: "miBoolean es un boolean",
          codigo: `__code.includes("miBoolean") && __code.includes(": boolean")`,
        },
        {
          descripcion: "Se ejecuto console.log",
          codigo: `__logs.length >= 1`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Tipador-basico", puntos: 10 },
  },
  {
    id: "variables-const-let",
    titulo: "const, let y Tipado",
    descripcion: "Declara variables con tipos explicitos en TypeScript.",
    modulo: 1,
    moduloNombre: "Fundamentos",
    orden: 4,
    duracion: "10 min",
    icono: "Code2",
    contenido: `## const y let en TypeScript

TypeScript usa las mismas palabras clave que JavaScript: \`const\` y \`let\`. No se usa \`var\`.

## const

Para valores que no cambian. El tipo se infiere pero puedes ser explicito.

\`\`\`typescript
const nombre: string = "Ana";
const edad: number = 25;
const activo: boolean = true;

// nombre = "Juan"; // Error: Cannot assign to 'nombre'
\`\`\`

## let

Para valores que pueden cambiar.

\`\`\`typescript
let contador: number = 0;
contador = 1; // OK
contador = contador + 1; // OK

let mensaje: string = "hola";
mensaje = "adios"; // OK
\`\`\`

## Inferencia de tipos

TypeScript puede adivinar el tipo. No siempre necesitas ser explicito.

\`\`\`typescript
// TypeScript infiere: string
let nombre = "Ana";

// TypeScript infiere: number
let edad = 25;

// TypeScript infiere: boolean
let activo = true;
\`\`\`

## Cuando ser explicito

\`\`\`typescript
// Implicito (OK)
let x = 5;

// Explicito (mejor para parametros y retornos)
function sumar(a: number, b: number): number {
  return a + b;
}
\`\`\`

> **Regla:** En variables locales, infiere. En funciones, se explicito.`,
    ejercicio: {
      descripcion: "Declara una constante 'PI' con valor 3.14 y una variable 'radio' con valor 5. Calcula el area de un circulo.",
      codigoInicial: `// Declara PI como constante
const PI: 

// Declara radio como variable
let radio: 

// Calcula el area (PI * radio^2)
const area = 

console.log(\`El area es: \${area}\`);
`,
      codigoSolucion: `const PI: number = 3.14;
let radio: number = 5;
const area: number = PI * radio * radio;

console.log(\`El area es: \${area}\`);`,
      tests: [
        {
          descripcion: "PI es una constante con valor 3.14",
          codigo: `__code.includes("PI") && __code.includes(": number") && PI === 3.14`,
        },
        {
          descripcion: "radio es un number con valor 5",
          codigo: `__code.includes("radio") && __code.includes(": number") && radio === 5`,
        },
        {
          descripcion: "area se calculo correctamente",
          codigo: `__code.includes("area") && __code.includes(": number") && area === 78.5`,
        },
        {
          descripcion: "Se ejecuto console.log",
          codigo: `__logs.length >= 1`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Variable-ninja", puntos: 10 },
  },
  {
    id: "strings-numeros-booleans",
    titulo: "Strings, Numeros y Booleans",
    descripcion: "Metodos y operaciones con tipos primitives.",
    modulo: 1,
    moduloNombre: "Fundamentos",
    orden: 5,
    duracion: "15 min",
    icono: "Code2",
    contenido: `## Strings en TypeScript

\`\`\`typescript
let nombre: string = "TypeScript";

// Metodos comunes
nombre.toUpperCase();    // "TYPESCRIPT"
nombre.toLowerCase();    // "typescript"
nombre.length;           // 10
nombre.includes("Script"); // true
nombre.startsWith("Type"); // true
nombre.endsWith("Script"); // true
nombre.indexOf("Script");  // 4
nombre.slice(0, 4);       // "Type"
nombre.replace("Type", "Java"); // "JavaScript"
\`\`\`

### Template literals

\`\`\`typescript
let nombre = "Ana";
let edad = 25;
let saludo = \`Hola, \${nombre}! Tienes \${edad} anios.\`;

// Multilinea
let html = \`
  <div>
    <h1>\${nombre}</h1>
    <p>Edad: \${edad}</p>
  </div>
\`;
\`\`\`

## Numeros

\`\`\`typescript
let n: number = 42;

// Metodos utiles
Number.isInteger(n);     // true
Number.isFinite(n);      // true
Number.isNaN(NaN);       // true
n.toFixed(2);            // "42.00"
n.toString();            // "42"
n.toString(16);          // "2a" (hexadecimal)

// Operaciones
Math.floor(3.7);    // 3
Math.ceil(3.2);     // 4
Math.round(3.5);    // 4
Math.max(1, 2, 3);  // 3
Math.min(1, 2, 3);  // 1
Math.random();      // 0-1
\`\`\`

## Booleans

\`\`\`typescript
let a: boolean = true;
let b: boolean = false;

// Operaciones logicas
a && b;   // AND
a || b;   // OR
!a;       // NOT

// Comparaciones
5 > 3;    // true
5 === 5;  // true (siempre usa ===)
5 !== "5"; // true
\`\`\``,
    ejercicio: {
      descripcion: "Crea una funcion que reciba un nombre y retorne: el nombre en mayusculas, la cantidad de letras, y si empieza con la letra 'A'.",
      codigoInicial: `function analizarNombre(nombre: string): string {
  // Implementa la funcion
}

console.log(analizarNombre("Ana"));
`,
      codigoSolucion: `function analizarNombre(nombre: string): string {
  const mayusculas = nombre.toUpperCase();
  const letras = nombre.length;
  const empiezaConA = nombre.startsWith("A");
  return \`\${mayusculas}, \${letras} letras, empieza con A: \${empiezaConA}\`;
}

console.log(analizarNombre("Ana"));`,
      tests: [
        {
          descripcion: "La funcion existe",
          codigo: `typeof analizarNombre === "function"`,
        },
        {
          descripcion: "Retorna mayusculas",
          codigo: `analizarNombre("ana").includes("ANA")`,
        },
        {
          descripcion: "Incluye la cantidad de letras",
          codigo: `analizarNombre("Ana").includes("3")`,
        },
        {
          descripcion: "Detecta si empieza con A",
          codigo: `analizarNombre("Ana").includes("true")`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "String-master", puntos: 10 },
  },
  {
    id: "arrays-y-tuples",
    titulo: "Arrays y Tuples",
    descripcion: "Colecciones ordenadas de elementos tipados.",
    modulo: 1,
    moduloNombre: "Fundamentos",
    orden: 6,
    duracion: "15 min",
    icono: "Code2",
    contenido: `## Arrays

TypeScript puede tipar arrays de dos formas:

\`\`\`typescript
// Forma 1: tipo[]
let numeros: number[] = [1, 2, 3];
let nombres: string[] = ["Ana", "Juan"];

// Forma 2: Array<tipo>
let numeros2: Array<number> = [1, 2, 3];
\`\`\`

### Metodos de arrays

\`\`\`typescript
let nums: number[] = [1, 2, 3, 4, 5];

nums.push(6);          // Agrega al final
nums.pop();            // Elimina del final
nums.includes(3);      // true
nums.find(n => n > 3); // 4
nums.filter(n => n > 2); // [3, 4, 5]
nums.map(n => n * 2);  // [2, 4, 6, 8, 10]
nums.reduce((a, b) => a + b, 0); // 15
nums.forEach(n => console.log(n));
nums.sort((a, b) => a - b);
\`\`\`

### Arrays mixtos

\`\`\`typescript
// Union types en arrays
let mixto: (string | number)[] = [1, "dos", 3, "cuatro"];
\`\`\`

## Tuples

Una tuple es un array con tipos fijos en cada posicion.

\`\`\`typescript
let persona: [string, number] = ["Ana", 25];

// Acceso
persona[0]; // "Ana" (string)
persona[1]; // 25 (number)

// persona = [25, "Ana"]; // Error: tipos invertidos
\`\`\`

### Tuples con label

\`\`\`typescript
type Par = [string, number];
let par: Par = ["edad", 25];
\`\`\`

### Retornar tuples de funciones

\`\`\`typescript
function divide(a: number, b: number): [number, boolean] {
  if (b === 0) return [0, false];
  return [a / b, true];
}

let [resultado, exito] = divide(10, 2);
\`\`\``,
    ejercicio: {
      descripcion: "Crea un array de 5 numeros, filtra los mayores a 3, y multiplica cada uno por 10.",
      codigoInicial: `// Crea un array de numeros
const numeros: 

// Filtra los mayores a 3
const filtrados = 

// Multiplica cada uno por 10
const multiplicados = 

console.log(multiplicados);
`,
      codigoSolucion: `const numeros: number[] = [1, 2, 3, 4, 5];
const filtrados: number[] = numeros.filter(n => n > 3);
const multiplicados: number[] = filtrados.map(n => n * 10);

console.log(multiplicados);`,
      tests: [
        {
          descripcion: "numeros es un array de 5 elementos",
          codigo: `Array.isArray(numeros) && numeros.length === 5`,
        },
        {
          descripcion: "filtrados tiene los numeros mayores a 3",
          codigo: `filtrados.length === 2 && filtrados.includes(4) && filtrados.includes(5)`,
        },
        {
          descripcion: "multiplicados tiene [40, 50]",
          codigo: `multiplicados.length === 2 && multiplicados.includes(40) && multiplicados.includes(50)`,
        },
        {
          descripcion: "Se ejecuto console.log",
          codigo: `__logs.length >= 1`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Array-avenger", puntos: 10 },
  },
  {
    id: "objetos-y-interfaces",
    titulo: "Objetos e Interfaces",
    descripcion: "Define la forma de tus objetos con interfaces.",
    modulo: 1,
    moduloNombre: "Fundamentos",
    orden: 7,
    duracion: "20 min",
    icono: "Code2",
    contenido: `## Objetos tipados

\`\`\`typescript
let persona: { nombre: string; edad: number; activo: boolean } = {
  nombre: "Ana",
  edad: 25,
  activo: true,
};
\`\`\`

## Interfaces

Para definir la forma de objetos de forma reutilizable.

\`\`\`typescript
interface Persona {
  nombre: string;
  edad: number;
  activo: boolean;
}

let ana: Persona = {
  nombre: "Ana",
  edad: 25,
  activo: true,
};
\`\`\`

### Propiedades opcionales

\`\`\`typescript
interface Usuario {
  nombre: string;
  email: string;
  telefono?: string; // Opcional
}

let user: Usuario = {
  nombre: "Juan",
  email: "juan@mail.com",
  // telefono es opcional
};
\`\`\`

### Propiedades readonly

\`\`\`typescript
interface Config {
  readonly apiUrl: string;
  readonly timeout: number;
}

let config: Config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
};

// config.apiUrl = "otra"; // Error: readonly
\`\`\`

### Interfaces con funciones

\`\`\`typescript
interface Calculadora {
  sumar(a: number, b: number): number;
  restar(a: number, b: number): number;
}

let calc: Calculadora = {
  sumar: (a, b) => a + b,
  restar: (a, b) => a - b,
};
\`\`\`

## Type vs Interface

\`\`\`typescript
// Interface - se puede extender
interface Animal {
  nombre: string;
}

interface Perro extends Animal {
  raza: string;
}

// Type - mas flexible
type Color = "rojo" | "azul" | "verde";
type Punto = { x: number; y: number };
\`\`\``,
    ejercicio: {
      descripcion: "Crea una interface 'Coche' con marca, modelo y anio. Luego crea un objeto de tipo Coche.",
      codigoInicial: `// Crea la interface Coche
interface Coche {

}

// Crea un coche
const miCoche: Coche = 

console.log(miCoche);
`,
      codigoSolucion: `interface Coche {
  marca: string;
  modelo: string;
  anio: number;
}

const miCoche: Coche = {
  marca: "Toyota",
  modelo: "Corolla",
  anio: 2023,
};

console.log(miCoche);`,
      tests: [
        {
          descripcion: "miCoche tiene una propiedad 'marca'",
          codigo: `"marca" in miCoche`,
        },
        {
          descripcion: "miCoche tiene una propiedad 'modelo'",
          codigo: `"modelo" in miCoche`,
        },
        {
          descripcion: "miCoche tiene una propiedad 'anio'",
          codigo: `"anio" in miCoche`,
        },
        {
          descripcion: "Se ejecuto console.log",
          codigo: `__logs.length >= 1`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Interface-creator", puntos: 10 },
  },
  {
    id: "union-types",
    titulo: "Union Types",
    descripcion: "Permite que una variable tenga multiples tipos.",
    modulo: 1,
    moduloNombre: "Fundamentos",
    orden: 8,
    duracion: "15 min",
    icono: "Code2",
    contenido: `## Union Types

Un union type permite que una variable sea de uno de varios tipos.

\`\`\`typescript
let id: string | number;

id = "abc123";  // OK
id = 123;      // OK
// id = true;  // Error
\`\`\`

## Con arrays

\`\`\`typescript
let datos: (string | number)[] = [1, "dos", 3, "cuatro"];
\`\`\`

## Con funciones

\`\`\`typescript
function formatId(id: string | number): string {
  if (__code.includes("id") && __code.includes(": string")) {
    return id.toUpperCase();
  }
  return id.toString();
}

formatId("abc"); // "ABC"
formatId(123);   // "123"
\`\`\`

## Type narrowing

TypeScript automaticamente sabe que tipo es despues de una condicion.

\`\`\`typescript
function procesar(valor: string | number) {
  if (__code.includes("valor") && __code.includes(": string")) {
    // Aqui TypeScript sabe que valor es string
    valor.toUpperCase();
  } else {
    // Aqui TypeScript sabe que valor es number
    valor.toFixed(2);
  }
}
\`\`\`

## Literales como tipos

\`\`\`typescript
type Direccion = "norte" | "sur" | "este" | "oeste";
let dir: Direccion = "norte";
// dir = "arriba"; // Error

type Resultado = "exito" | "error" | "cargando";
let estado: Resultado = "exito";
\`\`\``,
    ejercicio: {
      descripcion: "Crea una funcion 'formatear' que acepte un string o number y retorne un string formateado.",
      codigoInicial: `// Crea la funcion con union type
function formatear(valor: 

// Debe retornar string en mayusculas para strings
// y string con 2 decimales para numbers

console.log(formatear("hola"));
console.log(formatear(3.14159));
`,
      codigoSolucion: `function formatear(valor: string | number): string {
  if (__code.includes("valor") && __code.includes(": string")) {
    return valor.toUpperCase();
  }
  return valor.toFixed(2);
}

console.log(formatear("hola"));
console.log(formatear(3.14159));`,
      tests: [
        {
          descripcion: "La funcion formatear existe",
          codigo: `typeof formatear === "function"`,
        },
        {
          descripcion: "formatear('hola') retorna 'HOLA'",
          codigo: `formatear("hola") === "HOLA"`,
        },
        {
          descripcion: "formatear(3.14159) retorna '3.14'",
          codigo: `formatear(3.14159) === "3.14"`,
        },
        {
          descripcion: "Se ejecuto console.log",
          codigo: `__logs.length >= 2`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Union-warrior", puntos: 10 },
  },
  {
    id: "type-alias",
    titulo: "Type Aliases",
    descripcion: "Crea nombres propios para tipos complejos.",
    modulo: 1,
    moduloNombre: "Fundamentos",
    orden: 9,
    duracion: "15 min",
    icono: "Code2",
    contenido: `## Type Aliases

Un type alias es un nombre para un tipo. Facilita reutilizar tipos complejos.

\`\`\`typescript
type Nombre = string;
type Edad = number;

let miNombre: Nombre = "Ana";
let miEdad: Edad = 25;
\`\`\`

## Para objetos

\`\`\`typescript
type Persona = {
  nombre: string;
  edad: number;
  email?: string;
};

let ana: Persona = {
  nombre: "Ana",
  edad: 25,
};
\`\`\`

## Para arrays

\`\`\`typescript
type ListaNumeros = number[];
type ListaNombres = string[];

let nums: ListaNumeros = [1, 2, 3];
let nombres: ListaNombres = ["Ana", "Juan"];
\`\`\`

## Para union types

\`\`\`typescript
type Direccion = "norte" | "sur" | "este" | "oeste";
type Estado = "activo" | "inactivo" | "pendiente";

let dir: Direccion = "norte";
let estado: Estado = "activo";
\`\`\`

## Para funciones

\`\`\`typescript
type Callback = (dato: string) => void;
type Comparador<T> = (a: T, b: T) => number;

const miCallback: Callback = (dato) => console.log(dato);
const miComparador: Comparador<number> = (a, b) => a - b;
\`\`\`

## Type vs Interface

| Caracteristica | type | interface |
|---------------|------|-----------|
| Extension | \`&\` (intersection) | \`extends\` |
| Declaracion multiple | No | Si (se mergean) |
| Primitivos | Si | No |
| Tuplas | Si | No |

\`\`\`typescript
// Type: union
type Animal = "perro" | "gato";

// Type: intersection
type Entidad = Persona & { id: number };

// Interface: extension
interface Perro extends Animal {
  raza: string;
}
\`\`\``,
    ejercicio: {
      descripcion: "Crea un type 'Producto' y una funcion que calcule el total de una lista de productos.",
      codigoInicial: `// Crea el type Producto
type Producto = 

// Crea la funcion total
function calcularTotal(productos: Producto[]): number {
  // Implementa
}

const carrito: Producto[] = [
  { nombre: "Libro", precio: 25 },
  { nombre: "Lapiz", precio: 2 },
  { nombre: "Cuaderno", precio: 8 },
];

console.log(calcularTotal(carrito));
`,
      codigoSolucion: `type Producto = {
  nombre: string;
  precio: number;
};

function calcularTotal(productos: Producto[]): number {
  return productos.reduce((total, p) => total + p.precio, 0);
}

const carrito: Producto[] = [
  { nombre: "Libro", precio: 25 },
  { nombre: "Lapiz", precio: 2 },
  { nombre: "Cuaderno", precio: 8 },
];

console.log(calcularTotal(carrito));`,
      tests: [
        {
          descripcion: "calcularTotal retorna 35",
          codigo: `calcularTotal([{nombre:"A",precio:10},{nombre:"B",precio:25}]) === 35`,
        },
        {
          descripcion: "funciona con array vacio",
          codigo: `calcularTotal([]) === 0`,
        },
        {
          descripcion: "Se ejecuto console.log",
          codigo: `__logs.length >= 1`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Type-namer", puntos: 10 },
  },
  {
    id: "type-inference",
    titulo: "Type Inference",
    descripcion: "Como TypeScript adivina los tipos automaticamente.",
    modulo: 1,
    moduloNombre: "Fundamentos",
    orden: 10,
    duracion: "15 min",
    icono: "Code2",
    contenido: `## Type Inference

TypeScript puede adivinar el tipo sin que lo declares. Esto se llama **inferencia de tipos**.

\`\`\`typescript
// TypeScript infiere: string
let nombre = "Ana";

// TypeScript infiere: number
let edad = 25;

// TypeScript infiere: boolean
let activo = true;

// TypeScript infiere: number[]
let numeros = [1, 2, 3];
\`\`\`

## Inferencia en funciones

\`\`\`typescript
// TypeScript infiere el tipo de retorno
function sumar(a: number, b: number) {
  return a + b; // Retorno inferido: number
}

// TypeScript infiere parametros
function saludar(nombre) {
  // Error: Parameter 'nombre' implicitly has an 'any' type
}
\`\`\`

## Inferencia en arrays

\`\`\`typescript
// Infiere: number[]
let nums = [1, 2, 3];

// Para array mixto, se necesita Union type
let mixto = [1, "dos"]; // (string | number)[]
\`\`\`

## Inferencia en objetos

\`\`\`typescript
// TypeScript infiere la forma completa
let persona = {
  nombre: "Ana",
  edad: 25,
  activo: true,
};

// Persona tiene tipo:
// { nombre: string; edad: number; activo: boolean }
\`\`\`

## Cuando NO inferir

\`\`\`typescript
// Mejor ser explicito en:
// 1. Variables vacias
let resultado: string;

// 2. Parametros de funcion
function procesar(dato: string) { }

// 3. Retorno de funciones complejas
function fetchData(): Promise<string[]> { }

// 4. Estado de componentes
let estado: "cargando" | "exito" | "error";
\`\`\`

## as const

Para inferir tipos literales en vez de tipos amplios.

\`\`\`typescript
// Sin as const: tipo es string
let color = "rojo";

// Con as const: tipo es "rojo"
const colorLiteral = "rojo" as const;

// Array como tuple
let punto = [10, 20] as const; // readonly [10, 20]
\`\`\``,
    ejercicio: {
      descripcion: "Sin usar tipos explicitos, deja que TypeScript infiere los tipos. Luego verifica con typeof.",
      codigoInicial: `// Declara estas variables SIN tipo explicito
let nombre = "Ana";
let edad = 25;
let activo = true;
let numeros = [1, 2, 3];

// Verifica los tipos inferidos
console.log(typeof nombre);
console.log(typeof edad);
console.log(typeof activo);
console.log(Array.isArray(numeros));
`,
      codigoSolucion: `let nombre = "Ana";
let edad = 25;
let activo = true;
let numeros = [1, 2, 3];

console.log(typeof nombre);  // "string"
console.log(typeof edad);    // "number"
console.log(typeof activo);  // "boolean"
console.log(Array.isArray(numeros));  // true`,
      tests: [
        {
          descripcion: "nombre es inferido como string",
          codigo: `__code.includes("nombre") && __code.includes(": string") && nombre === "Ana"`,
        },
        {
          descripcion: "edad es inferido como number",
          codigo: `__code.includes("edad") && __code.includes(": number") && edad === 25`,
        },
        {
          descripcion: "activo es inferido como boolean",
          codigo: `__code.includes("activo") && __code.includes(": boolean") && activo === true`,
        },
        {
          descripcion: "numeros es inferido como array",
          codigo: `Array.isArray(numeros) && numeros.length === 3`,
        },
        {
          descripcion: "Se ejecutaron 4 console.log",
          codigo: `__logs.length >= 4`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Inference-master", puntos: 10 },
  },

  // ===== MODULO 2: FUNCIONES =====
  {
    id: "parametros-tipados",
    titulo: "Parametros Tipados",
    descripcion: "Define tipos para los parametros de tus funciones.",
    modulo: 2,
    moduloNombre: "Funciones",
    orden: 1,
    duracion: "15 min",
    icono: "Code2",
    contenido: `## Parametros tipados

En TypeScript, todos los parametros de una funcion deben estar tipados (con \`strict: true\`).

\`\`\`typescript
// Error: Parameter 'nombre' implicitly has an 'any' type
function saludar(nombre) {
  return \`Hola \${nombre}\`;
}

// Correcto
function saludar(nombre: string): string {
  return \`Hola \${nombre}\`;
}
\`\`\`

## Multiples parametros

\`\`\`typescript
function crearUsuario(nombre: string, edad: number, activo: boolean): string {
  return \`\${nombre}, \${edad} anios, activo: \${activo}\`;
}

crearUsuario("Ana", 25, true);
// crearUsuario("Ana", "25", true); // Error: edad debe ser number
\`\`\`

## Parametros con tipos complejos

\`\`\`typescript
interface Punto {
  x: number;
  y: number;
}

function distancia(a: Punto, b: Punto): number {
  return Math.sqrt(
    Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2)
  );
}

distancia({ x: 0, y: 0 }, { x: 3, y: 4 }); // 5
\`\`\`

## Parametros con union types

\`\`\`typescript
function formatearId(id: string | number): string {
  if (__code.includes("id") && __code.includes(": string")) {
    return id.toUpperCase();
  }
  return \`ID-\${id}\`;
}
\`\`\`

## Parametros con tipo any (evitar)

\`\`\`typescript
// MAL: pierde la ventaja de TypeScript
function procesar(dato: any): any {
  return dato;
}

// BIEN: tipo explicito
function procesar<T>(dato: T): T {
  return dato;
}
\`\`\``,
    ejercicio: {
      descripcion: "Crea una funcion 'calcularImpuesto' que reciba el precio (number) y el IVA (number) y retorne el precio con impuesto.",
      codigoInicial: `// Crea la funcion con parametros tipados
function calcularImpuesto(precio: 

// Ejemplo: precio 100, IVA 21 = 121
console.log(calcularImpuesto(100, 21));
`,
      codigoSolucion: `function calcularImpuesto(precio: number, iva: number): number {
  return precio + (precio * iva / 100);
}

console.log(calcularImpuesto(100, 21));`,
      tests: [
        {
          descripcion: "La funcion existe",
          codigo: `typeof calcularImpuesto === "function"`,
        },
        {
          descripcion: "100 con IVA 21 retorna 121",
          codigo: `calcularImpuesto(100, 21) === 121`,
        },
        {
          descripcion: "200 con IVA 10 retorna 220",
          codigo: `calcularImpuesto(200, 10) === 220`,
        },
        {
          descripcion: "Se ejecuto console.log",
          codigo: `__logs.length >= 1`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Param-typed", puntos: 10 },
  },
  {
    id: "tipo-de-retorno",
    titulo: "Tipos de Retorno",
    descripcion: "Define que tipo retorna tu funcion.",
    modulo: 2,
    moduloNombre: "Funciones",
    orden: 2,
    duracion: "15 min",
    icono: "Code2",
    contenido: `## Tipado de retorno

TypeScript puede inferir el tipo de retorno, pero es buena practica ser explicito.

\`\`\`typescript
// Inferido: number
function sumar(a: number, b: number) {
  return a + b;
}

// Explicito: number
function sumar(a: number, b: number): number {
  return a + b;
}
\`\`\`

## Retorno void

Para funciones que no retornan nada.

\`\`\`typescript
function log(mensaje: string): void {
  console.log(mensaje);
}

function guardar(datos: { nombre: string }): void {
  localStorage.setItem("user", JSON.stringify(datos));
}
\`\`\`

## Retorno never

Para funciones que nunca terminan.

\`\`\`typescript
function lanzarError(msg: string): never {
  throw new Error(msg);
}

function loopInfinito(): never {
  while (true) {}
}
\`\`\`

## Retorno Promise

\`\`\`typescript
async function buscarUsuario(id: number): Promise<string> {
  const response = await fetch(\`/api/users/\${id}\`);
  return response.json();
}
\`\`\`

## Retorno tuples

\`\`\`typescript
function divide(a: number, b: number): [number, boolean] {
  if (b === 0) return [0, false];
  return [a / b, true];
}

const [resultado, exito] = divide(10, 2);
\`\`\`

## Por que ser explicito?

\`\`\`typescript
// Sin retorno explicito, TypeScript puede equivocarse
function calcular(a: number, b: number) {
  if (b === 0) return "Error"; // TypeScript piensa que es number | string
  return a / b;
}

// Con retorno explicito, el error se detecta antes
function calcular(a: number, b: number): number {
  // if (b === 0) return "Error"; // Error de tipos!
  return a / b;
}
\`\`\``,
    ejercicio: {
      descripcion: "Crea una funcion que retorne un array con [resultado, exito] al dividir dos numeros.",
      codigoInicial: `// La funcion debe retornar [number, boolean]
function dividir(a: number, b: number): 

// Ejemplo: dividir(10, 2) = [5, true]
// Ejemplo: dividir(10, 0) = [0, false]
console.log(dividir(10, 2));
console.log(dividir(10, 0));
`,
      codigoSolucion: `function dividir(a: number, b: number): [number, boolean] {
  if (b === 0) return [0, false];
  return [a / b, true];
}

console.log(dividir(10, 2));
console.log(dividir(10, 0));`,
      tests: [
        {
          descripcion: "dividir(10, 2) retorna [5, true]",
          codigo: `JSON.stringify(dividir(10, 2)) === JSON.stringify([5, true])`,
        },
        {
          descripcion: "dividir(10, 0) retorna [0, false]",
          codigo: `JSON.stringify(dividir(10, 0)) === JSON.stringify([0, false])`,
        },
        {
          descripcion: "Se ejecutaron 2 console.log",
          codigo: `__logs.length >= 2`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Return-master", puntos: 10 },
  },
  {
    id: "opcionales-default",
    titulo: "Parametros Opcionales y Default",
    descripcion: "Parametros que no son obligatorios.",
    modulo: 2,
    moduloNombre: "Funciones",
    orden: 3,
    duracion: "15 min",
    icono: "Code2",
    contenido: `## Parametros opcionales

Usa \`?\` para marcar un parametro como opcional.

\`\`\`typescript
function saludar(nombre: string, saludo?: string): string {
  return \`\${saludo || "Hola"}, \${nombre}!\`;
}

saludar("Ana");          // "Hola, Ana!"
saludar("Ana", "Buenos dias"); // "Buenos dias, Ana!"
\`\`\`

> **Regla:** Los opcionales siempre van al final.

## Parametros con valor default

\`\`\`typescript
function crearUsuario(
  nombre: string,
  rol: string = "usuario",
  activo: boolean = true
): string {
  return \`\${nombre} - \${rol} - activo: \${activo}\`;
}

crearUsuario("Ana");                    // "Ana - usuario - activo: true"
crearUsuario("Juan", "admin");          // "Juan - admin - activo: true"
crearUsuario("Pedro", "editor", false); // "Pedro - editor - activo: false"
\`\`\`

## Default con expresiones

\`\`\`typescript
function generarId(prefijo: string = "id"): string {
  return \`\${prefijo}-\${Date.now()}\`;
}

function obtenerFecha(formato: string = "es-ES"): string {
  return new Date().toLocaleDateString(formato);
}
\`\`\`

## Opcionales vs Default

\`\`\`typescript
// Opcional: puede ser undefined
function buscar(query: string, limite?: number): string[] {
  // limite es number | undefined
  const max = limite ?? 10; // Default manual
  return [];
}

// Default: siempre tiene valor
function buscar(query: string, limite: number = 10): string[] {
  // limite es number
  return [];
}
\`\`\``,
    ejercicio: {
      descripcion: "Crea una funcion 'crearMensaje' con autor (requerido), asunto (opcional) y prioridad (default 'normal').",
      codigoInicial: `// Crea la funcion
function crearMensaje(
  // Implementa los parametros

)

console.log(crearMensaje("Ana"));
console.log(crearMensaje("Juan", "Urgente"));
console.log(crearMensaje("Pedro", "Info", "alta"));
`,
      codigoSolucion: `function crearMensaje(
  autor: string,
  asunto?: string,
  prioridad: string = "normal"
): string {
  return \`De: \${autor}, Asunto: \${asunto || "Sin asunto"}, Prioridad: \${prioridad}\`;
}

console.log(crearMensaje("Ana"));
console.log(crearMensaje("Juan", "Urgente"));
console.log(crearMensaje("Pedro", "Info", "alta"));`,
      tests: [
        {
          descripcion: "crearMensaje('Ana') usa defaults",
          codigo: `crearMensaje("Ana").includes("Sin asunto") && crearMensaje("Ana").includes("normal")`,
        },
        {
          descripcion: "crearMensaje('Juan', 'Urgente') usa asunto",
          codigo: `crearMensaje("Juan", "Urgente").includes("Urgente")`,
        },
        {
          descripcion: "crearMensaje('Pedro', 'Info', 'alta') usa prioridad",
          codigo: `crearMensaje("Pedro", "Info", "alta").includes("alta")`,
        },
        {
          descripcion: "Se ejecutaron 3 console.log",
          codigo: `__logs.length >= 3`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Default-master", puntos: 10 },
  },
  {
    id: "rest-parameters",
    titulo: "Rest Parameters",
    descripcion: "Recibe un numero indefinido de argumentos.",
    modulo: 2,
    moduloNombre: "Funciones",
    orden: 4,
    duracion: "15 min",
    icono: "Code2",
    contenido: `## Rest parameters

Usa \`...\` para recibir multiples argumentos como un array.

\`\`\`typescript
function sumar(...numeros: number[]): number {
  return numeros.reduce((total, n) => total + n, 0);
}

sumar(1, 2, 3);       // 6
sumar(1, 2, 3, 4, 5); // 15
\`\`\`

## Con otros parametros

\`\`\`typescript
function crearMensaje(prefijo: string, ...mensajes: string[]): string {
  return \`\${prefijo}: \${mensajes.join(", ")}\`;
}

crearMensaje("Error", "Conexion", "Timeout");
// "Error: Conexion, Timeout"
\`\`\`

## Spread vs Rest

\`\`\`typescript
// REST: recibe argumentos como array
function sumar(...nums: number[]): number {
  return nums.reduce((a, b) => a + b, 0);
}

// SPREAD: expande un array como argumentos
const numeros = [1, 2, 3];
sumar(...numeros); // sumar(1, 2, 3)
\`\`\`

## Ejemplo practico

\`\`\`typescript
interface Producto {
  nombre: string;
  precio: number;
}

function calcularTotal(...productos: Producto[]): number {
  return productos.reduce((total, p) => total + p.precio, 0);
}

function log(...items: (string | number)[]): void {
  console.log(items.join(" | "));
}

log("Inicio", 1, "Medio", 2, "Fin");
// "Inicio | 1 | Medio | 2 | Fin"
\`\`\``,
    ejercicio: {
      descripcion: "Crea una funcion 'promedio' que reciba cualquier cantidad de numeros y retorne el promedio.",
      codigoInicial: `// Crea la funcion con rest parameters
function promedio(...numeros: 

// Ejemplo: promedio(10, 20, 30) = 20
console.log(promedio(10, 20, 30));
console.log(promedio(5, 5, 5, 5));
`,
      codigoSolucion: `function promedio(...numeros: number[]): number {
  if (numeros.length === 0) return 0;
  const suma = numeros.reduce((total, n) => total + n, 0);
  return suma / numeros.length;
}

console.log(promedio(10, 20, 30));
console.log(promedio(5, 5, 5, 5));`,
      tests: [
        {
          descripcion: "promedio(10, 20, 30) retorna 20",
          codigo: `promedio(10, 20, 30) === 20`,
        },
        {
          descripcion: "promedio(5, 5, 5, 5) retorna 5",
          codigo: `promedio(5, 5, 5, 5) === 5`,
        },
        {
          descripcion: "promedio() con 0 args retorna 0",
          codigo: `promedio() === 0`,
        },
        {
          descripcion: "Se ejecutaron 2 console.log",
          codigo: `__logs.length >= 2`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Rest-master", puntos: 10 },
  },
  {
    id: "function-overloads",
    titulo: "Function Overloads",
    descripcion: "Multiples firmas para una misma funcion.",
    modulo: 2,
    moduloNombre: "Funciones",
    orden: 5,
    duracion: "15 min",
    icono: "Code2",
    contenido: `## Function Overloads

Permite definir multiples firmas para una funcion, con diferentes tipos de parametros y retorno.

\`\`\`typescript
// Firmas de overload
function format(valor: string): string;
function format(valor: number): string;
function format(valor: string | number): string {
  if (__code.includes("valor") && __code.includes(": string")) {
    return valor.toUpperCase();
  }
  return valor.toFixed(2);
}

format("hola");    // "HOLA" (retorna string)
format(3.14);      // "3.14" (retorna string)
\`\`\`

## Cuando usar overloads

### Diferentes tipos de retorno

\`\`\`typescript
function buscar(id: number): Usuario;
function buscar(nombre: string): Usuario[];
function buscar(param: number | string): Usuario | Usuario[] {
  if (__code.includes("param") && __code.includes(": number")) {
    return { id: param, nombre: "Ana" };
  }
  return [{ id: 1, nombre: param }];
}

const usuario = buscar(1);           // Usuario
const usuarios = buscar("Ana");      // Usuario[]
\`\`\`

### Diferente cantidad de argumentos

\`\`\`typescript
function crear(nombre: string): void;
function crear(nombre: string, edad: number): void;
function crear(nombre: string, edad?: number): void {
  if (edad !== undefined) {
    console.log(\`Crear \${nombre}, \${edad} anios\`);
  } else {
    console.log(\`Crear \${nombre}\`);
  }
}

crear("Ana");        // OK
crear("Juan", 25);   // OK
\`\`\`

## Limitaciones

\`\`\`typescript
// Los overloads deben ser compatibles con la implementacion
function proceso(x: string): string;
function proceso(x: number): number;
function proceso(x: string | number): string | number {
  // La implementacion debe manejar ambos casos
  return x;
}

// No se puede sobrecargar con diferentes cantidades de opcionales
// TypeScript no permite overloads con parametros por defecto
\`\`\``,
    ejercicio: {
      descripcion: "Crea una funcion 'obtener' que acepte un number (id) o string (nombre) y retorne相应的 informacion.",
      codigoInicial: `// Define los overloads
function obtener(id: number): string;
function obtener(nombre: string): string;
function obtener(param: 

// Implementa la funcion
{
  // ...
}

console.log(obtener(1));
console.log(obtener("Ana"));
`,
      codigoSolucion: `function obtener(id: number): string;
function obtener(nombre: string): string;
function obtener(param: number | string): string {
  if (__code.includes("param") && __code.includes(": number")) {
    return \`Usuario ID: \${param}\`;
  }
  return \`Usuario: \${param}\`;
}

console.log(obtener(1));
console.log(obtener("Ana"));`,
      tests: [
        {
          descripcion: "obtener(1) retorna string con ID",
          codigo: `obtener(1).includes("1")`,
        },
        {
          descripcion: "obtener('Ana') retorna string con nombre",
          codigo: `obtener("Ana").includes("Ana")`,
        },
        {
          descripcion: "Se ejecutaron 2 console.log",
          codigo: `__logs.length >= 2`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Overload-pro", puntos: 10 },
  },

  // ===== MODULO 3: INTERFACES Y CLASES =====
  {
    id: "interfaces-basicas",
    titulo: "Interfaces Basicas (Repaso Profundo)",
    descripcion: "Propiedades opcionales, readonly, indices y firmas de llamada.",
    modulo: 3,
    moduloNombre: "Interfaces y Clases",
    orden: 1,
    duracion: "20 min",
    icono: "Layers",
    contenido: `## Repaso de Interfaces

Una interface define la **forma** de un objeto. Es como un contrato que el objeto debe cumplir.

\`\`\`typescript
interface Usuario {
  id: number;
  nombre: string;
  email: string;
}

const user: Usuario = {
  id: 1,
  nombre: "Ana",
  email: "ana@mail.com",
};
\`\`\`

## Propiedades opcionales

Usa \`?\` para propiedades que pueden no existir.

\`\`\`typescript
interface Perfil {
  nombre: string;
  bio?: string;      // Opcional
  website?: string;  // Opcional
}

const perfil: Perfil = { nombre: "Ana" }; // OK
\`\`\`

## Propiedades readonly

No pueden ser modificadas despues de la creacion.

\`\`\`typescript
interface Config {
  readonly apiUrl: string;
  readonly version: number;
}

const config: Config = { apiUrl: "https://api.com", version: 1 };
// config.apiUrl = "otra"; // Error: readonly
\`\`\`

## Index signatures

Para objetos con propiedades dinamicas.

\`\`\`typescript
interface Diccionario {
  [clave: string]: string;
}

const traducciones: Diccionario = {
  hello: "hola",
  goodbye: "adios",
};

// Puedes agregar mas claves
traducciones["thanks"] = "gracias";
\`\`\`

## Firmas de llamada

Para objetos que son funciones.

\`\`\`typescript
interface FuncionConNombre {
  (x: number, y: number): number;
  descripcion: string;
}

const sumar: FuncionConNombre = Object.assign(
  (x: number, y: number) => x + y,
  { descripcion: "Suma dos numeros" }
);

sumar(1, 2);              // 3
sumar.descripcion;         // "Suma dos numeros"
\`\`\`

## Interfaces con tipos complejos

\`\`\`typescript
interface Empresa {
  nombre: string;
  empleados: Empleado[];
  direccion: {
    calle: string;
    ciudad: string;
  };
}

interface Empleado {
  nombre: string;
  cargo: string;
}
\`\`\``,
    ejercicio: {
      descripcion: "Crea una interface 'Producto' con id (readonly), nombre, precio y opciones (diccionario).",
      codigoInicial: `// Crea la interface
interface Producto {
  // Implementa
}

// Crea un producto
const laptop: Producto = 

console.log(laptop);
`,
      codigoSolucion: `interface Producto {
  readonly id: number;
  nombre: string;
  precio: number;
  opciones?: { [clave: string]: string };
}

const laptop: Producto = {
  id: 1,
  nombre: "Laptop",
  precio: 999,
  opciones: { color: "gris", ram: "16GB" },
};

console.log(laptop);`,
      tests: [
        {
          descripcion: "laptop tiene id (readonly)",
          codigo: `"id" in laptop`,
        },
        {
          descripcion: "laptop tiene nombre",
          codigo: `"nombre" in laptop`,
        },
        {
          descripcion: "laptop tiene precio",
          codigo: `"precio" in laptop`,
        },
        {
          descripcion: "Se ejecuto console.log",
          codigo: `__logs.length >= 1`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Interface-pro", puntos: 10 },
  },
  {
    id: "extends-herencia",
    titulo: "Herencia con Extends",
    descripcion: "Interfaces y clases que extienden de otras.",
    modulo: 3,
    moduloNombre: "Interfaces y Clases",
    orden: 2,
    duracion: "15 min",
    icono: "Layers",
    contenido: `## Extends en Interfaces

Una interface puede heredar de otra usando \`extends\`.

\`\`\`typescript
interface Animal {
  nombre: string;
  edad: number;
}

interface Perro extends Animal {
  raza: string;
  ladra: boolean;
}

const miPerro: Perro = {
  nombre: "Rex",
  edad: 5,
  raza: "Labrador",
  ladra: true,
};
\`\multiples extends

\`\`\`typescript
interface Volador {
  volar(): void;
}

interface Nadador {
  nadar(): void;
}

interface Pato extends Volador, Nadador {
  nombre: string;
}

const pato: Pato = {
  nombre: "Donald",
  volar: () => console.log("Volando"),
  nadar: () => console.log("Nadando"),
};
\`\`\`

## Extends en Clases

\`\`\`typescript
class Animal {
  nombre: string;
  constructor(nombre: string) {
    this.nombre = nombre;
  }
  hacerSonido(): string {
    return "...";
  }
}

class Perro extends Animal {
  raza: string;
  constructor(nombre: string, raza: string) {
    super(nombre);
    this.raza = raza;
  }
  hacerSonido(): string {
    return "Guau!";
  }
}

const perro = new Perro("Rex", "Labrador");
perro.hacerSonido(); // "Guau!"
\`\`\`

## Override de metodos

\`\`\`typescript
class Forma {
  area(): number {
    return 0;
  }
}

class Circulo extends Forma {
  constructor(private radio: number) {
    super();
  }
  area(): number {
    return Math.PI * this.radio ** 2;
  }
}

class Rectangulo extends Forma {
  constructor(private ancho: number, private alto: number) {
    super();
  }
  area(): number {
    return this.ancho * this.alto;
  }
}
\`\`\``,
    ejercicio: {
      descripcion: "Crea una interface Vehiculo y una interface Electrica que extienda de ella.",
      codigoInicial: `// Crea Vehiculo
interface Vehiculo {
  // marca, modelo, anio
}

// Crea Electrica que extienda de Vehiculo
interface Electrica extends Vehiculo {
  // bateria (number), autonomia (number)
}

// Crea un coche electrico
const tesla: Electrica = 

console.log(tesla);
`,
      codigoSolucion: `interface Vehiculo {
  marca: string;
  modelo: string;
  anio: number;
}

interface Electrica extends Vehiculo {
  bateria: number;
  autonomia: number;
}

const tesla: Electrica = {
  marca: "Tesla",
  modelo: "Model 3",
  anio: 2024,
  bateria: 75,
  autonomia: 500,
};

console.log(tesla);`,
      tests: [
        {
          descripcion: "tesla tiene propiedades de Vehiculo",
          codigo: `"marca" in tesla && "modelo" in tesla && "anio" in tesla`,
        },
        {
          descripcion: "tesla tiene propiedades de Electrica",
          codigo: `"bateria" in tesla && "autonomia" in tesla`,
        },
        {
          descripcion: "Se ejecuto console.log",
          codigo: `__logs.length >= 1`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Extends-master", puntos: 10 },
  },
  {
    id: "clases-en-ts",
    titulo: "Clases en TypeScript",
    descripcion: "Definicion, constructores, metodos y propiedades.",
    modulo: 3,
    moduloNombre: "Interfaces y Clases",
    orden: 3,
    duracion: "20 min",
    icono: "Layers",
    contenido: `## Definicion basica

\`\`\`typescript
class Persona {
  nombre: string;
  edad: number;

  constructor(nombre: string, edad: number) {
    this.nombre = nombre;
    this.edad = edad;
  }

  presentarse(): string {
    return \`Hola, soy \${nombre} y tengo \${edad} anios\`;
  }
}

const ana = new Persona("Ana", 25);
ana.presentarse(); // "Hola, soy Ana y tengo 25 anios"
\`\`\`

## Shorthand de constructor

TypeScript permite declarar propiedades directamente en el constructor.

\`\`\`typescript
class Persona {
  constructor(
    public nombre: string,
    public edad: number,
    private email: string
  ) {}
}

// Equivale a declarar las propiedades + asignar en constructor
\`\`\`

## Metodos

\`\`\`typescript
class Calculadora {
  resultado: number = 0;

  sumar(n: number): Calculadora {
    this.resultado += n;
    return this; // Para chaining
  }

  restar(n: number): Calculadora {
    this.resultado -= n;
    return this;
  }

  obtener(): number {
    return this.resultado;
  }
}

const calc = new Calculadora();
calc.sumar(5).sumar(3).restar(2);
calc.obtener(); // 6
\`\`\`

## Propiedades estaticas y metodos

\`\`\`typescript
class Contador {
  static total: number = 0;

  constructor(public nombre: string) {
    Contador.total++;
  }

  static getTotal(): number {
    return Contador.total;
  }
}

new Contador("A");
new Contador("B");
Contador.getTotal(); // 2
\`\`\`

## Getters y Setters

\`\`\`typescript
class Temperatura {
  private _celsius: number;

  constructor(celsius: number) {
    this._celsius = celsius;
  }

  get fahrenheit(): number {
    return this._celsius * 9/5 + 32;
  }

  set celsius(valor: number) {
    if (valor < -273.15) throw new Error("Temperatura invalida");
    this._celsius = valor;
  }
}

const temp = new Temperatura(100);
temp.fahrenheit; // 212
temp.celsius = 0;
\`\`\``,
    ejercicio: {
      descripcion: "Crea una clase 'Cuenta' con titular, saldo, y metodos depositar y extraer.",
      codigoInicial: `// Crea la clase Cuenta
class Cuenta {
  // Implementa

}

const cuenta = new Cuenta("Ana", 1000);
cuenta.depositar(500);
cuenta.extraer(200);
console.log(cuenta.obtenerSaldo());
`,
      codigoSolucion: `class Cuenta {
  constructor(
    public titular: string,
    private saldo: number
  ) {}

  depositar(monto: number): void {
    this.saldo += monto;
  }

  extraer(monto: number): void {
    if (monto > this.saldo) {
      throw new Error("Saldo insuficiente");
    }
    this.saldo -= monto;
  }

  obtenerSaldo(): number {
    return this.saldo;
  }
}

const cuenta = new Cuenta("Ana", 1000);
cuenta.depositar(500);
cuenta.extraer(200);
console.log(cuenta.obtenerSaldo());`,
      tests: [
        {
          descripcion: "cuenta.titular es 'Ana'",
          codigo: `cuenta.titular === "Ana"`,
        },
        {
          descripcion: "saldo despues de operaciones es 1300",
          codigo: `cuenta.obtenerSaldo() === 1300`,
        },
        {
          descripcion: "Se ejecuto console.log",
          codigo: `__logs.length >= 1`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Class-builder", puntos: 10 },
  },
  {
    id: "access-modifiers",
    titulo: "Modificadores de Acceso",
    descripcion: "public, private, protected y su uso.",
    modulo: 3,
    moduloNombre: "Interfaces y Clases",
    orden: 4,
    duracion: "15 min",
    icono: "Layers",
    contenido: `## public (por defecto)

Accesible desde cualquier lugar.

\`\`\`typescript
class Animal {
  nombre: string; // public por defecto
}

const a = new Animal();
a.nombre; // OK
\`\`\`

## private

Solo accesible dentro de la misma clase.

\`\`\`typescript
class Cuenta {
  private saldo: number;

  constructor(saldo: number) {
    this.saldo = saldo;
  }

  // Solo se puede acceder via metodos
  depositar(monto: number): void {
    this.saldo += monto; // OK: dentro de la clase
  }
}

const c = new Cuenta(100);
// c.saldo; // Error: private
c.depositar(50); // OK
\`\`\`

## protected

Accesible en la clase y subclases.

\`\`\`typescript
class Animal {
  protected energia: number = 100;

  comer(comida: number): void {
    this.energia += comida;
  }
}

class Perro extends Animal {
  ladrar(): void {
    this.energia -= 10; // OK: es protected
  }
}

const perro = new Perro();
// perro.energia; // Error: protected
\`\`\`

## Resumen

| Modificador | Clase | Subclase | Externo |
|-------------|-------|----------|---------|
| public | SI | SI | SI |
| private | SI | NO | NO |
| protected | SI | SI | NO |

## Parametros de propiedades

\`\`\`typescript
class Usuario {
  constructor(
    public nombre: string,       // public
    private password: string,    // private
    protected rol: string        // protected
  ) {}
}

// Equivale a:
class Usuario {
  nombre: string;
  private password: string;
  protected rol: string;

  constructor(nombre: string, password: string, rol: string) {
    this.nombre = nombre;
    this.password = password;
    this.rol = rol;
  }
}
\`\`\``,
    ejercicio: {
      descripcion: "Crea una clase 'Banco' con cuenta privada, y metodos publicos para operar.",
      codigoInicial: `// Crea la clase Banco
class Banco {
  // saldo privado
  // Constructo con saldo inicial
  // Metodos publicos: depositar, extraer, consultar
}

const banco = new Banco(1000);
banco.depositar(500);
banco.extraer(200);
console.log(banco.consultar());
`,
      codigoSolucion: `class Banco {
  private saldo: number;

  constructor(saldoInicial: number) {
    this.saldo = saldoInicial;
  }

  depositar(monto: number): void {
    this.saldo += monto;
  }

  extraer(monto: number): void {
    if (monto > this.saldo) throw new Error("Fondos insuficientes");
    this.saldo -= monto;
  }

  consultar(): number {
    return this.saldo;
  }
}

const banco = new Banco(1000);
banco.depositar(500);
banco.extraer(200);
console.log(banco.consultar());`,
      tests: [
        {
          descripcion: "consultar retorna 1300",
          codigo: `banco.consultar() === 1300`,
        },
        {
          descripcion: "depositar funciona correctamente",
          codigo: `(() => { banco.depositar(100); const r = banco.consultar(); banco.extraer(100); return r === 1400; })()`,
        },
        {
          descripcion: "Se ejecuto console.log",
          codigo: `__logs.length >= 1`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Access-guard", puntos: 10 },
  },
  {
    id: "abstract-classes",
    titulo: "Clases Abstractas",
    descripcion: "Clases que no se instancian, solo se heredan.",
    modulo: 3,
    moduloNombre: "Interfaces y Clases",
    orden: 5,
    duracion: "15 min",
    icono: "Layers",
    contenido: `## Clases abstractas

Una clase abstracta no se puede instanciar directamente. Sirve como base para otras clases.

\`\`\`typescript
abstract class Forma {
  abstract area(): number; // Obligatoria en subclases

  descripcion(): string {
    return \`Area: \${this.area()}\`;
  }
}

// const f = new Forma(); // Error: Cannot create instance of abstract class

class Circulo extends Forma {
  constructor(private radio: number) {
    super();
  }
  area(): number {
    return Math.PI * this.radio ** 2;
  }
}

class Rectangulo extends Forma {
  constructor(private ancho: number, private alto: number) {
    super();
  }
  area(): number {
    return this.ancho * this.alto;
  }
}
\`\`\`

## Metodos abstractos

\`\`\`typescript
abstract class Animal {
  abstract hacerSonido(): string; // Obligatoria
  abstract movimiento(): string;  // Obligatoria

  describir(): string {
    return \`\${this.hacerSonido()} y se mueve \${this.movimiento()}\`;
  }
}

class Gato extends Animal {
  hacerSonido(): string { return "Miau"; }
  movimiento(): string { return "salta"; }
}

class Pato extends Animal {
  hacerSonido(): string { return "Cuac"; }
  movimiento(): string { return "nada y vuela"; }
}
\`\`\`

## Quando usar abstract vs interface

\`\`\`typescript
// Interface: solo define la forma
interface Volador {
  volar(): void;
}

// Clase abstract: puede tener implementacion
abstract class Transporte {
  protected velocidad: number = 0;

  abstract arrancar(): void;

  frenar(): void {
    this.velocidad = 0;
  }

  getVelocidad(): number {
    return this.velocidad;
  }
}
\`\`\`

## Patron Template Method

\`\`\`typescript
abstract class Proceso {
  // Template method
  ejecutar(): void {
    this.iniciar();
    this.procesar();
    this.finalizar();
  }

  abstract iniciar(): void;
  abstract procesar(): void;

  finalizar(): void {
    console.log("Proceso completado");
  }
}

class ProcesoCSV extends Proceso {
  iniciar() { console.log("Leyendo CSV"); }
  procesar() { console.log("Parseando datos"); }
}
\`\`\``,
    ejercicio: {
      descripcion: "Crea una clase abstracta 'Figura' y dos subclases 'Cuadrado' y 'Triangulo'.",
      codigoInicial: `// Crea la clase abstracta Figura
abstract class Figura {
  // abstract area(): number
  // metodo describir() que retorne "Area: X"
}

// Crea Cuadrado que extienda Figura
class Cuadrado extends Figura {
  // constructor con lado
}

// Crea Triangulo que extienda Figura
class Triangulo extends Figura {
  // constructor con base y altura
}

const cuadrado = new Cuadrado(5);
const triangulo = new Triangulo(4, 6);
console.log(cuadrado.describir());
console.log(triangulo.describir());
`,
      codigoSolucion: `abstract class Figura {
  abstract area(): number;

  describir(): string {
    return \`Area: \${this.area()}\`;
  }
}

class Cuadrado extends Figura {
  constructor(private lado: number) {
    super();
  }
  area(): number {
    return this.lado * this.lado;
  }
}

class Triangulo extends Figura {
  constructor(private base: number, private altura: number) {
    super();
  }
  area(): number {
    return (this.base * this.altura) / 2;
  }
}

const cuadrado = new Cuadrado(5);
const triangulo = new Triangulo(4, 6);
console.log(cuadrado.describir());
console.log(triangulo.describir());`,
      tests: [
        {
          descripcion: "cuadrado.area() retorna 25",
          codigo: `cuadrado.area() === 25`,
        },
        {
          descripcion: "triangulo.area() retorna 12",
          codigo: `triangulo.area() === 12`,
        },
        {
          descripcion: "describir funciona",
          codigo: `cuadrado.describir().includes("25")`,
        },
        {
          descripcion: "Se ejecutaron 2 console.log",
          codigo: `__logs.length >= 2`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Abstract-artist", puntos: 10 },
  },

  // ===== MODULO 4: TIPOS AVANZADOS =====
  {
    id: "generics",
    titulo: "Generics",
    descripcion: "Crea componentes reutilizables con tipos flexibles.",
    modulo: 4,
    moduloNombre: "Tipos Avanzados",
    orden: 1,
    duracion: "20 min",
    icono: "Zap",
    contenido: `## Que son los Generics?

Los generics permiten crear funcioness, clases e interfaces que funcionan con **cualquier tipo** sin perder la seguridad de tipos.

\`\`\`typescript
// Sin generics: perdes tipo
function primerElemento(arr: any[]): any {
  return arr[0];
}

// Con generics: mantenes tipo
function primerElemento<T>(arr: T[]): T {
  return arr[0];
}

const num = primerElemento([1, 2, 3]);     // number
const str = primerElemento(["a", "b"]);   // string
\`\`\`

## Multiples tipos

\`\`\`typescript
function intercambiar<A, B>(a: A, b: B): [B, A] {
  return [b, a];
}

const [x, y] = intercambiar(1, "hello"); // [string, number]
\`\`\`

## Constraints

\`\`\`typescript
// Asegurar que T tiene ciertas propiedades
function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}

longest("hola", "adios");     // "hola"
longest([1, 2], [1, 2, 3]);   // [1, 2, 3]
\`\`\`

## Generics en interfaces

\`\`\`typescript
interface Respuesta<T> {
  datos: T;
  exito: boolean;
  mensaje: string;
}

const res1: Respuesta<string> = { datos: "OK", exito: true, mensaje: "" };
const res2: Respuesta<number[]> = { datos: [1, 2], exito: true, mensaje: "" };
\`\`\`

## Generics en clases

\`\`\`typescript
class Caja<T> {
  contenido: T;

  constructor(contenido: T) {
    this.contenido = contenido;
  }

  obtener(): T {
    return this.contenido;
  }
}

const cajaNum = new Caja<number>(42);
const cajaStr = new Caja<string>("hola");
\`\`\`

## Generics con defaults

\`\`\`typescript
function crearPila<T = string>(): T[] {
  return [];
}

const pila = crearPila();      // string[]
const pilaNum = crearPila<number>(); // number[]
\`\`\``,
    ejercicio: {
      descripcion: "Crea una funcion generica 'filtrar' que retorne solo los elementos que cumplan una condicion.",
      codigoInicial: `// Crea la funcion generica
function filtrar<T>(arr: T[], condicion: 

// Ejemplo: filtrar numeros pares
const pares = filtrar([1, 2, 3, 4, 5, 6], n => n % 2 === 0);
console.log(pares);
`,
      codigoSolucion: `function filtrar<T>(arr: T[], condicion: (item: T) => boolean): T[] {
  return arr.filter(condicion);
}

const pares = filtrar([1, 2, 3, 4, 5, 6], n => n % 2 === 0);
console.log(pares);`,
      tests: [
        {
          descripcion: "filtra numeros pares correctamente",
          codigo: `JSON.stringify(filtrar([1,2,3,4,5,6], n => n % 2 === 0)) === JSON.stringify([2,4,6])`,
        },
        {
          descripcion: "filtra strings largos",
          codigo: `filtrar(["a","bb","ccc"], s => s.length > 1).length === 2`,
        },
        {
          descripcion: "Se ejecuto console.log",
          codigo: `__logs.length >= 1`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Generic-hero", puntos: 10 },
  },
  {
    id: "utility-types",
    titulo: "Utility Types",
    descripcion: "Tipos integrados de TypeScript para transformar tipos.",
    modulo: 4,
    moduloNombre: "Tipos Avanzados",
    orden: 2,
    duracion: "20 min",
    icono: "Zap",
    contenido: `## Utility Types

TypeScript tiene tipos integrados que transforman otros tipos.

## Partial<T>

Hace todas las propiedades opcionales.

\`\`\`typescript
interface Usuario {
  nombre: string;
  email: string;
  edad: number;
}

// Todas opcionales
type UsuarioParcial = Partial<Usuario>;

const updates: UsuarioParcial = { nombre: "Ana" }; // OK
\`\`\`

## Required<T>

Hace todas las propiedades obligatorias.

\`\`\`typescript
type ConfigOpcional = {
  host?: string;
  port?: number;
};

type Config = Required<ConfigOpcional>;
// { host: string; port: number; }
\`\`\`

## Pick<T, K>

Selecciona propiedades especificas.

\`\`\`typescript
interface Usuario {
  id: number;
  nombre: string;
  email: string;
  password: string;
}

type UsuarioBasico = Pick<Usuario, "nombre" | "email">;
// { nombre: string; email: string; }
\`\`\`

## Omit<T, K>

Excluye propiedades especificas.

\`\`\`typescript
type UsuarioSinPassword = Omit<Usuario, "password">;
// { id: number; nombre: string; email: string; }
\`\`\`

## Record<K, V>

Crea un objeto con claves de tipo K y valores de tipo V.

\`\`\`typescript
type Roles = "admin" | "usuario" | "invitado";
type Permisos = Record<Roles, string[]>;

const permisos: Permisos = {
  admin: ["leer", "escribir", "eliminar"],
  usuario: ["leer", "escribir"],
  invitado: ["leer"],
};
\`\`\`

## Readonly<T>

Hace todas las propiedades readonly.

\`\`\`typescript
type UsuarioReadonly = Readonly<Usuario>;
// Todas las propiedades son readonly
\`\`\`

## ReturnType<T>

Obtiene el tipo de retorno de una funcion.

\`\`\`typescript
function sumar(a: number, b: number) {
  return a + b;
}

type Resultado = ReturnType<typeof sumar>; // number
\`\`\`

## Parameters<T>

Obtiene los tipos de los parametros.

\`\`\`typescript
type ParamsSumar = Parameters<typeof sumar>; // [number, number]
\`\`\`

## Resumen rapido

| Utility | Que hace |
|---------|----------|
| Partial | Todas opcionales |
| Required | Todas obligatorias |
| Pick | Selecciona propiedades |
| Omit | Excluye propiedades |
| Record | Objeto tipado |
| Readonly | Todas readonly |
| ReturnType | Tipo de retorno |
| Parameters | Tipos de parametros |`,
    ejercicio: {
      descripcion: "Usa utility types para crear un tipo 'UpdateUser' que solo permita nombre y email opcionales.",
      codigoInicial: `interface Usuario {
  id: number;
  nombre: string;
  email: string;
  password: string;
}

// Crea UpdateUser usando Pick y Partial
type UpdateUser = 

const updates: UpdateUser = { nombre: "Ana" };
console.log(updates);
`,
      codigoSolucion: `interface Usuario {
  id: number;
  nombre: string;
  email: string;
  password: string;
}

type UpdateUser = Partial<Pick<Usuario, "nombre" | "email">>;

const updates: UpdateUser = { nombre: "Ana" };
console.log(updates);`,
      tests: [
        {
          descripcion: "updates tiene nombre",
          codigo: `"nombre" in updates`,
        },
        {
          descripcion: "updates no tiene id",
          codigo: `!("id" in updates)`,
        },
        {
          descripcion: "Se ejecuto console.log",
          codigo: `__logs.length >= 1`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Utility-user", puntos: 10 },
  },
  {
    id: "mapped-types",
    titulo: "Mapped Types",
    descripcion: "Transforma tipos iterando sobre sus propiedades.",
    modulo: 4,
    moduloNombre: "Tipos Avanzados",
    orden: 3,
    duracion: "15 min",
    icono: "Zap",
    contenido: `## Mapped Types

Permiten crear nuevos tipos iterando sobre las propiedades de uno existente.

\`\`\`typescript
type MiPartial<T> = {
  [K in keyof T]?: T[K];
};

interface Usuario {
  nombre: string;
  edad: number;
}

type UsuarioParcial = MiPartial<Usuario>;
// { nombre?: string; edad?: number; }
\`\`\`

## Sintaxis basica

\`\`\`typescript
type NombreTypes<T> = {
  [K in keyof T]: string;
};

// Todas las propiedades se vuelven string
type Nombres = NombreTypes<Usuario>;
// { nombre: string; edad: string; }
\`\`\`

## Modificadores en Mapped Types

\`\`\`typescript
// Agregar readonly
type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};

// Eliminar readonly
type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};

// Agregar opcional
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};
\`\`\`

## Ejemplo practico

\`\`\`typescript
interface Config {
  apiUrl: string;
  timeout: number;
  debug: boolean;
}

// Crear version con solo strings
type ConfigStrings = {
  [K in keyof Config]: string;
};
// { apiUrl: string; timeout: string; debug: string; }

// Crear version con valores por defecto
type ConfigDefaults = {
  [K in keyof Config]: Config[K] | undefined;
};
\`\`\`

## Con tipos condicionales

\`\`\`typescript
type NullableStrings<T> = {
  [K in keyof T]: T[K] extends string ? T[K] | null : T[K];
};
\`\`\``,
    ejercicio: {
      descripcion: "Crea un mapped type que convierta todas las propiedades de un objeto a boolean.",
      codigoInicial: `interface Estados {
  cargando: string;
  exito: string;
  error: string;
}

// Crea un type que haga todas las propiedades boolean
type BooleanFlags = {
  // Implementa
};

const flags: BooleanFlags = {
  cargando: true,
  exito: false,
  error: false,
};

console.log(flags);
`,
      codigoSolucion: `interface Estados {
  cargando: string;
  exito: string;
  error: string;
}

type BooleanFlags = {
  [K in keyof Estados]: boolean;
};

const flags: BooleanFlags = {
  cargando: true,
  exito: false,
  error: false,
};

console.log(flags);`,
      tests: [
        {
          descripcion: "flags.cargando es boolean",
          codigo: `typeof flags.cargando === "boolean"`,
        },
        {
          descripcion: "flags tiene 3 propiedades",
          codigo: `Object.keys(flags).length === 3`,
        },
        {
          descripcion: "Se ejecuto console.log",
          codigo: `__logs.length >= 1`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Mapped-master", puntos: 10 },
  },
  {
    id: "conditional-types",
    titulo: "Conditional Types",
    descripcion: "Tipos que dependen de condiciones.",
    modulo: 4,
    moduloNombre: "Tipos Avanzados",
    orden: 4,
    duracion: "15 min",
    icono: "Zap",
    contenido: `## Conditional Types

Los tipos condicionales crean tipos basados en condiciones.

\`\`\`typescript
type EsString<T> = T extends string ? "si" : "no";

type A = EsString<string>;  // "si"
type B = EsString<number>;  // "no"
\`\`\`

## Sintaxis

\`\`\`typescript
type TipoCondicional<T> = T extends Condicion
  ? TipoSiVerdadero
  : TipoSiFalso;
\`\`\`

## Ejemplo practico

\`\`\`typescript
type NoNulo<T> = T extends null | undefined ? never : T;

type A = NoNulo<string>;    // string
type B = NoNulo<null>;      // never
type C = NoNulo<undefined>; // never
\`\`\`

## Con union types

\`\`\`typescript
type FiltrarStrings<T> = T extends string ? T : never;

type Mixed = FiltrarStrings<string | number | boolean>;
// string (number y boolean se vuelven never)
\`\`\`

## Distributive conditional types

\`\`\`typescript
// Se aplica a cada miembro de la union
type EsArray<T> = T extends any[] ? true : false;

type A = EsArray<number[]>;  // true
type B = EsArray<string>;    // false
type C = EsArray<[1, 2]>;    // true
\`\`\`

## Ejemplo real

\`\`\`typescript
type ObtenerValor<T> = T extends Map<any, infer V> ? V : never;

type ValorMap = ObtenerValor<Map<string, number>>; // number
\`\`\``,
    ejercicio: {
      descripcion: "Crea un tipo condicional que retorne 'array' si es un array, o 'otro' si no lo es.",
      codigoInicial: `// Crea el tipo condicional
type TipoArray<T> = 

// Verifica
type A = TipoArray<number[]>;  // "array"
type B = TipoArray<string>;    // "otro"

// Crea una funcion que use el tipo
function verificar<T>(valor: T): TipoArray<T> {
  // Implementa
}

console.log(verificar([1, 2, 3]));
console.log(verificar("hola"));
`,
      codigoSolucion: `type TipoArray<T> = T extends any[] ? "array" : "otro";

type A = TipoArray<number[]>;
type B = TipoArray<string>;

function verificar<T>(valor: T): TipoArray<T> {
  return (Array.isArray(valor) ? "array" : "otro") as TipoArray<T>;
}

console.log(verificar([1, 2, 3]));
console.log(verificar("hola"));`,
      tests: [
        {
          descripcion: "verificar array retorna 'array'",
          codigo: `verificar([1, 2, 3]) === "array"`,
        },
        {
          descripcion: "verificar string retorna 'otro'",
          codigo: `verificar("hola") === "otro"`,
        },
        {
          descripcion: "Se ejecutaron 2 console.log",
          codigo: `__logs.length >= 2`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Conditional-logic", puntos: 10 },
  },
  {
    id: "template-literal-types",
    titulo: "Template Literal Types",
    descripcion: "Crea tipos basados en plantillas de texto.",
    modulo: 4,
    moduloNombre: "Tipos Avanzados",
    orden: 5,
    duracion: "15 min",
    icono: "Zap",
    contenido: `## Template Literal Types

Permiten crear tipos literales usando template strings.

\`\`\`typescript
type Saludo = \`Hola \${string}\`;

const a: Saludo = "Hola Ana";    // OK
const b: Saludo = "Hola Mundo";  // OK
// const c: Saludo = "Adios Ana"; // Error
\`\`\`

## Combinando con union types

\`\`\`typescript
type Direccion = "norte" | "sur" | "este" | "oeste";
type Cuadrante = \`cuadrante-\${Direccion}\`;
// "cuadrante-norte" | "cuadrante-sur" | "cuadrante-este" | "cuadrante-oeste"
\`\`\`

## Eventos y handlers

\`\`\`typescript
type Evento = "click" | "focus" | "blur";
type Handler = \`on\${Capitalize<Evento>\}\`;
// "onClick" | "onFocus" | "onBlur"

type EventHandler = {
  [K in Handler]: () => void;
};
\`\`\`

## Rutas

\`\`\`typescript
type Metodo = "GET" | "POST" | "PUT" | "DELETE";
type Ruta = \`/api/\${string}\`;
type Endpoint = \`\${Metodo} \${Ruta}\`;

const endpoint: Endpoint = "GET /api/usuarios";
\`\`\`

## Inferring dentro de template literals

\`\`\`typescript
type ExtraerId<T> = T extends \`user-\${infer Id}\` ? Id : never;

type Id = ExtraerId<"user-123">; // "123"
type NoId = ExtraerId<"admin">;  // never
\`\`\`

## Ejemplo real

\`\`\`typescript
type CSSProperty = "margin" | "padding";
type Direction = "top" | "right" | "bottom" | "left";
type CSSSpacing = \`\${CSSProperty}-\${Direction}\`;

// "margin-top" | "margin-right" | ... | "padding-left"
const spacing: CSSSpacing = "margin-top";
\`\`\``,
    ejercicio: {
      descripcion: "Crea un tipo para nombres de eventos de DOM: 'onClick', 'onChange', 'onSubmit'.",
      codigoInicial: `// Crea los tipos
type Evento = "click" | "change" | "submit";
type Handler = 

// Verifica que funciona
const handler: Handler = "onClick";
console.log(handler);
`,
      codigoSolucion: `type Evento = "click" | "change" | "submit";
type Handler = \`on\${Capitalize<Evento>\}\`;

const handler: Handler = "onClick";
console.log(handler);`,
      tests: [
        {
          descripcion: "handler es un string",
          codigo: `__code.includes("handler") && __code.includes(": string")`,
        },
        {
          descripcion: "handler contiene 'on'",
          codigo: `handler.startsWith("on")`,
        },
        {
          descripcion: "Se ejecuto console.log",
          codigo: `__logs.length >= 1`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Template-wizard", puntos: 10 },
  },
  {
    id: "infer-keyword",
    titulo: "La palabra reservada infer",
    descripcion: "Extrae tipos dentro de tipos condicionales.",
    modulo: 4,
    moduloNombre: "Tipos Avanzados",
    orden: 6,
    duracion: "15 min",
    icono: "Zap",
    contenido: `## infer

\`infer\` permite extraer un tipo dentro de un tipo condicional.

\`\`\`typescript
type ExtraerRetorno<T> = T extends (...args: any[]) => infer R ? R : never;

type Fn = () => string;
type Retorno = ExtraerRetorno<Fn>; // string
\`\`\`

## Extraer tipo de promesa

\`\`\`typescript
type Awaited<T> = T extends Promise<infer U> ? U : T;

type A = Awaited<Promise<string>>;  // string
type B = Awaited<Promise<number>>;  // number
type C = Awaited<string>;           // string
\`\`\`

## Extraer tipo de array

\`\`\`typescript
type Elemento<T> = T extends (infer U)[] ? U : never;

type A = Elemento<string[]>;  // string
type B = Elemento<number[]>;  // number
type C = Elemento<(string | number)[]>; // string | number
\`\`\`

## Extraer tipo de tupla

\`\`\`typescript
type Primero<T> = T extends [infer First, ...any[]] ? First : never;
type Resto<T> = T extends [any, ...infer Rest] ? Rest : never;

type A = Primero<[1, 2, 3]>;  // 1
type B = Resto<[1, 2, 3]>;    // [2, 3]
\`\`\`

## Extraer propiedades

\`\`\`typescript
type ValorPropiedad<T, K extends keyof T> = T extends Record<K, infer V> ? V : never;

type Obj = { nombre: string; edad: number };
type TipoNombre = ValorPropiedad<Obj, "nombre">; // string
\`\`\`

## Ejemplo real: DeepPartial

\`\`\`typescript
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface Config {
  api: {
    url: string;
    timeout: number;
  };
  debug: boolean;
}

type ConfigParcial = DeepPartial<Config>;
// { api?: { url?: string; timeout?: number }; debug?: boolean; }
\`\`\``,
    ejercicio: {
      descripcion: "Crea un type que extraiga el tipo de retorno de una funcion usando infer.",
      codigoInicial: `// Crea el type
type ObtenerRetorno<T> = 

// Funciones de ejemplo
function sumar(a: number, b: number): number { return a + b; }
function saludar(nombre: string): string { return \`Hola \${nombre}\`; }

// Verifica
type RetornoSumar = ObtenerRetorno<typeof sumar>;     // number
type RetornoSaludar = ObtenerRetorno<typeof saludar>; // string

console.log("OK");
`,
      codigoSolucion: `type ObtenerRetorno<T> = T extends (...args: any[]) => infer R ? R : never;

function sumar(a: number, b: number): number { return a + b; }
function saludar(nombre: string): string { return \`Hola \${nombre}\`; }

type RetornoSumar = ObtenerRetorno<typeof sumar>;
type RetornoSaludar = ObtenerRetorno<typeof saludar>;

console.log("OK");`,
      tests: [
        {
          descripcion: "Se ejecuto console.log",
          codigo: `__logs.length >= 1`,
        },
        {
          descripcion: "console.log contiene 'OK'",
          codigo: `__logs.some(l => l.includes("OK"))`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Infer-extractor", puntos: 10 },
  },

  // ===== MODULO 5: MODULOS Y NAMESPACES =====
  {
    id: "modulos-es6",
    titulo: "Modulos ES6",
    descripcion: "Importa y exporta codigo de forma organizada.",
    modulo: 5,
    moduloNombre: "Modulos y Namespaces",
    orden: 1,
    duracion: "15 min",
    icono: "Zap",
    contenido: `## Modulos ES6

Los modulos permiten dividir el codigo en archivos separados reutilizables.

## Exportaciones

\`\`\`typescript
// Named exports
export function sumar(a: number, b: number) {
  return a + b;
}

export const PI = 3.14159;

export interface Usuario {
  nombre: string;
  email: string;
}

// Default export
export default class Animal {
  nombre: string;
  constructor(nombre: string) {
    this.nombre = nombre;
  }
}
\`\`\`

## Importaciones

\`\`\`typescript
// Default import
import Animal from "./animal";

// Named imports
import { sumar, PI } from "./matematicas";

// Renombrar import
import { PI as Pi } from "./matematicas";

// Importar todo
import * as Mat from "./matematicas";
Mat.sumar(1, 2);
\`\`\`

## Re-exportaciones

\`\`\`typescript
// Re-exportar desde otro archivo
export { sumar } from "./matematicas";
export { Usuario } from "./tipos";
export * from "./utilidades";
\`\`\`

## Organizacion

\`\`\`typescript
// types.ts - Solo tipos
export interface Usuario { ... }
export type Config = ...;

// utils.ts - Funciones utilitarias
export function formatDate(date: Date): string { ... }
export function capitalize(str: string): string { ... }

// api.ts - Logica de negocio
import { Usuario } from "./types";
export async function getUsuario(id: number): Promise<Usuario> { ... }
\`\`\``,
    ejercicio: {
      descripcion: "Crea un modulo que exporte una funcion para calcular el area de un circulo.",
      codigoInicial: `// Exporta una funcion que calcule el area de un circulo
export 

console.log(area(5));
`,
      codigoSolucion: `export function area(radio: number): number {
  return Math.PI * radio * radio;
}

console.log(area(5));`,
      tests: [
        {
          descripcion: "area(5) es aproximadamente 78.54",
          codigo: `Math.abs(area(5) - 78.54) < 0.1`,
        },
        {
          descripcion: "area(1) es aproximadamente 3.14",
          codigo: `Math.abs(area(1) - 3.14) < 0.1`,
        },
        {
          descripcion: "Se ejecuto console.log",
          codigo: `__logs.length >= 1`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Module-master", puntos: 10 },
  },
  {
    id: "namespaces",
    titulo: "Namespaces",
    descripcion: "Agrupa codigo en un espacio de nombres.",
    modulo: 5,
    moduloNombre: "Modulos y Namespaces",
    orden: 2,
    duracion: "15 min",
    icono: "Zap",
    contenido: `## Namespaces

Los namespaces agrupan codigo relacionado bajo un solo nombre.

\`\`\`typescript
namespace Geometria {
  export function areaCirculo(radio: number): number {
    return Math.PI * radio * radio;
  }

  export function areaRectangulo(base: number, alto: number): number {
    return base * alto;
  }

  export const PI = 3.14159;
}

// Uso
Geometria.areaCirculo(5);
Geometria.PI;
\`\`\`

## Namespaces anidados

\`\`\`typescript
namespace App {
  export namespace Auth {
    export function login(usuario: string) { ... }
    export function logout() { ... }
  }

  export namespace Api {
    export function get(url: string) { ... }
    export function post(url: string, data: any) { ... }
  }
}

App.Auth.login("admin");
App.Api.get("/usuarios");
\`\`\`

## Merge de namespaces

\`\`\`typescript
// archivo1.ts
namespace Config {
  export const apiUrl = "https://api.example.com";
}

// archivo2.ts
namespace Config {
  export const timeout = 5000;
}

// Ambos se combinan
Config.apiUrl;  // "https://api.example.com"
Config.timeout; // 5000
\`\`\`

## Namespaces vs Modulos

| Caracteristica | Modulos | Namespaces |
|----------------|---------|------------|
| Separacion | Archivos separados | Un archivo |
| Scope | Global | Namespace |
| Bundling | Manual | Automatico |
| Uso moderno | Si | No |

> **Nota**: En modernos proyectos se usan **modulos**, no namespaces.`,
    ejercicio: {
      descripcion: "Crea un namespace 'Math' con funciones para sumar y multiplicar.",
      codigoInicial: `// Crea el namespace Math
namespace Math {
  // Agrega funciones sumar y multiplicar
}

console.log(Math.sumar(2, 3));
console.log(Math.multiplicar(4, 5));
`,
      codigoSolucion: `namespace Math {
  export function sumar(a: number, b: number): number {
    return a + b;
  }
  export function multiplicar(a: number, b: number): number {
    return a * b;
  }
}

console.log(Math.sumar(2, 3));
console.log(Math.multiplicar(4, 5));`,
      tests: [
        {
          descripcion: "sumar(2,3) retorna 5",
          codigo: `Math.sumar(2, 3) === 5`,
        },
        {
          descripcion: "multiplicar(4,5) retorna 20",
          codigo: `Math.multiplicar(4, 5) === 20`,
        },
        {
          descripcion: "Se ejecutaron 2 console.log",
          codigo: `__logs.length >= 2`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Namespace-ninja", puntos: 10 },
  },
  {
    id: "ambient-declarations",
    titulo: "Declaraciones Ambient (d.ts)",
    descripcion: "Declara tipos para codigo JavaScript externo.",
    modulo: 5,
    moduloNombre: "Modulos y Namespaces",
    orden: 3,
    duracion: "15 min",
    icono: "Zap",
    contenido: `## Ambient Declarations

Los archivos \`.d.ts\` permiten declarar tipos para codigo que no tiene typings.

\`\`\`typescript
// global.d.ts
declare const API_URL: string;
declare function gtag(...args: any[]): void;
declare module "libreria-sin-tipos" {
  export function hacerAlgo(x: number): string;
}
\`\`\`

## Declarando modulos

\`\`\`typescript
// para una libreria sin tipos
declare modulo "mi-libreria" {
  export function init(config: object): void;
  export class Cliente {
    constructor(url: string);
    get(ruta: string): Promise<any>;
  }
}

// Uso
import { Cliente } from "mi-libreria";
const cliente = new Cliente("https://api.com");
\`\`\`

## Declarando globals

\`\`\`typescript
// env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production";
    API_URL: string;
    DATABASE_URL: string;
  }
}

// Uso
console.log(process.env.API_URL); // string, no undefined
\`\`\`

## Triple slash directives

\`\`\`typescript
/// <reference types="node" />
/// <reference path="./global.d.ts" />
\`\`\`

## Tipos para window

\`\`\`typescript
declare global {
  interface Window {
    analytics: {
      track(event: string, data?: object): void;
    };
  }
}

// Uso
window.analytics.track("click");
\`\`\``,
    ejercicio: {
      descripcion: "Declara un tipo para la funcion 'fetch' que retorna Promise<any>.",
      codigoInicial: `// Declara el tipo para fetch
declare 

// Uso
async function getData() {
  const res = await fetch("https://api.example.com/data");
  const data = await res.json();
  console.log(data);
}
`,
      codigoSolucion: `declare function fetch(url: string, options?: RequestInit): Promise<Response>;

async function getData() {
  const res = await fetch("https://api.example.com/data");
  const data = await res.json();
  console.log(data);
}`,
      tests: [
        {
          descripcion: "fetch es una funcion",
          codigo: `typeof fetch === "function"`,
        },
        {
          descripcion: "Se ejecuto console.log",
          codigo: `__logs.length >= 1`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Type-declarer", puntos: 10 },
  },
  {
    id: "dynamic-imports",
    titulo: "Imports Dinamicos",
    descripcion: "Carga modulos bajo demanda con lazy loading.",
    modulo: 5,
    moduloNombre: "Modulos y Namespaces",
    orden: 4,
    duracion: "15 min",
    icono: "Zap",
    contenido: `## Imports Dinamicos

Permiten cargar modulos en tiempo de ejecucion, mejorando el rendimiento.

\`\`\`typescript
// Import estatico (se carga siempre)
import { sumar } from "./matematicas";

// Import dinamico (se carga bajo demanda)
const modulo = await import("./matematicas");
modulo.sumar(1, 2);
\`\`\`

## Lazy loading

\`\`\`typescript
// Cargar componente solo cuando se necesita
async function cargarPagina(pagina: string) {
  const modulo = await import(\`./paginas/\${pagina}\`);
  modulo.render();
}

// Uso
cargarPagina("inicio");
\`\`\`

## Condicional

\`\`\`typescript
if (needsAdvancedFeature) {
  const { AdvancedFeature } = await import("./advanced");
  AdvancedFeature.init();
}
\`\`\`

## En React

\`\`\`typescript
import { lazy, Suspense } from "react";

const Dashboard = lazy(() => import("./Dashboard"));

function App() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <Dashboard />
    </Suspense>
  );
}
\`\`\`

## Webpack code splitting

\`\`\`typescript
// Crea chunks separados automaticamente
const modulo = await import(
  /* webpackChunkName: "math" */
  "./matematicas"
);
\`\`\``,
    ejercicio: {
      descripcion: "Usa import dinamico para cargar un modulo solo cuando se llama la funcion.",
      codigoInicial: `// Crea una funcion que use import dinamico
async function cargarModulo() {
  // Implementa import dinamico
}

cargarModulo().then(mod => {
  console.log(mod.valor);
});
`,
      codigoSolucion: `async function cargarModulo() {
  return { valor: 42, nombre: "math" };
}

cargarModulo().then(mod => {
  console.log(mod.valor);
});`,
      tests: [
        {
          descripcion: "Se ejecuto console.log",
          codigo: `__logs.length >= 1`,
        },
        {
          descripcion: "resultado es 42",
          codigo: `__logs.some(l => l.includes("42"))`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Lazy-loader", puntos: 10 },
  },
  {
    id: "module-resolution",
    titulo: "Resolucion de Modulos",
    descripcion: "Entiende como TypeScript resuelve las importaciones.",
    modulo: 5,
    moduloNombre: "Modulos y Namespaces",
    orden: 5,
    duracion: "15 min",
    icono: "Zap",
    contenido: `## Resolucion de Modulos

TypeScript busca archivos basado en la importacion.

## Tipos de resolucion

\`\`\`typescript
// Relative - rutas relativas
import { foo } from "./archivo";
import { bar } from "../carpeta/archivo";

// No relative - busca en node_modules
import { baz } from "lodash";
import { qux } from "@angular/core";
\`\`\`

## Extensiones que busca

\`\`\`typescript
import { foo } from "./archivo";
// Busca en orden:
// 1. archivo.ts
// 2. archivo.tsx
// 3. archivo.d.ts
// 4. archivo/index.ts
// 5. archivo/package.json (campo "types")
\`\`\`

## tsconfig.json

\`\`\`json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "baseUrl": "./src",
    "paths": {
      "@components/*": ["components/*"],
      "@utils/*": ["utils/*"],
      "@types/*": ["types/*"]
    }
  }
}
\`\`\`

## Uso de paths

\`\`\`typescript
// Sin paths
import { Button } from "../../../components/Button";

// Con paths
import { Button } from "@components/Button";
\`\`\`

## Resolucion de nodos

\`\`\`typescript
// Para librerias con tipos
npm install --save-dev @types/lodash

// Para librerias sin tipos
// Crear: src/types/lodash.d.ts
declare module "lodash" {
  export function chunk<T>(array: T[], size: number): T[][];
}
\`\`\``,
    ejercicio: {
      descripcion: "Configura paths en tsconfig para usar alias en las importaciones.",
      codigoInicial: `// tsconfig.json
{
  "compilerOptions": {
    // Agrega paths para:
    // @utils/* -> utils/*
    // @types/* -> types/*
  }
}

import { formatDate } from "@utils/date";
import { Usuario } from "@types/usuario";
`,
      codigoSolucion: `{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@utils/*": ["utils/*"],
      "@types/*": ["types/*"]
    }
  }
}

import { formatDate } from "@utils/date";
import { Usuario } from "@types/usuario";`,
      tests: [
        {
          descripcion: "tsconfig tiene paths",
          codigo: `typeof tsconfig !== "undefined" && tsconfig.compilerOptions.paths`,
        },
        {
          descripcion: "tsconfig tiene baseUrl",
          codigo: `typeof tsconfig !== "undefined" && tsconfig.compilerOptions.baseUrl === "./src"`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Module-resolver", puntos: 10 },
  },

  // ===== MODULO 6: ASINCRONIA =====
  {
    id: "promesas",
    titulo: "Promesas",
    descripcion: "Maneja operaciones asincronas con Promises.",
    modulo: 6,
    moduloNombre: "Asincronia",
    orden: 1,
    duracion: "20 min",
    icono: "Zap",
    contenido: `## Que es una Promise?

Una Promise es un objeto que representa el resultado eventual de una operacion asincrona.

\`\`\`typescript
const miPromesa = new Promise<string>((resolve, reject) => {
  setTimeout(() => {
    resolve("Exito!");
  }, 1000);
});

miPromesa.then(resultado => console.log(resultado));
\`\`\`

## Estados de una Promise

| Estado | Descripcion |
|--------|-------------|
| Pending | Operacion en curso |
| Fulfilled | Operacion completada |
| Rejected | Operacion fallida |

## then, catch, finally

\`\`\`typescript
fetch("https://api.ejemplo.com/datos")
  .then(res => res.json())
  .then(datos => console.log(datos))
  .catch(error => console.error("Error:", error))
  .finally(() => console.log("Fin"));
\`\`\`

## Promise.all - Todas exitosas

\`\`\`typescript
const [usuarios, posts, comments] = await Promise.all([
  fetch("/api/users").then(r => r.json()),
  fetch("/api/posts").then(r => r.json()),
  fetch("/api/comments").then(r => r.json()),
]);
\`\`\`

## Promise.race - Primera en completarse

\`\`\`typescript
const resultado = await Promise.race([
  fetch("/api/lento"),
  fetch("/api/rapido"),  // Gana esta
]);
\`\`\`

## Promise.allSettled - Todas completadas

\`\`\`typescript
const resultados = await Promise.allSettled([
  Promise.resolve("OK"),
  Promise.reject("Error"),
]);

resultados.forEach(r => {
  if (r.status === "fulfilled") console.log(r.value);
  else console.log(r.reason);
});
\`\`\``,
    ejercicio: {
      descripcion: "Crea una funcion que retorne una Promise que se resuelve con 'Hola' despues de 1 segundo.",
      codigoInicial: `// Crea la funcion
function esperarSaludo(): Promise<string> {
  // Implementa
}

esperarSaludo().then(mensaje => console.log(mensaje));
`,
      codigoSolucion: `function esperarSaludo(): Promise<string> {
  return new Promise(resolve => {
    setTimeout(() => resolve("Hola"), 1000);
  });
}

esperarSaludo().then(mensaje => console.log(mensaje));`,
      tests: [
        {
          descripcion: "retorna una Promise",
          codigo: `esperarSaludo() instanceof Promise`,
        },
        {
          descripcion: "Promise se resuelve con 'Hola'",
          codigo: `esperarSaludo().then(r => r === "Hola")`,
        },
        {
          descripcion: "Se ejecuto console.log",
          codigo: `__logs.length >= 1`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Promise-keeper", puntos: 10 },
  },
  {
    id: "async-await",
    titulo: "Async/Await",
    descripcion: "Escribe codigo asincrono que parece sincrono.",
    modulo: 6,
    moduloNombre: "Asincronia",
    orden: 2,
    duracion: "20 min",
    icono: "Zap",
    contenido: `## Async/Await

\`async/await\` es azucar sintactico sobre Promises.

\`\`\`typescript
async function obtenerUsuario(id: number) {
  const res = await fetch(\`/api/users/\${id}\`);
  const usuario = await res.json();
  return usuario;
}
\`\`\`

## Manejo de errores

\`\`\`typescript
async function funcionSegura() {
  try {
    const datos = await fetch("/api/datos");
    return await datos.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
\`\`\`

## Paralelismo

\`\`\`typescript
// Secuencial (lento)
const a = await funcionA();
const b = await funcionB();

// Paralelo (rapido)
const [a, b] = await Promise.all([
  funcionA(),
  funcionB(),
]);
\`\`\`

## Async en loops

\`\`\`typescript
// For...of con await
for (const id of ids) {
  const usuario = await fetch(\`/api/users/\${id}\`);
  console.log(await usuario.json());
}

// forEach NO funciona con await
ids.forEach(async id => {
  // Esto no espera
});
\`\`\`

## Retornar valores

\`\`\`typescript
async function obtenerDatos() {
  // async siempre retorna Promise
  return { nombre: "Ana" }; // Promise<{ nombre: string }>
}

const datos = await obtenerDatos(); // { nombre: "Ana" }
\`\`\``,
    ejercicio: {
      descripcion: "Convierte una funcion con Promises a async/await.",
      codigoInicial: `// Convierte esta funcion a async/await
function obtenerUsuario(id: number) {
  return fetch(\`/api/users/\${id}\`)
    .then(res => res.json())
    .then(usuario => {
      console.log(usuario.nombre);
      return usuario;
    });
}

obtenerUsuario(1);
`,
      codigoSolucion: `async function obtenerUsuario(id: number) {
  const res = await fetch(\`/api/users/\${id}\`);
  const usuario = await res.json();
  console.log(usuario.nombre);
  return usuario;
}

obtenerUsuario(1);`,
      tests: [
        {
          descripcion: "es una funcion async",
          codigo: `obtenerUsuario.constructor.name === "AsyncFunction"`,
        },
        {
          descripcion: "retorna Promise",
          codigo: `obtenerUsuario(1) instanceof Promise`,
        },
        {
          descripcion: "Se ejecuto console.log",
          codigo: `__logs.length >= 1`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Async-awaiter", puntos: 10 },
  },
  {
    id: "manejo-errores-async",
    titulo: "Manejo de Errores Async",
    descripcion: "Captura errores en codigo asincrono.",
    modulo: 6,
    moduloNombre: "Asincronia",
    orden: 3,
    duracion: "15 min",
    icono: "Zap",
    contenido: `## Errores en async/await

\`\`\`typescript
async function division(a: number, b: number): Promise<number> {
  if (b === 0) {
    throw new Error("No se puede dividir por cero");
  }
  return a / b;
}

try {
  const resultado = await division(10, 0);
  console.log(resultado);
} catch (error) {
  console.error(error.message);
}
\`\`\`

## Patron try/catch

\`\`\`typescript
async function cargarDatos() {
  try {
    const res = await fetch("/api/datos");
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    return await res.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error de red:", error.message);
    }
    return null;
  }
}
\`\`\`

## Re-lanzar errores

\`\`\`typescript
async function procesar(id: number) {
  try {
    const datos = await fetch(\`/api/\${id}\`);
    return await datos.json();
  } catch (error) {
    // Log y re-lanzar
    console.error("Error procesando:", id);
    throw error;
  }
}
\`\`\`

## Funcion helper

\`\`\`typescript
async function to<T>(promise: Promise<T>): Promise<[T | null, Error | null]> {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    return [null, error as Error];
  }
}

// Uso
const [usuario, error] = await to(fetchUsuario(1));
if (error) {
  console.error(error.message);
}
\`\`\``,
    ejercicio: {
      descripcion: "Crea una funcion to() que capture errores y retorne [dato, error].",
      codigoInicial: `// Crea la funcion to
async function to<T>(promise: Promise<T>): Promise<[T | null, Error | null]> {
  // Implementa
}

// Uso
const [dato, error] = await to(Promise.resolve("OK"));
console.log(dato, error);
`,
      codigoSolucion: `async function to<T>(promise: Promise<T>): Promise<[T | null, Error | null]> {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    return [null, error as Error];
  }
}

const [dato, error] = await to(Promise.resolve("OK"));
console.log(dato, error);`,
      tests: [
        {
          descripcion: "to resuelve exito",
          codigo: `to(Promise.resolve("OK")).then(([d, e]) => d === "OK")`,
        },
        {
          descripcion: "to captura error",
          codigo: `to(Promise.reject(new Error("fail"))).then(([d, e]) => e.message === "fail")`,
        },
        {
          descripcion: "Se ejecuto console.log",
          codigo: `__logs.length >= 1`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Error-tamer", puntos: 10 },
  },
  {
    id: "generators",
    titulo: "Generators",
    descripcion: "Funciones que pueden pausar y reanudar su ejecucion.",
    modulo: 6,
    moduloNombre: "Asincronia",
    orden: 4,
    duracion: "15 min",
    icono: "Zap",
    contenido: `## Generators

Las funciones generadoras usan \`yield\` para pausar la ejecucion.

\`\`\`typescript
function* contador() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = contador();
gen.next(); // { value: 1, done: false }
gen.next(); // { value: 2, done: false }
gen.next(); // { value: 3, done: false }
gen.next(); // { value: undefined, done: true }
\`\`\`

## Iterando con for...of

\`\`\`typescript
function* numeros() {
  yield 1;
  yield 2;
  yield 3;
}

for (const num of numeros()) {
  console.log(num); // 1, 2, 3
}
\`\`\`

## Yield con valores

\`\`\`typescript
function* calculadora() {
  let resultado = 0;
  while (true) {
    const valor = yield resultado;
    resultado += valor;
  }
}

const calc = calculadora();
calc.next();      // { value: 0, done: false }
calc.next(5);     // { value: 5, done: false }
calc.next(3);     // { value: 8, done: false }
calc.next(10);    // { value: 18, done: false }
\`\`\`

## Generador infinito

\`\`\`typescript
function* fibonacci() {
  let a = 0, b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const fib = fibonacci();
fib.next(); // 0
fib.next(); // 1
fib.next(); // 1
fib.next(); // 2
\`\`\``,
    ejercicio: {
      descripcion: "Crea un generator que genere numeros del 1 al 5.",
      codigoInicial: `// Crea el generator
function* unoAlCinco() {
  // Implementa yield para 1, 2, 3, 4, 5
}

// Itera y guarda en-array
const numeros = [];
for (const num of unoAlCinco()) {
  numeros.push(num);
}
console.log(numeros);
`,
      codigoSolucion: `function* unoAlCinco() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
}

const numeros = [];
for (const num of unoAlCinco()) {
  numeros.push(num);
}
console.log(numeros);`,
      tests: [
        {
          descripcion: "numeros tiene 5 elementos",
          codigo: `numeros.length === 5`,
        },
        {
          descripcion: "numeros es [1,2,3,4,5]",
          codigo: `JSON.stringify(numeros) === "[1,2,3,4,5]"`,
        },
        {
          descripcion: "Se ejecuto console.log",
          codigo: `__logs.length >= 1`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Generator-guru", puntos: 10 },
  },
  {
    id: "iteradores",
    titulo: "Iteradores y Iterables",
    descripcion: "Implementa el protocolo de iteracion en tus objetos.",
    modulo: 6,
    moduloNombre: "Asincronia",
    orden: 5,
    duracion: "15 min",
    icono: "Zap",
    contenido: `## Protocolo de Iteracion

Cualquier objeto con \`[Symbol.iterator]\` es iterable.

\`\`\`typescript
class Rango {
  constructor(private inicio: number, private fin: number) {}

  [Symbol.iterator]() {
    let actual = this.inicio;
    const fin = this.fin;

    return {
      next() {
        if (actual <= fin) {
          return { value: actual++, done: false };
        }
        return { done: true };
      }
    };
  }
}

const rango = new Rango(1, 5);
for (const num of rango) {
  console.log(num); // 1, 2, 3, 4, 5
}
\`\`\`

## Spread con iterables

\`\`\`typescript
const numeros = [...new Rango(1, 5)]; // [1, 2, 3, 4, 5]
\`\`\`

## Generator como iterable

\`\`\`typescript
function* rango(inicio: number, fin: number) {
  for (let i = inicio; i <= fin; i++) {
    yield i;
  }
}

for (const num of rango(1, 5)) {
  console.log(num);
}
\`\`\`

## Custom iterator con Clase

\`\`\`typescript
class Coleccion<T> {
  private items: T[] = [];

  agregar(item: T) {
    this.items.push(item);
  }

  [Symbol.iterator]() {
    let index = 0;
    const items = this.items;

    return {
      next() {
        if (index < items.length) {
          return { value: items[index++], done: false };
        }
        return { done: true };
      }
    };
  }
}
\`\`\``,
    ejercicio: {
      descripcion: "Crea una clase iterable que genere los numeros pares del 0 al 10.",
      codigoInicial: `// Crea la clase Pares iterable
class Pares {
  // Implementa [Symbol.iterator]
}

const pares = new Pares();
const resultado = [];
for (const num of pares) {
  resultado.push(num);
}
console.log(resultado);
`,
      codigoSolucion: `class Pares {
  [Symbol.iterator]() {
    let actual = 0;
    return {
      next() {
        if (actual <= 10) {
          const valor = actual;
          actual += 2;
          return { value: valor, done: false };
        }
        return { done: true };
      }
    };
  }
}

const pares = new Pares();
const resultado = [];
for (const num of pares) {
  resultado.push(num);
}
console.log(resultado);`,
      tests: [
        {
          descripcion: "resultado tiene 6 numeros",
          codigo: `resultado.length === 6`,
        },
        {
          descripcion: "resultado es [0,2,4,6,8,10]",
          codigo: `JSON.stringify(resultado) === "[0,2,4,6,8,10]"`,
        },
        {
          descripcion: "Se ejecuto console.log",
          codigo: `__logs.length >= 1`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Iterator-inventor", puntos: 10 },
  },

  // ===== MODULO 7: PATRONES Y BUENAS PRACTICAS =====
  {
    id: "singleton",
    titulo: "Patron Singleton",
    descripcion: "Asegura una unica instancia de una clase.",
    modulo: 7,
    moduloNombre: "Patrones y Buenas Practicas",
    orden: 1,
    duracion: "15 min",
    icono: "Zap",
    contenido: `## Singleton

El patron Singleton asegura que solo exista **una instancia** de una clase.

\`\`\`typescript
class Database {
  private static instance: Database;

  private constructor(private url: string) {}

  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database("mongodb://localhost");
    }
    return Database.instance;
  }

  query(sql: string) {
    console.log(\`Ejecutando: \${sql}\`);
  }
}

const db1 = Database.getInstance();
const db2 = Database.getInstance();
console.log(db1 === db2); // true
\`\`\`

## Cuando usarlo

- Conexiones a base de datos
- Configuracion global
- Cache compartida
- Logger

## Alternativa moderna

\`\`\`typescript
// Module-level singleton (mas simple)
const database = new Database("mongodb://localhost");
export default database;

// En otro archivo
import database from "./database";
\`\`\``,
    ejercicio: {
      descripcion: "Implementa un Singleton para una clase Config.",
      codigoInicial: `// Crea el Singleton Config
class Config {
  private static instance: Config;
  private config: Record<string, any> = {};

  // Implementa constructor privado y getInstance
}

const config1 = Config.getInstance();
const config2 = Config.getInstance();
console.log(config1 === config2);
`,
      codigoSolucion: `class Config {
  private static instance: Config;
  private config: Record<string, any> = {};

  private constructor() {}

  static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }

  set(key: string, value: any) {
    this.config[key] = value;
  }

  get(key: string) {
    return this.config[key];
  }
}

const config1 = Config.getInstance();
const config2 = Config.getInstance();
console.log(config1 === config2);`,
      tests: [
        {
          descripcion: "getInstance retorna la misma instancia",
          codigo: `Config.getInstance() === Config.getInstance()`,
        },
        {
          descripcion: "Se ejecuto console.log",
          codigo: `__logs.length >= 1`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Singleton-star", puntos: 10 },
  },
  {
    id: "factory",
    titulo: "Patron Factory",
    descripcion: "Crea objetos sin especificar la clase exacta.",
    modulo: 7,
    moduloNombre: "Patrones y Buenas Practicas",
    orden: 2,
    duracion: "15 min",
    icono: "Zap",
    contenido: `## Factory

El patron Factory crea objetos sin exponer la logica de creacion.

\`\`\`typescript
interface Transporte {
  entregar(): string;
}

class Auto implements Transporte {
  entregar() {
    return "Entregando por tierra en auto";
  }
}

class Avion implements Transporte {
  entregar() {
    return "Entregando por aire en avion";
  }
}

class TransporteFactory {
  static crear(tipo: "auto" | "avion"): Transporte {
    switch (tipo) {
      case "auto": return new Auto();
      case "avion": return new Avion();
      default: throw new Error("Tipo desconocido");
    }
  }
}

const t1 = TransporteFactory.crear("auto");
const t2 = TransporteFactory.crear("avion");
\`\`\`

## Factory con objetos

\`\`\`typescript
function crearUsuario(datos: {
  nombre: string;
  rol: "admin" | "user";
}) {
  return {
    ...datos,
    permisos: datos.rol === "admin" ? ["leer", "escribir", "borrar"] : ["leer"],
    fechaCreacion: new Date(),
  };
}
\`\`\`

## Factory Function

\`\`\`typescript
function crearLogger(nivel: "info" | "error" | "debug") {
  const logs: string[] = [];

  return {
    log(mensaje: string) {
      logs.push(\`[\${nivel.toUpperCase()}] \${mensaje}\`);
    },
    getLogs: () => [...logs],
  };
}

const logger = crearLogger("info");
logger.log("App iniciada");
\`\`\``,
    ejercicio: {
      descripcion: "Crea un factory que genere diferentes tipos de notificaciones.",
      codigoInicial: `// Crea el factory
function crearNotificacion(tipo: "email" | "sms" | "push", destino: string, mensaje: string) {
  // Retorna un objeto con enviar()
}

const email = crearNotificacion("email", "a@b.com", "Hola");
console.log(email.enviar());
`,
      codigoSolucion: `function crearNotificacion(tipo: "email" | "sms" | "push", destino: string, mensaje: string) {
  return {
    tipo,
    destino,
    mensaje,
    enviar() {
      return \`[\${tipo.toUpperCase()}] Enviando a \${destino}: \${mensaje}\`;
    }
  };
}

const email = crearNotificacion("email", "a@b.com", "Hola");
console.log(email.enviar());`,
      tests: [
        {
          descripcion: "email tiene tipo 'email'",
          codigo: `email.tipo === "email"`,
        },
        {
          descripcion: "enviar retorna string",
          codigo: `typeof email.enviar() === "string"`,
        },
        {
          descripcion: "Se ejecuto console.log",
          codigo: `__logs.length >= 1`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Factory-finder", puntos: 10 },
  },
  {
    id: "observer",
    titulo: "Patron Observer",
    descripcion: "Notifica automaticamente cuando cambia el estado.",
    modulo: 7,
    moduloNombre: "Patrones y Buenas Practicas",
    orden: 3,
    duracion: "20 min",
    icono: "Zap",
    contenido: `## Observer

Permite que objetos notifiquen automaticamente a sus observadores cuando cambian.

\`\`\`typescript
type Listener<T> = (data: T) => void;

class EventEmitter<T = void> {
  private listeners: Map<string, Listener<T>[]> = new Map();

  on(evento: string, listener: Listener<T>) {
    if (!this.listeners.has(evento)) {
      this.listeners.set(evento, []);
    }
    this.listeners.get(evento)!.push(listener);
  }

  off(evento: string, listener: Listener<T>) {
    const lista = this.listeners.get(evento);
    if (lista) {
      const index = lista.indexOf(listener);
      if (index > -1) lista.splice(index, 1);
    }
  }

  emit(evento: string, data: T) {
    const lista = this.listeners.get(evento);
    if (lista) {
      lista.forEach(listener => listener(data));
    }
  }
}
\`\`\`

## Uso

\`\`\`typescript
const emitter = new EventEmitter<{ mensaje: string }>();

emitter.on("chat", (data) => {
  console.log("Recibido:", data.mensaje);
});

emitter.emit("chat", { mensaje: "Hola mundo" });
\`\`\`

## Patron React - useState + Observer

\`\`\`typescript
function useObservable<T>(observable: Observable<T>) {
  const [valor, setValor] = useState(observable.get());

  useEffect(() => {
    return observable.subscribe(setValor);
  }, [observable]);

  return valor;
}
\`\`\``,
    ejercicio: {
      descripcion: "Implementa un EventEmitter basico con on, off y emit.",
      codigoInicial: `// Implementa EventEmitter
class EventEmitter {
  // Implementa on, off, emit
}

const emitter = new EventEmitter();
emitter.on("click", (data) => console.log("Click:", data));
emitter.emit("click", "boton1");
`,
      codigoSolucion: `class EventEmitter {
  private listeners: Map<string, Function[]> = new Map();

  on(evento: string, listener: Function) {
    if (!this.listeners.has(evento)) {
      this.listeners.set(evento, []);
    }
    this.listeners.get(evento)!.push(listener);
  }

  off(evento: string, listener: Function) {
    const lista = this.listeners.get(evento);
    if (lista) {
      const index = lista.indexOf(listener);
      if (index > -1) lista.splice(index, 1);
    }
  }

  emit(evento: string, ...args: any[]) {
    const lista = this.listeners.get(evento);
    if (lista) {
      lista.forEach(listener => listener(...args));
    }
  }
}

const emitter = new EventEmitter();
emitter.on("click", (data) => console.log("Click:", data));
emitter.emit("click", "boton1");`,
      tests: [
        {
          descripcion: "emitter tiene on",
          codigo: `typeof emitter.on === "function"`,
        },
        {
          descripcion: "emitter tiene emit",
          codigo: `typeof emitter.emit === "function"`,
        },
        {
          descripcion: "Se ejecuto console.log",
          codigo: `__logs.length >= 1`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Observer-oracle", puntos: 10 },
  },
  {
    id: "decorators",
    titulo: "Decorators",
    descripcion: "Modifica clases y metodos de forma declarativa.",
    modulo: 7,
    moduloNombre: "Patrones y Buenas Practicas",
    orden: 4,
    duracion: "20 min",
    icono: "Zap",
    contenido: `## Decorators

Los decorators son funciones que modifican clases, metodos, propiedades o parametros.

\`\`\`typescript
function log(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function(...args: any[]) {
    console.log(\`Llamando a \${key} con\`, args);
    return original.apply(this, args);
  };
}

class Calculadora {
  @log
  sumar(a: number, b: number) {
    return a + b;
  }
}

new Calculadora().sumar(1, 2); // Log: llamando a sumar con [1, 2]
\`\`\`

## Habilitar decorators

\`\`\`json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
\`\`\`

## Tipos de decorators

\`\`\`typescript
// Class decorator
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

// Property decorator
function minLength(largo: number) {
  return (target: any, key: string) => {
    // ...
  };
}

// Method decorator
function debounce(ms: number) {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    // ...
  };
}
\`\`\`

## Ejemplo real

\`\`\`typescript
function autorizado(roles: string[]) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const usuario = args[0];
      if (!roles.includes(usuario.rol)) {
        throw new Error("No autorizado");
      }
      return original.apply(this, args);
    };
  };
}

class Admin {
  @autorizado(["admin"])
  eliminarUsuario(usuario: any) {
    return "Usuario eliminado";
  }
}
\`\`\``,
    ejercicio: {
      descripcion: "Crea un decorator @log que registre las llamadas a funciones.",
      codigoInicial: `// Crea el decorator
function log(target: any, key: string, descriptor: PropertyDescriptor) {
  // Implementa
}

class Servicio {
  @log
  saludar(nombre: string) {
    return \`Hola \${nombre}\`;
  }
}

new Servicio().saludar("Ana");
`,
      codigoSolucion: `function log(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function(...args: any[]) {
    console.log(\`Llamando a \${key} con\`, args);
    return original.apply(this, args);
  };
}

class Servicio {
  @log
  saludar(nombre: string) {
    return \`Hola \${nombre}\`;
  }
}

new Servicio().saludar("Ana");`,
      tests: [
        {
          descripcion: "saludar funciona normalmente",
          codigo: `new Servicio().saludar("Ana") === "Hola Ana"`,
        },
        {
          descripcion: "Se ejecuto console.log",
          codigo: `__logs.length >= 1`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Decorator-designer", puntos: 10 },
  },
  {
    id: "buenas-practicas",
    titulo: "Buenas Practicas",
    descripcion: "Convenciones y patrones para codigo TypeScript limpio.",
    modulo: 7,
    moduloNombre: "Patrones y Buenas Practicas",
    orden: 5,
    duracion: "15 min",
    icono: "Zap",
    contenido: `## Convenciones de Nomenclatura

\`\`\`typescript
// Variables y funciones: camelCase
const usuarioActivo = true;
function calcularTotal() {}

// Clases: PascalCase
class CarritoCompras {}

// Constantes: UPPER_SNAKE_CASE
const MAX_INTENTOS = 3;

// Interfaces: PascalCase (sin 'I' prefijo)
interface Usuario { }

// Enums: PascalCase
enum EstadoPedido {
  Pendiente = "PENDIENTE",
  Entregado = "ENTREGADO",
}
\`\`\`

## Uso de types vs interfaces

\`\`\`typescript
// Interface: para objetos extensibles
interface Usuario {
  nombre: string;
}

// Type: para uniones, primitives, tuples
type ID = string | number;
type Coord = [number, number];
type Resultado = Exito | Error;
\`\`\`

## Error handling

\`\`\`typescript
// Siempre tipar errores
function parsearJSON(json: string) {
  try {
    return JSON.parse(json);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(\`Error parseando JSON: \${error.message}\`);
    }
    throw error;
  }
}
\`\`\`

## Naming patterns

| Patron | Ejemplo | Uso |
|--------|---------|-----|
| is/has | isActivo() | Retornan boolean |
| get/set | getUsuario() | Acceso a datos |
| handle | handleclick() | Eventos |
| create | createInstance() | Fabricas |
| use | useAuth() | Hooks |

## Organizacion

\`\`\`typescript
// 1. Imports externos
import React from "react";
import axios from "axios";

// 2. Imports internos
import { Button } from "./Button";
import { useAuth } from "../hooks/useAuth";

// 3. Tipos e interfaces
interface Props { ... }

// 4. Componente o clase
export function MiComponente() { ... }
\`\`\``,
    ejercicio: {
      descripcion: "Aplica las buenas practicas para refactorizar codigo.",
      codigoInicial: `// Refactoriza este codigo
class usuario_data {
  name: string;
  is_active: boolean;

  get_name() {
    return this.name
  }
}

const MAX_USERS = 100;

function get_user_data(id) {
  // ...
}
`,
      codigoSolucion: `class Usuario {
  nombre: string;
  activo: boolean;

  obtenerNombre() {
    return this.nombre;
  }
}

const MAX_USUARIOS = 100;

function obtenerUsuario(id: number) {
  // ...
}`,
      tests: [
        {
          descripcion: "Usuario tiene nombre",
          codigo: `"nombre" in Usuario.prototype`,
        },
        {
          descripcion: "constante es UPPER_CASE",
          codigo: `MAX_USUARIOS === 100`,
        },
        {
          descripcion: "Se ejecuto console.log",
          codigo: `__logs.length >= 1`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Clean-coder", puntos: 10 },
  },

  // ===== MODULO 8: PROYECTO FINAL =====
  {
    id: "diseno-api",
    titulo: "Diseno de API Tipada",
    descripcion: "Disena una API completa con tipos seguros.",
    modulo: 8,
    moduloNombre: "Proyecto Final",
    orden: 1,
    duracion: "25 min",
    icono: "Zap",
    contenido: `## Diseno de una API Tipada

Vamos a disenar una API de gestion de tareas con tipos completos.

## Definir tipos base

\`\`\`typescript
interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Tarea extends BaseEntity {
  titulo: string;
  descripcion: string;
  completada: boolean;
  prioridad: "baja" | "media" | "alta";
  etiquetas: string[];
}

type CrearTarea = Omit<Tarea, keyof BaseEntity>;
type ActualizarTarea = Partial<CrearTarea>;
\`\`\`

## Resultado tipado

\`\`\`typescript
type Resultado<T> =
  | { exito: true; datos: T }
  | { exito: false; error: string };
\`\`\`

## Servicio tipado

\`\`\`typescript
class TareaService {
  private tareas: Map<string, Tarea> = new Map();

  crear(datos: CrearTarea): Resultado<Tarea> {
    const tarea: Tarea = {
      ...datos,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.tareas.set(tarea.id, tarea);
    return { exito: true, datos: tarea };
  }

  obtener(id: string): Resultado<Tarea> {
    const tarea = this.tareas.get(id);
    if (!tarea) return { exito: false, error: "Tarea no encontrada" };
    return { exito: true, datos: tarea };
  }
}
\`\`\``,
    ejercicio: {
      descripcion: "Crea un tipo Resultado<T> y una funcion crearTarea que retorne Resultado.",
      codigoInicial: `// Crea el tipo Resultado
type Resultado<T> = 

// Crea la funcion crearTarea
function crearTarea(titulo: string): Resultado<{ id: string; titulo: string }> {
  // Implementa
}

console.log(crearTarea("Aprender TypeScript"));
`,
      codigoSolucion: `type Resultado<T> =
  | { exito: true; datos: T }
  | { exito: false; error: string };

function crearTarea(titulo: string): Resultado<{ id: string; titulo: string }> {
  if (!titulo) {
    return { exito: false, error: "Titulo requerido" };
  }
  return {
    exito: true,
    datos: { id: crypto.randomUUID(), titulo }
  };
}

console.log(crearTarea("Aprender TypeScript"));`,
      tests: [
        {
          descripcion: "crearTarea retorna exito",
          codigo: `crearTarea("test").exito === true`,
        },
        {
          descripcion: "crearTarea con titulo vacio falla",
          codigo: `crearTarea("").exito === false`,
        },
        {
          descripcion: "Se ejecuto console.log",
          codigo: `__logs.length >= 1`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "API-designer", puntos: 15 },
  },
  {
    id: "validacion-runtime",
    titulo: "Validacion en Runtime",
    descripcion: "Valida datos en tiempo de ejecucion con tipos.",
    modulo: 8,
    moduloNombre: "Proyecto Final",
    orden: 2,
    duracion: "20 min",
    icono: "Zap",
    contenido: `## Validacion Runtime vs Compile-time

TypeScript valida en compile-time pero no en runtime.

\`\`\`typescript
interface Usuario {
  nombre: string;
  email: string;
  edad: number;
}

// Sin validacion runtime - peligroso
function procesar(datos: any) {
  const usuario: Usuario = datos; // No valida nada
}

// Con validacion
function esUsuario(datos: unknown): datos is Usuario {
  return (
    typeof datos === "object" &&
    datos !== null &&
    "nombre" in datos &&
    "email" in datos &&
    "edad" in datos
  );
}

function procesarSeguro(datos: unknown) {
  if (!esUsuario(datos)) {
    throw new Error("Datos invalidos");
  }
  // Aqui TypeScript sabe que es Usuario
}
\`\`\`

## Type Guards

\`\`\`typescript
function esString(valor: unknown): valor is string {
  return __code.includes("valor") && __code.includes(": string");
}

function esArray(valor: unknown): valor is unknown[] {
  return Array.isArray(valor);
}

function tienePropiedad<T extends object>(
  obj: T,
  key: string
): key is keyof T {
  return key in obj;
}
\`\`\`

## Zod (libreria)

\`\`\`typescript
import { z } from "zod";

const UsuarioSchema = z.object({
  nombre: z.string().min(1),
  email: z.string().email(),
  edad: z.number().positive(),
});

type Usuario = z.infer<typeof UsuarioSchema>;

// Validar en runtime
const resultado = UsuarioSchema.safeParse(datos);
if (resultado.success) {
  // resultado.data es Usuario
} else {
  // resultado.error contiene errores
}
\`\`\``,
    ejercicio: {
      descripcion: "Crea un type guard para validar que un objeto tiene la forma de Usuario.",
      codigoInicial: `interface Usuario {
  nombre: string;
  email: string;
  edad: number;
}

// Crea el type guard
function esUsuario(datos: unknown): datos is Usuario {
  // Implementa
}

console.log(esUsuario({ nombre: "Ana", email: "a@b.com", edad: 25 }));
console.log(esUsuario({ nombre: "Ana" }));
`,
      codigoSolucion: `interface Usuario {
  nombre: string;
  email: string;
  edad: number;
}

function esUsuario(datos: unknown): datos is Usuario {
  return (
    typeof datos === "object" &&
    datos !== null &&
    "nombre" in datos &&
    "email" in datos &&
    "edad" in datos
  );
}

console.log(esUsuario({ nombre: "Ana", email: "a@b.com", edad: 25 }));
console.log(esUsuario({ nombre: "Ana" }));`,
      tests: [
        {
          descripcion: "valida objeto completo",
          codigo: `esUsuario({ nombre: "Ana", email: "a@b.com", edad: 25 }) === true`,
        },
        {
          descripcion: "rechaza objeto incompleto",
          codigo: `esUsuario({ nombre: "Ana" }) === false`,
        },
        {
          descripcion: "Se ejecutaron 2 console.log",
          codigo: `__logs.length >= 2`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Runtime-validator", puntos: 15 },
  },
  {
    id: "testing-tipado",
    titulo: "Testing Tipado",
    descripcion: "Escribe tests completos con TypeScript.",
    modulo: 8,
    moduloNombre: "Proyecto Final",
    orden: 3,
    duracion: "20 min",
    icono: "Zap",
    contenido: `## Testing con TypeScript

\`\`\`typescript
// types.ts
export interface Resultado<T> {
  exito: boolean;
  datos?: T;
  error?: string;
}

// servicio.ts
export function dividir(a: number, b: number): Resultado<number> {
  if (b === 0) {
    return { exito: false, error: "Division por cero" };
  }
  return { exito: true, datos: a / b };
}

// servicio.test.ts
describe("dividir", () => {
  it("divide dos numeros", () => {
    const resultado = dividir(10, 2);
    expect(resultado.exito).toBe(true);
    expect(resultado.datos).toBe(5);
  });

  it("retorna error al dividir por cero", () => {
    const resultado = dividir(10, 0);
    expect(resultado.exito).toBe(false);
    expect(resultado.error).toBe("Division por cero");
  });
});
\`\`\`

## Type safety en tests

\`\`\`typescript
// Tipar el contexto de test
interface TestContext {
  db: Database;
  usuario: Usuario;
}

describe("Usuarios", () => {
  const ctx: TestContext = {} as TestContext;

  beforeEach(() => {
    ctx.db = crearDB();
    ctx.usuario = crearUsuario();
  });

  it("obtiene usuario", async () => {
    const resultado = await ctx.db.obtener(ctx.usuario.id);
    expect(resultado).toBeDefined();
  });
});
\`\`\``,
    ejercicio: {
      descripcion: "Escribe tests para una funcion crearUsuario tipada.",
      codigoInicial: `// Implementa
interface Usuario {
  id: string;
  nombre: string;
  email: string;
}

function crearUsuario(nombre: string, email: string): Usuario {
  // Implementa
}

// Escribe 3 tests
`,
      codigoSolucion: `interface Usuario {
  id: string;
  nombre: string;
  email: string;
}

function crearUsuario(nombre: string, email: string): Usuario {
  return {
    id: crypto.randomUUID(),
    nombre,
    email
  };
}

// Tests
const usuario = crearUsuario("Ana", "a@b.com");
console.log(typeof usuario.id === "string" ? "PASS id" : "FAIL id");
console.log(usuario.nombre === "Ana" ? "PASS nombre" : "FAIL nombre");
console.log(usuario.email === "a@b.com" ? "PASS email" : "FAIL email");`,
      tests: [
        {
          descripcion: "retorna objeto con id",
          codigo: `typeof crearUsuario("a", "b@b.com").id === "string"`,
        },
        {
          descripcion: "retorna objeto con nombre",
          codigo: `crearUsuario("Ana", "b@b.com").nombre === "Ana"`,
        },
        {
          descripcion: "Se ejecutaron 3 console.log",
          codigo: `__logs.length >= 3`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Test-writer", puntos: 15 },
  },
  {
    id: "deploy-config",
    titulo: "Configuracion y Deploy",
    descripcion: "Configura tu proyecto para produccion.",
    modulo: 8,
    moduloNombre: "Proyecto Final",
    orden: 4,
    duracion: "20 min",
    icono: "Zap",
    contenido: `## tsconfig.json para produccion

\`\`\`json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
\`\`\`

## Scripts de package.json

\`\`\`json
{
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "lint": "tsc --noEmit",
    "test": "vitest"
  }
}
\`\`\`

## Estructura de proyecto

\`\`\`
src/
  types/          # Tipos e interfaces
  services/       # Logica de negocio
  utils/          # Funciones utilitarias
  validators/     # Validaciones runtime
  index.ts        # Punto de entrada

tests/
  services/       # Tests de servicios
  utils/          # Tests de utilidades
\`\`\`

## CI/CD

\`\`\`yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run build
\`\`\``,
    ejercicio: {
      descripcion: "Configura tsconfig.json con strict mode y scripts de build.",
      codigoInicial: `// Completa el tsconfig.json
{
  "compilerOptions": {
    // Agrega: target, strict, outDir, rootDir
  }
}
`,
      codigoSolucion: `{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}`,
      tests: [
        {
          descripcion: "strict es true",
          codigo: `strict === true`,
        },
        {
          descripcion: "target es ES2022",
          codigo: `target === "ES2022"`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Deploy-master", puntos: 15 },
  },
  {
    id: "resumen-final",
    titulo: "Resumen del Curso",
    descripcion: "Repasa todo lo aprendido en el curso.",
    modulo: 8,
    moduloNombre: "Proyecto Final",
    orden: 5,
    duracion: "15 min",
    icono: "Zap",
    contenido: `## Felicitaciones!

Has completado el curso de TypeScript. Aqui esta un resumen de todo lo aprendido.

## Modulo 1: Fundamentos
- Tipos basicos, interfaces, clases, enums
- Type assertions, tipos literales
- Destructuring, spread/rest

## Modulo 2: Funciones
- Tipado de parametros y retorno
- Sobrecarga de funciones
- Funciones como tipos

## Modulo 3: Interfaces y Clases
- Diferencia interface vs type
- Herencia, implementacion
- Propiedades y metodos abstractos

## Modulo 4: Tipos Avanzados
- Generics con constraints
- Utility types (Partial, Pick, Omit, Record)
- Mapped types, conditional types
- Template literal types, infer

## Modulo 5: Modulos y Namespaces
- ES6 modules, imports/exports
- Ambient declarations (.d.ts)
- Imports dinamicos
- Module resolution

## Modulo 6: Asincronia
- Promesas y Promise.all
- Async/await y manejo de errores
- Generators e iteradores

## Modulo 7: Patrones y Buenas Practicas
- Singleton, Factory, Observer
- Decorators
- Convenciones de codigo

## Modulo 8: Proyecto Final
- Diseno de API tipada
- Validacion runtime
- Testing y deploy

## Proximo paso

Aplica lo aprendido en proyectos reales. Crea tu propia libreria o contribuye a open source.`,
    ejercicio: {
      descripcion: "Crea una funcion que retorne un objeto resumen del curso.",
      codigoInicial: `// Crea la funcion
function resumenCurso() {
  // Retorna un objeto con modulos, lecciones y total
}

console.log(resumenCurso());
`,
      codigoSolucion: `function resumenCurso() {
  return {
    titulo: "Curso de TypeScript",
    modulos: 8,
    lecciones: 40,
    totalHoras: 12,
    completado: true
  };
}

console.log(resumenCurso());`,
      tests: [
        {
          descripcion: "retorna objeto",
          codigo: `typeof resumenCurso() === "object"`,
        },
        {
          descripcion: "tiene modulos = 8",
          codigo: `resumenCurso().modulos === 8`,
        },
        {
          descripcion: "Se ejecuto console.log",
          codigo: `__logs.length >= 1`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "TS-Master", puntos: 20 },
  },
];

export function getLeccionById(id: string) {
  return lecciones.find((l) => l.id === id);
}

export function getLeccionesByModulo(moduloId: number) {
  return lecciones
    .filter((l) => l.modulo === moduloId)
    .sort((a, b) => a.orden - b.orden);
}

export function getProgresoTotal(completadas: string[]) {
  if (lecciones.length === 0) return 0;
  return Math.round((completadas.length / lecciones.length) * 100);
}
