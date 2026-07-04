import { Module } from "@/types/course";

export const modulos: Module[] = [
  {
    id: 1,
    slug: "fundamentos",
    titulo: "Fundamentos",
    descripcion: "Tipos basicos, variables, inferencia y aliases",
    icono: "BookOpen",
    orden: 1,
    lecciones: [
      "que-es-typescript",
      "instalacion-configuracion",
      "tipos-basicos",
      "variables-const-let",
      "strings-numeros-booleans",
      "arrays-y-tuples",
      "objetos-y-interfaces",
      "union-types",
      "type-alias",
      "type-inference",
    ],
  },
  {
    id: 2,
    slug: "funciones",
    titulo: "Funciones",
    descripcion: "Parametros, retorno, sobrecargas y más",
    icono: "Code2",
    orden: 2,
    lecciones: [
      "parametros-tipados",
      "tipo-de-retorno",
      "opcionales-default",
      "rest-parameters",
      "function-overloads",
    ],
  },
  {
    id: 3,
    slug: "interfaces-y-clases",
    titulo: "Interfaces y Clases",
    descripcion: "OOP en TypeScript",
    icono: "Layers",
    orden: 3,
    lecciones: [
      "interfaces-basicas",
      "extends-herencia",
      "clases-en-ts",
      "access-modifiers",
      "abstract-classes",
    ],
  },
  {
    id: 4,
    slug: "tipos-avanzados",
    titulo: "Tipos Avanzados",
    descripcion: "Generics, utility types, mapped types",
    icono: "Zap",
    orden: 4,
    lecciones: [
      "generics",
      "utility-types",
      "mapped-types",
      "conditional-types",
      "template-literal-types",
      "infer-keyword",
    ],
  },
  {
    id: 5,
    slug: "modulos-y-namespaces",
    titulo: "Modulos y Namespaces",
    descripcion: "Import/export y declaration files",
    icono: "Database",
    orden: 5,
    lecciones: [
      "import-export",
      "declaration-files",
      "triple-slash-directives",
      "namespaces",
    ],
  },
  {
    id: 6,
    slug: "asincronia",
    titulo: "Asincronía",
    descripcion: "Promises, async/await y generators",
    icono: "GitBranch",
    orden: 6,
    lecciones: [
      "promises",
      "async-await",
      "fetch-api-ts",
      "generators",
    ],
  },
  {
    id: 7,
    slug: "patrones-y-buenas-practicas",
    titulo: "Patrones y Buenas Prácticas",
    descripcion: "Type narrowing, guards, decorators",
    icono: "Puzzle",
    orden: 7,
    lecciones: [
      "type-narrowing",
      "discriminated-unions",
      "type-guards",
      "decorators",
      "clean-code-ts",
    ],
  },
  {
    id: 8,
    slug: "proyecto-final",
    titulo: "Proyecto Final",
    descripcion: "Aplica todo lo aprendido",
    icono: "Rocket",
    orden: 8,
    lecciones: [
      "diseno-arquitectura",
      "implementacion",
      "testing",
    ],
  },
];

export function getModuloBySlug(slug: string) {
  return modulos.find((m) => m.slug === slug);
}

export function getModuloById(id: number) {
  return modulos.find((m) => m.id === id);
}

export function getTotalLecciones() {
  return modulos.reduce((sum, m) => sum + m.lecciones.length, 0);
}

export function getProgresoTotal(completadas: string[]) {
  const total = getTotalLecciones();
  if (total === 0) return 0;
  return Math.round((completadas.length / total) * 100);
}
