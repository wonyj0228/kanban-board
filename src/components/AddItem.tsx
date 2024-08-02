import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { boardState } from '../atom';

const Wrapper = styled.div`
  width: 100%;
  padding: 10px 20px;
  box-sizing: border-box;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  border: 0.1px solid #b3c2d3;
  box-shadow: 0px 4px 3px 0px #66666681;
`;

const Content = styled.textarea`
  resize: none;
  border: none;
  outline: none;
  width: 100%;
  font-size: 16px;
  font-weight: 400;
  font-family: 'Noto Sans', 'Noto Sans KR', sans-serif;
`;

interface INewItem {
  newItem: string;
}

const AddItem = ({ boardId }: { boardId: string }) => {
  const { register, handleSubmit, setValue } = useForm<INewItem>();
  const setBoardState = useSetRecoilState(boardState);
  const formRef = useRef<HTMLFormElement>(null);

  const onValid = (e: INewItem) => {
    setBoardState((prevState) => {
      const idx = prevState.findIndex((board) => board.id === boardId);
      const item = {
        id: 'i_' + Date.now(),
        text: e.newItem,
      };
      const newItems = [...prevState[idx].items, item];
      const newBoards = { ...prevState[idx], items: newItems };
      const newState = [...prevState];
      newState[idx] = newBoards;

      localStorage.setItem('to-do', JSON.stringify(newState));
      setValue('newItem', '');
      return newState;
    });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.code === 'Enter' && !e.shiftKey) {
      if (e.nativeEvent.isComposing) {
        return;
      }
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  return (
    <Wrapper>
      <form ref={formRef} onSubmit={handleSubmit(onValid)}>
        <Content
          {...register('newItem')}
          onKeyDown={onKeyDown}
          placeholder="Please enter your details..."
        />
      </form>
    </Wrapper>
  );
};

export default AddItem;
