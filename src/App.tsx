import { styled, ThemeProvider } from 'styled-components';
import Contents from './components/Contents';
import { darkTheme, lightTheme } from './theme';
import { useState } from 'react';
import { motion } from 'framer-motion';

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
  color: ${(props) => props.theme.headerFontColor};
`;
const Dark = styled.div`
  display: flex;
  align-items: center;
  span {
    color: ${(props) => props.theme.headerFontColor};
    margin-right: 10px;
  }
`;
const Toggle = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-items: center;
  padding: 5px;
  width: 80px;
  height: 30px;
  border-radius: 30px;
  background-color: ${(props) => props.theme.btnBgColor};
  cursor: pointer;
`;

const Circle = styled(motion.div)`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.toggleCircleColor};
`;

function App() {
  const [dark, setDark] = useState(false);
  const toggleClicked = () => setDark((prev) => !prev);

  return (
    <ThemeProvider theme={dark ? darkTheme : lightTheme}>
      <Wrapper>
        <Header>
          <Title>KANBAN BOARD</Title>
          <Dark>
            <span>Dark mode🌙</span>
            <Toggle onClick={toggleClicked}>
              <div>{!dark ? <Circle layoutId="circle" /> : null}</div>
              <div>{dark ? <Circle layoutId="circle" /> : null}</div>
            </Toggle>
          </Dark>
        </Header>
        <Contents />
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;
