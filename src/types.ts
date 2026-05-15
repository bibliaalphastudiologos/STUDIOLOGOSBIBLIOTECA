/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum Grade {
  EF6 = '6º Ano Fundamental',
  EF7 = '7º Ano Fundamental',
  EM2 = '2ª Série Médio',
  EM3 = '3ª Série Médio',
}

export enum PageType {
  COVER = 'cover',
  CALENDAR = 'calendar',
  DIVIDER = 'divider',
  UNIT = 'unit',
  ASSESSMENT = 'assessment',
  WRITING = 'writing',
}

export interface Exercise {
  id: string;
  question: string;
  options: string[];
  correctOption: number;
  explanation: string;
  difficulty: 'Básico' | 'Intermediário' | 'Avançado';
  skill: string;
  examStyle?: 'SARESP' | 'AAP' | 'SAEB' | 'ENEM' | 'Provão Paulista';
}

export interface Unit {
  id: string;
  title: string;
  grade: Grade;
  bimester: 1 | 2 | 3 | 4;
  skills: string[];
  competencies: string[];
  objectives: string[];
  content: string;
  examples: string[];
  exercises: Exercise[];
  curiosity?: string;
  everydayPortuguese?: string;
  visualSummary?: string[];
  mentalMap?: string[];
  teacherInstructions?: string[];
  assessmentItems?: string[];
  dynamic?: string;
  textProduction?: string;
  mentalMapUrl?: string;
}

export interface ScheduleSlot {
  day: string;
  period: string;
  time: string;
  type: 'Aula' | 'ATPC' | 'Folga';
  activity: string;
  grade?: Grade;
}

export interface PageMetadata {
  type: PageType;
  grade?: Grade;
  bimester?: number;
  unitId?: string;
  virtualPageStart: number;
  virtualPageEnd: number;
}
