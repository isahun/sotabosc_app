export type Category = 'journal' | 'automatic' | 'poetry' | 'free';

export interface Prompt {
  id: number;
  text: string;
  categories: Category[];
  tags: string[];
}

