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
export interface IItem {
  id: string;
  text: string;
}

export interface IBoard {
  id: string;
  name: string;
  items: IItem[];
}

const initData = localStorage.getItem('to-do');

export const boardState = atom<IBoard[]>({
  key: 'boards',
  default: initData ? JSON.parse(initData) : [],
});
