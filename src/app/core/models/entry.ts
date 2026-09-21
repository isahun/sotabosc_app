import { Prompt } from "./prompt";

export interface Entry {
  id: number;
  title: string;
  content: string;
  prompt?: Prompt;
  createdAt: string;
}
