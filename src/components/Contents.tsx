import { useForm } from 'react-hook-form';
import { boardState } from '../atom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import {
  DragDropContext,
  DragStart,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import Board from './Board';
import { useState } from 'react';

const Wrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px 20px;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.bodyBgColor};
`;

const NewBoardForm = styled.form`
  height: 40px;
  margin-bottom: 40px;
  display: flex;
`;
const NewBoardInput = styled.input`
  width: 40%;
  min-width: 350px;
  margin-right: 20px;
  padding: 5px 30px;
  box-sizing: border-box;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
`;
const NewBoardBtn = styled.button`
  width: 40px;
  background-color: white;
  border: none;
  border-radius: 10px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.3);
  cursor: pointer;
`;

const DeleteBox = styled.div<{ $isDraggingOver: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  background-color: ${(props) =>
    props.$isDraggingOver ? '#e56b6f' : props.theme.btnBgColor};
  border-radius: 10px;
  span {
    font-size: 50px;
  }
`;
const Boards = styled.div`
  display: flex;
  margin-bottom: 40px;
  padding-bottom: 40px;
  overflow-x: auto;
  &::-webkit-scrollbar {
    height: 10px;
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

interface INewBoard {
  boardName: string;
}

const Contents = () => {
  const { register, setValue, handleSubmit } = useForm<INewBoard>();
  const [boards, setBoards] = useRecoilState(boardState);
  const [boardsDrop, setBoardsDrop] = useState(false);
  const [boardDrop, setBoardDrop] = useState(false);

  const onValid = (data: INewBoard) => {
    setBoards((prev) => {
      const newBoardObj = {
        id: 'b_' + Date.now(),
        name: data.boardName,
        items: [],
      };
      localStorage.setItem('to-do', JSON.stringify([...prev, newBoardObj]));
      return [...prev, newBoardObj];
    });
    setValue('boardName', '');
  };

  const onBeforeDragStart = (e: DragStart) => {
    const moveType = e.draggableId.split('_')[0];
    if (moveType === 'b') {
      setBoardsDrop(false);
      setBoardDrop(true);
    } else if (moveType === 'i') {
      setBoardsDrop(true);
      setBoardDrop(false);
    }
  };

  const onDragEnd = (info: DropResult) => {
    if (!info.destination) return;

    const { destination, source, draggableId } = info;
    const draggableType = draggableId.split('_')[0];

    // 삭제
    if (destination.droppableId === 'delete') {
      //1. 게시판 삭제
      if (draggableType === 'b') {
        setBoards((prevBoards) => {
          const newBoards = [...prevBoards];
          newBoards.splice(source.index, 1);
          localStorage.setItem('to-do', JSON.stringify(newBoards));
          return newBoards;
        });
        //2. 아이템삭제
      } else if (draggableType === 'i') {
        setBoards((prevBoards) => {
          const boardIdx = prevBoards.findIndex(
            (board) => board.id === source.droppableId
          );
          const newBoard = [...prevBoards];
          const sourceBoard = { ...prevBoards[boardIdx] };
          const sourceItems = [...sourceBoard.items];
          sourceItems.splice(source.index, 1);
          sourceBoard.items = sourceItems;
          newBoard.splice(boardIdx, 1, sourceBoard);
          localStorage.setItem('to-do', JSON.stringify(newBoard));
          return newBoard;
        });
      }

      /////////////////////
      // 순서바꿈
    } else {
      //1. 게시판 순서
      if (draggableType === 'b') {
        if (source.index !== destination.index) {
          setBoards((prevBoards) => {
            const newBoards = [...prevBoards];
            const moveObj = newBoards[source.index];
            newBoards.splice(source.index, 1);
            newBoards.splice(destination.index, 0, moveObj);
            localStorage.setItem('to-do', JSON.stringify(newBoards));
            return newBoards;
          });
        }
        // 2. 아이템순서
      } else if (draggableType === 'i') {
        if (source.droppableId === destination.droppableId) {
          // 같은보드
          setBoards((prevBoards) => {
            const newBoards = [...prevBoards];
            const boardIdx = prevBoards.findIndex(
              (board) => board.id === source.droppableId
            );
            const targetBoard = { ...newBoards[boardIdx] };
            const targetItems = [...targetBoard.items];
            const moveItem = targetItems[source.index];
            targetItems.splice(source.index, 1);
            targetItems.splice(destination.index, 0, moveItem);
            targetBoard.items = targetItems;
            newBoards.splice(boardIdx, 1, targetBoard);

            localStorage.setItem('to-do', JSON.stringify(newBoards));
            return newBoards;
          });
        } else if (source.droppableId !== destination.droppableId) {
          // 다른보드
          setBoards((prevBoards) => {
            const newBoards = [...prevBoards];
            const sourceBoardIdx = prevBoards.findIndex(
              (board) => board.id === source.droppableId
            );
            const dstBoardIdx = prevBoards.findIndex(
              (board) => board.id === destination.droppableId
            );
            const moveItem = prevBoards[sourceBoardIdx].items[source.index];

            const sourceBoard = { ...newBoards[sourceBoardIdx] };
            const sourceBoardItems = [...sourceBoard.items];
            sourceBoardItems.splice(source.index, 1);
            sourceBoard.items = sourceBoardItems;

            const dstBoard = { ...newBoards[dstBoardIdx] };
            const dstBoardItems = [...dstBoard.items];
            dstBoardItems.splice(destination.index, 0, moveItem);
            dstBoard.items = dstBoardItems;

            newBoards[sourceBoardIdx] = sourceBoard;
            newBoards[dstBoardIdx] = dstBoard;

            localStorage.setItem('to-do', JSON.stringify(newBoards));
            return newBoards;
          });
        }
      }
    }
  };

  return (
    <Wrapper>
      <NewBoardForm onSubmit={handleSubmit(onValid)}>
        <NewBoardInput
          {...register('boardName', { required: true })}
          placeholder="Please enter a new board name..."
        />
        <NewBoardBtn>
          <span className="material-symbols-outlined">add</span>
        </NewBoardBtn>
      </NewBoardForm>

      <DragDropContext
        onDragEnd={onDragEnd}
        onBeforeDragStart={onBeforeDragStart}
      >
        <Droppable
          droppableId="boardBox"
          direction="horizontal"
          isDropDisabled={boardsDrop}
        >
          {(provided) => (
            <Boards {...provided.droppableProps} ref={provided.innerRef}>
              {boards.map((board, idx) => (
                <Board
                  key={board.id}
                  {...board}
                  idx={idx}
                  boardDrop={boardDrop}
                />
              ))}
              {provided.placeholder}
            </Boards>
          )}
        </Droppable>

        {boards.length > 0 ? (
          <Droppable droppableId="delete">
            {(provided, snapshot) => (
              <DeleteBox
                {...provided.droppableProps}
                ref={provided.innerRef}
                $isDraggingOver={snapshot.isDraggingOver}
              >
                <span className="material-symbols-outlined">delete</span>
              </DeleteBox>
            )}
          </Droppable>
        ) : null}
      </DragDropContext>
    </Wrapper>
  );
};

export default Contents;
