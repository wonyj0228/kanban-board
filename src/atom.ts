import { atom } from 'recoil';

/*
{
    123546521 : {
        name : 'todo',
        todo : [{key, text}, {} ]
    }
}
*/
interface IToDo {
  key: number;
  text: string;
}

interface IBoard {
  name: string;
  todo: IToDo[];
}

interface IBoards {
  [key: number]: IBoard;
}

export const boardState = atom<IBoards>({
  key: 'boards',
  default: {},
});
