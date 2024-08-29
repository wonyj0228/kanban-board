import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

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

const { persistAtom } = recoilPersist({
  key: 'to-do',
  storage: localStorage,
});

export const boardState = atom<IBoard[]>({
  key: 'boards',
  default: [],
  effects_UNSTABLE: [persistAtom],
});
