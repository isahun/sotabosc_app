import { Prompt } from '../models/prompt';

export const prompts: Prompt[] = [
  {
    id: 1,
    text: 'Quina versió de tu existeix només quan estàs sola? Descriu-la sense jutjar-la.',
    categories: ['journal'],
    tags: ['identity'],
  },
  {
    id: 2,
    text: 'Comença amb: «No recordo haver decidit convertir-me en aquesta persona.» Escriu durant 7 minuts sense tornar enrere.',
    categories: ['automatic'],
    tags: ['identity', 'time'],
  },
  {
    id: 3,
    text: 'Escriu un poema sobre alguna cosa que has perdut sense utilitzar mai les paraules «perdre», «absència», «trobar» ni «record».',
    categories: ['poetry', 'journal'],
    tags: ['loss', 'constraint'],
  },
];
