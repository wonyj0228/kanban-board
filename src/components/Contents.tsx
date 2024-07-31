import { useForm } from 'react-hook-form';
import { boardState } from '../atom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import Board from './Board';

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

const DeleteBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  background-color: ${(props) => props.theme.btnBgColor};
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

  const onValid = (data: INewBoard) => {
    setBoards((prev) => {
      const newBoardObj = {
        id: 'b_' + Date.now(),
        name: data.boardName,
        items: [],
      };
      return [...prev, newBoardObj];
    });
    setValue('boardName', '');
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
          return newBoards;
        });
      }
      //2. 아이템삭제
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
            return newBoards;
          });
        }
      }
      // 2. 아이템순서
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

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="boardBox" direction="horizontal">
          {(provided) => (
            <Boards {...provided.droppableProps} ref={provided.innerRef}>
              {boards.map((board, idx) => (
                <Board key={board.id} {...board} idx={idx} />
              ))}
              {provided.placeholder}
            </Boards>
          )}
        </Droppable>

        {boards.length > 0 ? (
          <Droppable droppableId="delete">
            {(provided) => (
              <DeleteBox {...provided.droppableProps} ref={provided.innerRef}>
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
