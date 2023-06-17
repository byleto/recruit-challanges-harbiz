import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useMemo, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Stack from 'react-bootstrap/Stack';
import Table from 'react-bootstrap/Table';
import { useQuery } from 'react-query';
import { GenderEnum, SortOrderEnum, USERS_QUERY_KEY } from '../constants';
import { SorteableColumnHeader } from './SorteableColumnHeader';
import { UserProfile } from './UserProfile';
import { getNextSortOrder, getUsers, buildUsers, sortByKey } from './utils';

export const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState(GenderEnum.All);
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState(SortOrderEnum.None);

  const filteredUsers = useMemo(() => {
    const allGenders = true;
    const genderFilter = (userGender) =>
      gender === GenderEnum.All ? allGenders : userGender.toLowerCase() === gender.toLocaleLowerCase();
    const nameFilter = (userName) => userName.toLowerCase().includes(name.toLowerCase());
    const emailFilter = (userEmail) => userEmail.toLowerCase().includes(email.toLowerCase());

    return sortByKey(
      users.filter((user) => nameFilter(user.name) && genderFilter(user.gender) && emailFilter(user.email)),
      sortBy,
      sortOrder,
    );
  }, [users, sortBy, sortOrder, gender, name, email]);

  const enabledUsersQuery = users.length === 0;
  const usersQuery = useQuery(USERS_QUERY_KEY, getUsers, {
    enabled: enabledUsersQuery,
  });
  const { data: rawUsersData, isLoading, isFetching, isSuccess } = usersQuery;

  useEffect(() => {
    if (isSuccess) {
      const formattedUsers = buildUsers(rawUsersData);
      setUsers(formattedUsers);
    }
  }, [isSuccess, rawUsersData]);

  if (isLoading || isFetching) {
    return <Spinner animation="border" />;
  }

  const onClickColumHeader = (e) => {
    const id = e.target.id;
    if (id !== sortBy) {
      setSortOrder(SortOrderEnum.None);
    }
    setSortBy(id);
    setSortOrder(getNextSortOrder(sortOrder));
  };

  return (
    <Container>
      <Stack gap="3">
        <h1 className="text-center mt-4">Users</h1>
        <Form>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control onChange={(e) => setName(e.target.value)} value={name} placeholder="name of user" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="gender">
            <Form.Label>Gender</Form.Label>
            <Form.Select onChange={(e) => setGender(e.target.value)} value={gender}>
              <option value={GenderEnum.All}>Select a gender</option>
              <option value={GenderEnum.Male}>Male</option>
              <option value={GenderEnum.Female}>Female</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="name@example.com"
            />
          </Form.Group>
        </Form>
        <Table striped bordered hover>
          <thead>
            <tr>
              <SorteableColumnHeader
                sortOrder={sortOrder}
                fieldToSort={sortBy}
                name={'name'}
                text={'Name'}
                onClick={onClickColumHeader}
              />
              <SorteableColumnHeader
                sortOrder={sortOrder}
                fieldToSort={sortBy}
                name={'dob'}
                text={'Date of birth'}
                onClick={onClickColumHeader}
              />
              <SorteableColumnHeader
                sortOrder={sortOrder}
                fieldToSort={sortBy}
                name={'email'}
                text={'Email'}
                onClick={onClickColumHeader}
              />
              <SorteableColumnHeader
                sortOrder={sortOrder}
                fieldToSort={sortBy}
                name={'gender'}
                text={'Gender'}
                onClick={onClickColumHeader}
              />
              <th>Phone</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers?.map((user, index) => (
              <tr key={user?.id || index}>
                <td>
                  <UserProfile name={user.name} picture={user.picture} />
                </td>
                <td>{user.dob}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Stack>
    </Container>
  );
};
