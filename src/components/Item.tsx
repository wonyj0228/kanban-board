import styled from 'styled-components';
import { IItem } from '../atom';
import { useRef } from 'react';
import { Draggable } from 'react-beautiful-dnd';

const Wrapper = styled.div`
  width: 100%;
  padding: 15px 20px;
  box-sizing: border-box;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  margin-bottom: 15px;
  white-space: pre-wrap;
  line-height: 22px;
`;

interface IProps extends IItem {
  idx: number;
}

const Item = ({ id, text, idx }: IProps) => {
  return (
    <Draggable draggableId={id} index={idx}>
      {(provided) => (
        <Wrapper
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {text}
        </Wrapper>
      )}
    </Draggable>
  );
};

export default Item;
