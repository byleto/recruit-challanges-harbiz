import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Spinner from "react-bootstrap/Spinner";
import Stack from "react-bootstrap/Stack";
import Table from "react-bootstrap/Table";

import { useQuery } from "react-query";

const USERS_RECORD_LIMIT = 10;
const USERS_ENDPOINT_URL = `https://randomuser.me/api/?results=${USERS_RECORD_LIMIT}`;

const Username = ({ picture, name }) => {
  return (
    <Stack direction="horizontal" gap={3}>
      <Image src={picture} roundedCircle />
      <p>{name}</p>
    </Stack>
  );
};

const getUsers = async () => {
  const response = await axios.get(USERS_ENDPOINT_URL);
  return response.data;
};

export const UsersPage = () => {
  const [data, setData] = useState({ results: [] });
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const isEnabled = data?.results?.length === 0;
  const usersQuery = useQuery("users", getUsers, {
    enabled: isEnabled,
  });
  const { data: rawUsersData, isLoading, isFetching, isSuccess } = usersQuery;

  useEffect(() => {
    if (isSuccess) {
      setData(rawUsersData);
      const formattedUsers = rawUsersData.results.map((user) => ({
        id: user.id.value,
        name: `${user.name.first} ${user.name.last}`,
        dob: user.dob.date,
        email: user.email,
        gender: user.gender,
        phone: user.phone,
        picture: user.picture.thumbnail,
      }));
      setUsers(formattedUsers);
      setFilteredUsers(formattedUsers);
    }
  }, [isSuccess, rawUsersData]);

  if (isLoading || isFetching) {
    return <Spinner animation="border" />;
  }

  const onChangeName = (event) => {
    event.preventDefault();
    setFilteredUsers(users.filter((user) => user.name.toLowerCase().includes(event.target.value)));
  };

  return (
    <Container>
      <Stack gap="3">
        <h1 className="text-center mt-4">Users</h1>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Name</Form.Label>
            <Form.Control onChange={onChangeName} placeholder="name of user" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Gender</Form.Label>
            <Form.Select>
              <option>Select a gender</option>
              <option value="male">Male</option>
              <option value="Female">Female</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="name@example.com" />
          </Form.Group>
        </Form>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>DOB</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Phone</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user?.id || index}>
                <td>
                  <Username name={user.name} picture={user.picture} />
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
