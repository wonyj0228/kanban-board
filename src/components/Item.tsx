import styled from 'styled-components';
import { IItem } from '../atom';
import { useEffect, useRef } from 'react';

const Wrapper = styled.div`
  width: 100%;
  padding: 10px 20px;
  box-sizing: border-box;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  margin-bottom: 15px;
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
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = ref.current.scrollHeight + 'px';
    }
  }, []);

  return (
    <Wrapper>
      <Content ref={ref} value={text} readOnly></Content>
    </Wrapper>
  );
};

export default Item;
