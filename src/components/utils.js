import { USERS_ENDPOINT_URL, SortOrderEnum } from '../constants';
import axios from 'axios';

const compareValues = (key, order = 'asc') => {
  //add as to a enum
  return (a, b) => {
    const existsProperty = !a.hasOwnProperty(key) || !b.hasOwnProperty(key);
    if (existsProperty) {
      return 0;
    }

    const varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key]; //add string as contant
    const varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];

    let comparison = 0; //extract to a function
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return order === 'desc' ? comparison * -1 : comparison; //add desc to a enum
  };
};

export const sortByKey = (arrayToOrder, key, sortOrder) => {
  const isValid = key !== '' && sortOrder !== 'none'; //sort enum
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

export const buildUsers = (rawUsersData)  => {
  return rawUsersData.results.map((user) => ({
    id: user.id.value,
    name: `${user.name.first} ${user.name.last}`,
    dob: user.dob.date,
    email: user.email,
    gender: user.gender,
    phone: user.phone,
    picture: user.picture.thumbnail,
  }));
}