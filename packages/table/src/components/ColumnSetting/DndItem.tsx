import React, { useRef } from 'react';
import type { XYCoord } from 'dnd-core';
import type { DropTargetMonitor } from 'react-dnd';
import { useDrag, useDrop } from 'react-dnd';

export type CardProps = {
  id: any;
  index: number;
  move?: (dragIndex: number, hoverIndex: number) => void;
  end: (id: string, dragIndex: number) => void;
};

type DragItem = {
  index: number;
  id: string;
  type: string;
};
const ItemTypes = {
  CARD: 'card',
};

const Card: React.FC<CardProps> = ({ id, end, move, children, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect: (monitor) => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
      };
    },
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current!.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action

      if (move) {
        move(dragIndex, hoverIndex);
      }

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      // eslint-disable-next-line no-param-reassign
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag<any, any, any>({
    item: { type: ItemTypes.CARD, id, index },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item?: { id: string; index: number }) => {
      if (!item) {
        return;
      }
      end(item.id, item.index);
    },
  });

  const opacity = isDragging ? { opacity: 0.8, cursor: 'move' } : { cursor: 'move' };
  const overStyle = isOver ? { border: '1px solid #DDD', margin: -1 } : {};
  drag(drop(ref));
  return (
    <div
      ref={ref}
      style={{
        ...opacity,
        ...overStyle,
      }}
    >
      {children}
    </div>
  );
};

export default Card;
