import React from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { styled } from 'styled-components';
import { boardState } from './atom';
import Board from './components/Board';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const Wrapper = styled.div`
  margin: 0 auto;
`;
const Header = styled.div`
  height: 100px;
  padding: 30px 20px;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.headerBgColor};
  display: flex;
  justify-content: space-between;
`;
const Title = styled.span`
  font-size: 2rem;
  font-weight: bold;
`;
const BtnMode = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.btnBgColor};
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  span {
    font-weight: bold;
    font-size: 1rem;
  }
`;

const Body = styled.div`
  padding: 30px 20px;
  box-sizing: border-box;
  height: calc(100vh - 100px);
  background-color: ${(props) => props.theme.bodyBgColor};
`;

const NewBoardForm = styled.form`
  height: 40px;
  margin-bottom: 70px;
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
  margin-top: 80px;
  cursor: pointer;
  span {
    font-size: 50px;
  }
`;
const BoardsBox = styled.div`
  display: flex;
  overflow-x: auto;
`;

interface INewBoard {
  boardName: string;
}

function App() {
  const { register, setValue, handleSubmit } = useForm<INewBoard>();
  const [boards, setBoards] = useRecoilState(boardState);
  const boardKeys = Object.keys(boards);

  const onValid = (data: INewBoard) => {
    setBoards((prev) => {
      const updateBoards = { ...prev };
      updateBoards[Date.now()] = {
        name: data.boardName,
        todo: [],
      };
      return updateBoards;
    });
    setValue('boardName', '');
  };

  const onDragEnd = (info: any) => {
    console.log(info);
  };
  const onInvalid = (error: any) => {
    console.log(error);
  };

  return (
    <Wrapper>
      <Header>
        <Title>KANBAN BOARD</Title>
        <BtnMode>
          <span>DARK🌙</span>
        </BtnMode>
      </Header>

      <Body>
        <NewBoardForm onSubmit={handleSubmit(onValid, onInvalid)}>
          <NewBoardInput
            {...register('boardName', { required: true })}
            placeholder="Please enter a new board name..."
          />
          <NewBoardBtn>
            <span className="material-symbols-outlined">add</span>
          </NewBoardBtn>
        </NewBoardForm>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="boardBox">
            {(provided) => (
              <BoardsBox {...provided.droppableProps} ref={provided.innerRef}>
                {boardKeys.map((boardKey, idx) => (
                  <Board key={boardKey} id={boardKey} idx={idx} />
                ))}
                {provided.placeholder}
              </BoardsBox>
            )}
          </Droppable>

          {boardKeys.length > 0 ? (
            <Droppable droppableId="delete">
              {(provided) => (
                <DeleteBox {...provided.droppableProps} ref={provided.innerRef}>
                  <span className="material-symbols-outlined">delete</span>
                </DeleteBox>
              )}
            </Droppable>
          ) : null}
        </DragDropContext>
      </Body>
    </Wrapper>
  );
}

export default App;
