import { USERS_ENDPOINT_URL, SortOrderEnum } from '../constants';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
const STRING_TYPE = 'string';

const getComparison = (a, b) => {
  if (a > b) {
    return 1;
  }
  if (a < b) {
    return -1;
  }
  return 0;
};

const compareValues = (key, order = SortOrderEnum.Ascendent) => {
  return (a, b) => {
    const existsProperty = !a.hasOwnProperty(key) || !b.hasOwnProperty(key);
    if (existsProperty) {
      return 0;
    }

    const varA = typeof a[key] === STRING_TYPE ? a[key].toUpperCase() : a[key];
    const varB = typeof b[key] === STRING_TYPE ? b[key].toUpperCase() : b[key];

    const comparison = getComparison(varA, varB);

    return order === SortOrderEnum.Descendent ? comparison * -1 : comparison;
  };
};

export const sortByKey = (arrayToOrder, key, sortOrder) => {
  const isValid = key !== '' && sortOrder !== SortOrderEnum.None;
  return isValid ? arrayToOrder?.sort(compareValues(key, sortOrder)) : arrayToOrder;
};

export const getNextSortOrder = (order) => {
  const sortOrderNextValue = {
    none: SortOrderEnum.Ascendent,
    asc: SortOrderEnum.Descendent,
    desc: SortOrderEnum.None,
  };
  return sortOrderNextValue[order];
};

export const getUsers = async () => {
  const response = await axios.get(USERS_ENDPOINT_URL);
  return response.data;
};

export const buildUsers = (rawUsersData) => {
  return rawUsersData.results.map((user) => ({
    id: user.id.value || uuidv4(),
    name: `${user.name.first} ${user.name.last}`,
    dob: user.dob.date,
    email: user.email,
    gender: user.gender,
    phone: user.phone,
    picture: user.picture.thumbnail,
  }));
};
