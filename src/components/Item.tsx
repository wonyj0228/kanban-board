import styled from 'styled-components';
import { IItem } from '../atom';
import { useEffect, useRef } from 'react';
import { Draggable } from 'react-beautiful-dnd';

const Wrapper = styled.div`
  width: 100%;
  padding: 10px 20px;
  box-sizing: border-box;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
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
`;

interface IProps extends IItem {
  idx: number;
}

const Item = ({ id, text, idx }: IProps) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = ref.current.scrollHeight + 'px';
    }
  }, []);

  return (
    <Draggable draggableId={id} index={idx}>
      {(provided) => (
        <Wrapper
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Content ref={ref} value={text} readOnly></Content>
        </Wrapper>
      )}
    </Draggable>
  );
};

export default Item;
