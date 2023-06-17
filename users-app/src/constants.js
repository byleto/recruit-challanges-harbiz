const USERS_RECORD_LIMIT = 10;
export const USERS_ENDPOINT_URL = `https://randomuser.me/api/?results=${USERS_RECORD_LIMIT}`; //use env variable
export const USERS_QUERY_KEY = 'users';

export const SortOrderEnum = {
  Descendent: 'desc',
  Ascendent: 'asc',
  None: 'none',
};

export const GenderEnum = {
  Male: 'male',
  Female: 'female',
  All: 'all',
};
