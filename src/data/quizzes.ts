import { QuizQuestion } from "@/types/course";

export interface ModuleQuiz {
  moduloId: number;
  titulo: string;
  preguntas: QuizQuestion[];
}

export const quizzes: ModuleQuiz[] = [
  {
    moduloId: 1,
    titulo: "Fundamentos",
    preguntas: [
      {
        pregunta: "Que es TypeScript?",
        opciones: [
          "Un navegador web",
          "Un superconjunto tipado de JavaScript",
          "Un framework de CSS",
          "Un sistema de bases de datos",
        ],
        respuestaCorrecta: 1,
        explicacion: "TypeScript es un superconjunto tipado de JavaScript desarrollado por Microsoft.",
      },
      {
        pregunta: "Cual es la diferencia entre 'let' y 'var'?",
        opciones: [
          "No hay diferencia",
          "'let' tiene scope de bloque, 'var' tiene scope de funcion",
          "'var' es mas rapido que 'let'",
          "'let' solo sirve para strings",
        ],
        respuestaCorrecta: 1,
        explicacion: "'let' tiene scope de bloque, lo que lo hace mas predecible que 'var'.",
      },
      {
        pregunta: "Que hace la inferencia de tipos?",
        opciones: [
          "Elimina todos los tipos del codigo",
          "Asigna tipos automaticamente basado en el valor",
          "Convierte JavaScript a TypeScript",
          "Valida tipos en tiempo de ejecucion",
        ],
        respuestaCorrecta: 1,
        explicacion: "TypeScript infiere (adivina) los tipos basandose en los valores asignados.",
      },
      {
        pregunta: "Cual es la forma correcta de declarar un tipo alias?",
        opciones: [
          "type MiTipo = string",
          "alias MiTipo = string",
          "typedef MiTipo = string",
          "class MiTipo = string",
        ],
        respuestaCorrecta: 0,
        explicacion: "Se usa la palabra reservada 'type' para crear un alias de tipo.",
      },
    ],
  },
  {
    moduloId: 2,
    titulo: "Funciones",
    preguntas: [
      {
        pregunta: "Como se define el tipo de retorno de una funcion?",
        opciones: [
          "function sumar(): number {}",
          "function sumar() -> number {}",
          "function sumar() => number {}",
          "function sumar(): return number {}",
        ],
        respuestaCorrecta: 0,
        explicacion: "Se coloca dos puntos despues de los parentesis y antes de la llave de apertura.",
      },
      {
        pregunta: "Que son los parametros opcionales?",
        opciones: [
          "Parametros que siempre son requeridos",
          "Parametros que pueden ser omitidos al llamar la funcion",
          "Parametros que solo aceptan undefined",
          "Parametros que se repiten multiples veces",
        ],
        respuestaCorrecta: 1,
        explicacion: "Los parametros opcionales se marcan con '?' y pueden omitirse.",
      },
      {
        pregunta: "Que hace 'rest parameters'?",
        opciones: [
          "Elimina parametros de una funcion",
          "Permite recibir argumentos infinitos como array",
          "Hace los parametros obligatorios",
          "Convierte parametros a strings",
        ],
        respuestaCorrecta: 1,
        explicacion: "Rest parameters (...) permite recibir multiples argumentos como un array.",
      },
      {
        pregunta: "Cuantas definiciones puede tener una funcion sobrecargada?",
        opciones: [
          "Solo una",
          "Exactamente dos",
          "Multiples",
          "Ninguna, es ilegal",
        ],
        respuestaCorrecta: 2,
        explicacion: "Una funcion sobrecargada puede tener multiples firmas de tipo.",
      },
    ],
  },
  {
    moduloId: 3,
    titulo: "Interfaces y Clases",
    preguntas: [
      {
        pregunta: "Cual es la diferencia principal entre 'interface' y 'type'?",
        opciones: [
          "No hay diferencia",
          "Interface puede ser extendida, type no",
          "Type es mas rapido que interface",
          "Interface solo sirve para objetos",
        ],
        respuestaCorrecta: 1,
        explicacion: "Las interfaces se pueden extender y merge, los types no (pero si se pueden combinar).",
      },
      {
        pregunta: "Que palabra reservada se usa para heredar en clases?",
        opciones: [
          "inherits",
          "extends",
          "implements",
          "super",
        ],
        respuestaCorrecta: 1,
        explicacion: "'extends' se usa para heredar de otra clase.",
      },
      {
        pregunta: "Que hace 'private' en una clase?",
        opciones: [
          "Hace la propiedad publica",
          "Solo permite acceso dentro de la clase",
          "Permite acceso desde cualquier archivo",
          "Hace la propiedad estatica",
        ],
        respuestaCorrecta: 1,
        explicacion: "'private' restringe el acceso solo a la misma clase.",
      },
      {
        pregunta: "Que es una clase abstracta?",
        opciones: [
          "Una clase que no puede ser instanciada directamente",
          "Una clase sin propiedades",
          "Una clase que solo tiene metodos privados",
          "Una clase que se elimina en compilacion",
        ],
        respuestaCorrecta: 0,
        explicacion: "Las clases abstractas no se pueden instanciar, solo se pueden heredar.",
      },
    ],
  },
  {
    moduloId: 4,
    titulo: "Tipos Avanzados",
    preguntas: [
      {
        pregunta: "Que permiten los Generics?",
        opciones: [
          "Eliminar tipos del codigo",
          "Crear componentes reutilizables con tipos flexibles",
          "Convierte TypeScript a JavaScript",
          "Hace el codigo mas lento",
        ],
        respuestaCorrecta: 1,
        explicacion: "Los generics permiten crear funciones, clases e interfaces que funcionan con cualquier tipo.",
      },
      {
        pregunta: "Que hace 'Partial<T>'?",
        opciones: [
          "Hace todas las propiedades obligatorias",
          "Hace todas las propiedades opcionales",
          "Elimina todas las propiedades",
          "Convierte el tipo a string",
        ],
        respuestaCorrecta: 1,
        explicacion: "Partial<T> convierte todas las propiedades de un tipo a opcionales.",
      },
      {
        pregunta: "Que son los Mapped Types?",
        opciones: [
          "Un tipo que mapea arrays",
          "Un tipo que transforma propiedades iterando sobre ellas",
          "Un tipo que solo acepta numeros",
          "Un tipo para mapear rutas",
        ],
        respuestaCorrecta: 1,
        explicacion: "Los mapped types crean nuevos tipos iterando sobre las propiedades de uno existente.",
      },
      {
        pregunta: "Que hace 'infer' dentro de un tipo condicional?",
        opciones: [
          "Elimina el tipo",
          "Extrae un tipo de dentro de otro tipo",
          "Convierte a any",
          "Infiere el valor en runtime",
        ],
        respuestaCorrecta: 1,
        explicacion: "'infer' permite extraer y capturar un tipo dentro de un patron.",
      },
    ],
  },
  {
    moduloId: 5,
    titulo: "Modulos y Namespaces",
    preguntas: [
      {
        pregunta: "Cual es la forma moderna de organizar codigo en TypeScript?",
        opciones: [
          "Namespaces",
          "Modulos ES6",
          "Globales",
          "JSON",
        ],
        respuestaCorrecta: 1,
        explicacion: "Los modulos ES6 son la forma estandar y moderna de organizar codigo.",
      },
      {
        pregunta: "Que hace un archivo '.d.ts'?",
        opciones: [
          "Ejecuta codigo JavaScript",
          "Declara tipos para codigo externo",
          "Elimina tipos del proyecto",
          "Crea un servidor web",
        ],
        respuestaCorrecta: 1,
        explicacion: "Los archivos .d.ts declaran tipos para codigo que no tiene typings propios.",
      },
      {
        pregunta: "Que ventaja tienen los imports dinamicos?",
        opciones: [
          "Son mas seguros",
          "Cargan modulos bajo demanda, mejorando rendimiento",
          "Eliminan la necesidad de tipos",
          "Funcionan sin JavaScript",
        ],
        respuestaCorrecta: 1,
        explicacion: "Los imports dinamicos permiten cargar modulos solo cuando se necesitan.",
      },
      {
        pregunta: "Que hace 'export default'?",
        opciones: [
          "Exporta todas las variables",
          "Exporta un valor principal del modulo",
          "Elimina el modulo",
          "Importa un modulo",
        ],
        respuestaCorrecta: 1,
        explicacion: "Export default define el valor principal que se exporta de un modulo.",
      },
    ],
  },
  {
    moduloId: 6,
    titulo: "Asincronia",
    preguntas: [
      {
        pregunta: "Que estados puede tener una Promise?",
        opciones: [
          "Solo exitoso",
          "Pending, Fulfilled, Rejected",
          "Abierto, Cerrado",
          "Verdadero, Falso",
        ],
        respuestaCorrecta: 1,
        explicacion: "Una Promise tiene 3 estados: pending, fulfilled y rejected.",
      },
      {
        pregunta: "Que hace 'async/await'?",
        opciones: [
          "Elimina las Promises",
          "Hace que el codigo asincrono parezca sincrono",
          "Convierte todo a callbacks",
          "Hace el codigo mas lento",
        ],
        respuestaCorrecta: 1,
        explicacion: "async/await es azucar sintactico que simplifica el trabajo con Promises.",
      },
      {
        pregunta: "Que hace 'Promise.all'?",
        opciones: [
          "Ejecuta promesas una por una",
          "Espera a que TODAS las promesas se resuelvan",
          "Retorna la primera promesa resuelta",
          "Elimina las promesas fallidas",
        ],
        respuestaCorrecta: 1,
        explicacion: "Promise.all espera a que todas las promesas se completen exitosamente.",
      },
      {
        pregunta: "Que es un Generator?",
        opciones: [
          "Una funcion que genera numeros aleatorios",
          "Una funcion que puede pausar y reanudar su ejecucion",
          "Un tipo de variable",
          "Un operador logico",
        ],
        respuestaCorrecta: 1,
        explicacion: "Los generators usan 'yield' para pausar y reanudar la ejecucion.",
      },
    ],
  },
  {
    moduloId: 7,
    titulo: "Patrones y Buenas Practicas",
    preguntas: [
      {
        pregunta: "Que hace el patron Singleton?",
        opciones: [
          "Crea multiples instancias",
          "Asegura que solo exista una instancia de una clase",
          "Elimina todas las instancias",
          "Convierte clases a funciones",
        ],
        respuestaCorrecta: 1,
        explicacion: "El Singleton garantiza una unica instancia de una clase en toda la aplicacion.",
      },
      {
        pregunta: "Que es un Type Guard?",
        opciones: [
          "Un tipo que protege contra errores",
          "Una funcion que valida tipos en runtime",
          "Un tipo que solo acepta strings",
          "Un guardia de seguridad del navegador",
        ],
        respuestaCorrecta: 1,
        explicacion: "Un Type Guard valida y narrow el tipo en tiempo de ejecucion.",
      },
      {
        pregunta: "Que hace un Decorator?",
        opciones: [
          "Elimina clases",
          "Modifica clases y metodos de forma declarativa",
          "Convierte clases a funciones",
          "Crea tipos nuevos",
        ],
        respuestaCorrecta: 1,
        explicacion: "Los decorators permiten modificar comportamiento de clases y metodos.",
      },
      {
        pregunta: "Como se nombran las constantes en TypeScript?",
        opciones: [
          "camelCase",
          "snake_case",
          "UPPER_SNAKE_CASE",
          "PascalCase",
        ],
        respuestaCorrecta: 2,
        explicacion: "Las constantes usan UPPER_SNAKE_CASE por convencion.",
      },
    ],
  },
  {
    moduloId: 8,
    titulo: "Proyecto Final",
    preguntas: [
      {
        pregunta: "Que es un Resultado tipado?",
        opciones: [
          "Un tipo que siempre es exitoso",
          "Un tipo que puede representar exito o error",
          "Un tipo para numeros",
          "Un tipo para strings",
        ],
        respuestaCorrecta: 1,
        explicacion: "Un Resultado tipado usa union types para representar exito o error.",
      },
      {
        pregunta: "Por que es importante la validacion en runtime?",
        opciones: [
          "TypeScript valida todo en compile-time",
          "Los tipos se eliminan en runtime, hay que validar",
          "No es importante",
          "Solo sirve para testing",
        ],
        respuestaCorrecta: 1,
        explicacion: "Los tipos de TypeScript se eliminan al compilar, por eso hay que validar en runtime.",
      },
      {
        pregunta: "Que es un 'type guard'?",
        opciones: [
          "Un guardia de seguridad",
          "Una funcion que afirma un tipo en runtime",
          "Un tipo de variable",
          "Un operador logico",
        ],
        respuestaCorrecta: 1,
        explicacion: "Un type guard es una funcion que valida y afirma un tipo en runtime.",
      },
      {
        pregunta: "Cual es la mejor forma de manejar errores en async/await?",
        opciones: [
          "Ignorarlos",
          "Usar try/catch",
          "Usar console.log",
          "Lanzar新的 Promises",
        ],
        respuestaCorrecta: 1,
        explicacion: "try/catch es la forma recomendada de manejar errores con async/await.",
      },
    ],
  },
];

export function getQuizByModulo(moduloId: number): ModuleQuiz | undefined {
  return quizzes.find((q) => q.moduloId === moduloId);
}
