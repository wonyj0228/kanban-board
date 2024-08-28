import styled from 'styled-components';
import { IItem } from '../atom';
import { Draggable } from 'react-beautiful-dnd';
import { motion, Variants } from 'framer-motion';
import { memo } from 'react';

const Wrapper = styled.div`
  width: 100%;
  padding: 15px 20px;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.itemBgColor};
  border-radius: 10px;
  margin-bottom: 15px;
  white-space: pre-wrap;
  line-height: 22px;
`;

interface IProps extends IItem {
  idx: number;
}

const Variant: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24,
    },
  },
};

const Item = ({ id, text, idx }: IProps) => {
  return (
    <motion.div variants={Variant} initial="initial" animate="animate">
      <Draggable draggableId={id} index={idx}>
        {(provided) => (
          <Wrapper
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {text}
          </Wrapper>
        )}
      </Draggable>
    </motion.div>
  );
};

export default memo(Item);
