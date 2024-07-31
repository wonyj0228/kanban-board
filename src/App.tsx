import { styled } from 'styled-components';
import Contents from './components/Contents';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  height: 100dvh;
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

function App() {
  return (
    <Wrapper>
      <Header>
        <Title>KANBAN BOARD</Title>
        <BtnMode>
          <span>DARK🌙</span>
        </BtnMode>
      </Header>
      <Contents />
    </Wrapper>
  );
}

export default App;
