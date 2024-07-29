import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { boardState } from '../atom';

const BoardWrapper = styled.div`
  min-width: 400px;
  min-height: 500px;
  background-color: hsla(0, 0%, 100%, 0.5);
  height: 100px;
  margin-right: 50px;
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
const TopBtn = styled.div`
  width: 50px;
  text-align: center;
  cursor: pointer;
`;

interface IProps {
  id: number;
}

const Board = ({ id }: IProps) => {
  const boards = useRecoilValue(boardState);

  return (
    <BoardWrapper>
      <Top>
        <TopTitle>{boards[id].name}</TopTitle>
        <TopBtn>
          <span className="material-symbols-outlined">add</span>
        </TopBtn>
      </Top>
    </BoardWrapper>
  );
};

export default Board;
