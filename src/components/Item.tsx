import styled from 'styled-components';
import { IItem } from '../atom';

const Wrapper = styled.div`
  width: 100%;
  padding: 10px 20px;
  box-sizing: border-box;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
`;

const Content = styled.textarea`
  resize: none;
  border: none;
  outline: none;
  width: 100%;
  font-size: 16px;
  font-weight: 400;
  font-family: 'Noto Sans', 'Noto Sans KR', sans-serif;
`;

const Item = ({ id, text }: IItem) => {
  return (
    <Wrapper>
      <Content readOnly>{text}</Content>
    </Wrapper>
  );
};

export default Item;
