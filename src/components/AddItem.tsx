import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { boardState } from '../atom';
import { motion, Variants } from 'framer-motion';

const Wrapper = styled(motion.div)`
  width: 100%;
  padding: 10px 20px;
  box-sizing: border-box;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  border: 0.1px solid #b3c2d3;
  box-shadow: 0px 4px 3px 0px #66666681;
  margin-bottom: 15px;
`;

const Content = styled.textarea`
  resize: none;
  border: none;
  outline: none;
  width: 100%;
  font-size: 16px;
  font-weight: 400;
  font-family: 'Noto Sans', 'Noto Sans KR', sans-serif;
  &::-webkit-scrollbar {
    display: none;
  }
`;

interface INewItem {
  newItem: string;
}

interface IProps {
  boardId: string;
  setAdd: Function;
}

const Variant: Variants = {
  initial: {
    opacity: 0,
    y: -10,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      duration: 1,
      stiffness: 400,
    },
  },
  exit: {
    opacity: 0,
    y: 0,
    rotateX: 90,
  },
};

const AddItem = ({ boardId, setAdd }: IProps) => {
  const { register, handleSubmit, setValue } = useForm<INewItem>();
  const setBoardState = useSetRecoilState(boardState);
  const formRef = useRef<HTMLFormElement>(null);
  const textRef = useRef<HTMLTextAreaElement | null>(null);
  const { ref, ...rest } = register('newItem');

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
      setAdd((prev: boolean) => !prev);
    }

    if (textRef.current) {
      textRef.current.style.height = 'auto';
      textRef.current.style.height = textRef.current.scrollHeight + 'px';
    }
  };

  const onKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (textRef.current) {
      textRef.current.style.height = 'auto';
      textRef.current.style.height = textRef.current.scrollHeight + 'px';
    }
  };

  return (
    <Wrapper variants={Variant} initial="initial" animate="animate" exit="exit">
      <form ref={formRef} onSubmit={handleSubmit(onValid)}>
        <Content
          {...rest}
          ref={(e) => {
            ref(e);
            textRef.current = e;
          }}
          rows={1}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          placeholder="Please enter your details..."
        />
      </form>
    </Wrapper>
  );
};

export default AddItem;
