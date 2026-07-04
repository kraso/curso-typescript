export interface Lesson {
  id: string;
  titulo: string;
  descripcion: string;
  modulo: number;
  moduloNombre: string;
  orden: number;
  duracion: string;
  icono: string;
  contenido: string;
  ejercicio: Exercise;
  completada: boolean;
  recompensa: Reward;
}

export interface Exercise {
  descripcion: string;
  codigoInicial: string;
  codigoSolucion: string;
  tests: Test[];
}

export interface Test {
  descripcion: string;
  codigo: string;
}

export interface Reward {
  insignia: string;
  puntos: number;
}

export interface Module {
  id: number;
  slug: string;
  titulo: string;
  descripcion: string;
  icono: string;
  orden: number;
  lecciones: string[];
}

export interface UserProgress {
  leccionesCompletadas: string[];
  insignias: string[];
  puntos: number;
  tiempoTotal: number;
}

export interface QuizQuestion {
  pregunta: string;
  opciones: string[];
  respuestaCorrecta: number;
  explicacion: string;
}
