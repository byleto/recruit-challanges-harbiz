import { ArrowDown, ArrowUp } from 'feather-icons-react';
import { SortOrderEnum } from '../constants';

export const SortOrderIcon = ({ order }) => {
  if (order === SortOrderEnum.None) {
    return null;
  }

  return order === SortOrderEnum.Ascendent ? (
    <ArrowDown color="white" size="16" />
  ) : (
    <ArrowUp color="white" size="16" />
  );
};
