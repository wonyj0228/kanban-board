import { atom } from 'recoil';

/*
[
  {
    key : 'b_123456789',
    name : 'todo',
    items : [{key, text}, {} ]
  }
]
*/
interface IItem {
  id: number;
  text: string;
}

export interface IBoard {
  id: string;
  name: string;
  items: IItem[];
}

export const boardState = atom<IBoard[]>({
  key: 'boards',
  default: [],
});
