import styled from 'styled-components';
import { IBoard } from '../atom';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { memo, useState } from 'react';
import AddItem from './AddItem';
import Item from './Item';
import { AnimatePresence, motion } from 'framer-motion';

const BoardWrapper = styled.div<{ $isDragging: boolean }>`
  height: 50vh;
  min-width: 300px;
  margin-right: 50px;
  background-color: ${(props) =>
    props.$isDragging ? '#cb7d8e85' : props.theme.boardBgColor};
  border-top: ${(props) => props.theme.boardTop};
  padding: 10px 30px;
  box-shadow: ${(props) =>
    props.$isDragging ? '3px 3px 3px 3px rgba(0, 0, 0, 0.3)' : 'none'};
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

const Items = styled.div`
  height: calc(50vh - 70px);
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: #666;
    border-radius: 20px;
  }
  &::-webkit-scrollbar-track {
    background: #ddd;
    border-radius: 20px;
  }
`;

interface IProps extends IBoard {
  idx: number;
  boardDrop: boolean;
}

const Board = ({ id, items, name, idx, boardDrop }: IProps) => {
  const [add, setAdd] = useState(false);
  const addOnClick = () => {
    setAdd((prev) => !prev);
  };
  return (
    <motion.div initial={{ y: -20 }} animate={{ y: 0 }}>
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
            <Droppable droppableId={`${id}`} isDropDisabled={boardDrop}>
              {(provided) => (
                <Items ref={provided.innerRef} {...provided.droppableProps}>
                  <AnimatePresence>
                    {add ? <AddItem boardId={id} setAdd={setAdd} /> : null}
                  </AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: {
                        delay: 0.3,
                        type: 'spring',
                      },
                    }}
                  >
                    {items.map((item, idx) => (
                      <Item key={item.id} {...item} idx={idx} />
                    ))}
                  </motion.div>
                  {provided.placeholder}
                </Items>
              )}
            </Droppable>
          </BoardWrapper>
        )}
      </Draggable>
    </motion.div>
  );
};

export default memo(Board);
