import { SortOrderIcon } from './SortOrderIcon';

export const SorteableColumnHeader = ({ onClick, name, text, fieldToSort, sortOrder }) => {
  return (
    <th id={name} onClick={onClick}>
      {text} {fieldToSort === name ? <SortOrderIcon order={sortOrder} /> : null}
    </th>
  );
};
