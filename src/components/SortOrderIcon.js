import { ArrowDown, ArrowUp } from 'feather-icons-react';
import { SortOrderEnum } from '../constants';

export const SortOrderIcon = ({ order }) => {
    if (order === SortOrderEnum.None) {
      return null;
    }
    //extract desc to a constant or enum
    return order === SortOrderEnum.Ascendent ? <ArrowDown size="16" /> : <ArrowUp size="16" />;
  };