import { SortOrderIcon } from './SortOrderIcon';

export const SorteableColumnHeader = ({ onClick, name, text, fieldToSort, sortOrder }) => {
  return (
    <th style={{ background: 'black', color: 'white' }} id={name} onClick={onClick}>
      {text} {fieldToSort === name ? <SortOrderIcon order={sortOrder} /> : null}
    </th>
  );
};
