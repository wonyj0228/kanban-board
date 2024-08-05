import styled from 'styled-components';
import { IBoard } from '../atom';
import { Draggable } from 'react-beautiful-dnd';
import { useState } from 'react';
import AddItem from './AddItem';
import Item from './Item';

const BoardWrapper = styled.div<{ $isDragging: boolean }>`
  min-width: 300px;
  margin-right: 50px;
  background-color: ${(props) => (props.$isDragging ? '#cb7d8e85' : '#F3F3F3')};
  height: 50vh;
  border-top: ${(props) => props.theme.boardTop};
  padding: 10px 30px;
  box-shadow: ${(props) =>
    props.$isDragging ? '3px 3px 3px 3px rgba(0, 0, 0, 0.3)' : 'none'};
  overflow-y: scroll;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  margin-bottom: 20px;
`;
const TopTitle = styled.span`
  font-size: 25px;
  font-weight: bold;
`;

const TopBtnWrapper = styled.div`
  display: flex;
`;

const TopBtn = styled.div`
  width: 50px;
  text-align: center;
  cursor: pointer;
`;

interface IProps extends IBoard {
  idx: number;
}

const Board = ({ id, items, name, idx }: IProps) => {
  const [add, setAdd] = useState(false);
  const addOnClick = () => {
    setAdd((prev) => !prev);
  };
  return (
    <Draggable draggableId={id} index={idx}>
      {(provided, snapshot) => (
        <BoardWrapper
          ref={provided.innerRef}
          {...provided.draggableProps}
          $isDragging={snapshot.isDragging}
        >
          <Top>
            <TopTitle>{name}</TopTitle>
            <TopBtnWrapper>
              <TopBtn onClick={addOnClick}>
                {add ? (
                  <span className="material-symbols-outlined">remove</span>
                ) : (
                  <span className="material-symbols-outlined">add</span>
                )}
              </TopBtn>
              <TopBtn {...provided.dragHandleProps}>
                <span className="material-symbols-outlined">more_horiz</span>
              </TopBtn>
            </TopBtnWrapper>
          </Top>
          {add ? <AddItem boardId={id} /> : null}
          {items.map((item) => (
            <Item key={item.id} {...item} />
          ))}
        </BoardWrapper>
      )}
    </Draggable>
  );
};

export default Board;
