import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useMemo, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Stack from 'react-bootstrap/Stack';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useQuery } from 'react-query';
import { GenderEnum, SortOrderEnum, USERS_QUERY_KEY } from '../constants';
import { SorteableColumnHeader } from './SorteableColumnHeader';
import { UserProfile } from './UserProfile';
import { getNextSortOrder, getUsers, buildUsers, sortByKey } from './utils';
import exportFromJSON from 'export-from-json';
import { AlertCircle } from 'feather-icons-react';

export const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState(GenderEnum.All);
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState(SortOrderEnum.None);
  const [selectedRows, setSelectedRows] = useState([]);
  const [warning, setWarning] = useState('');

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
    if (selectedRows.length > 0) {
      setWarning('');
    }
  }, [selectedRows.length]);

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

  const onClickRowSelector = (event) => {
    event.preventDefault();
    const user = users.find((user) => {
      return user.id === event.target.id;
    });
    const selectedUsers = [...selectedRows];
    const isUserSelected = selectedUsers.includes(user);
    if (isUserSelected) {
      const index = selectedUsers.indexOf(user);
      selectedUsers.splice(index, 1);
    } else {
      selectedUsers.push(user);
    }
    setSelectedRows(selectedUsers);
  };

  const onClickExportButton = (event) => {
    event.preventDefault();
    const fileName = 'download';
    const exportType = exportFromJSON.types.csv;

    if (selectedRows.length > 0) {
      exportFromJSON({ data: selectedRows, fileName, exportType });
    } else {
      setWarning('Select at least one row to export');
    }
  };

  const getTrStyle = (user) => {
    const isUserSelected = selectedRows.includes(user);
    return isUserSelected ? { background: 'lightgray' } : { background: 'white' };
  };

  return (
    <Container>
      <Stack gap="3">
        <h1 className="text-center mt-4">Users</h1>
        <Form>
          {warning && selectedRows.length === 0 && (
            <Alert variant={'warning'}>
              <Stack direction="horizontal" gap={3}>
                <AlertCircle size="16" />
                {warning}
              </Stack>
            </Alert>
          )}
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
          <Stack direction="horizontal" gap={3}>
            <Button
              variant="dark"
              onClick={() => {
                setSelectedRows([]);
              }}
            >
              Clear selection
            </Button>
            <Button 
              variant="dark"
              onClick={() => {
                setSelectedRows(filteredUsers);
              }}
            >
              Select all
            </Button>
            <Button variant="dark" onClick={onClickExportButton}>
              Export to CSV
            </Button>
          </Stack>
        </Form>
        <Table bordered hover>
          <thead>
            <tr>
              <th style={{ background: 'black', color: 'white' }} />
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
              <th style={{ background: 'black', color: 'white' }}>Phone</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers?.map((user, index) => (
              <tr style={{ ...getTrStyle(user), color: 'blue' }} key={user?.id || index}>
                <td style={{ backgroundColor: 'inherit' }} id={user.id} onClick={onClickRowSelector}></td>
                <td style={{ backgroundColor: 'inherit' }}>
                  <UserProfile name={user.name} picture={user.picture} />
                </td>
                <td style={{ backgroundColor: 'inherit' }}>{user.dob}</td>
                <td style={{ backgroundColor: 'inherit' }}>{user.email}</td>
                <td style={{ backgroundColor: 'inherit' }}>{user.gender}</td>
                <td style={{ backgroundColor: 'inherit' }}>{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Stack>
    </Container>
  );
};
