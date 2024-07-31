import styled from 'styled-components';
import { IBoard } from '../atom';
import { Draggable } from 'react-beautiful-dnd';

const BoardWrapper = styled.div`
  min-width: 300px;
  margin-right: 50px;
  background-color: hsla(0, 0%, 100%, 0.5);
  height: 50vh;
  border-top: ${(props) => props.theme.boardTop};
  padding: 10px 30px;
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
  return (
    <Draggable draggableId={id} index={idx}>
      {(provided) => (
        <BoardWrapper ref={provided.innerRef} {...provided.draggableProps}>
          <Top>
            <TopTitle>{name}</TopTitle>
            <TopBtnWrapper>
              <TopBtn>
                <span className="material-symbols-outlined">add</span>
              </TopBtn>
              <TopBtn {...provided.dragHandleProps}>
                <span className="material-symbols-outlined">more_horiz</span>
              </TopBtn>
            </TopBtnWrapper>
          </Top>
        </BoardWrapper>
      )}
    </Draggable>
  );
};

export default Board;
