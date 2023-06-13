import { useEffect, useState } from "react";
import "./App.css";
import users from "./users.json";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "react-bootstrap/Image";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";

const Username = ({ image, name }) => {
  return (
    <Stack direction="horizontal" gap={3}>
      <Image src={image} roundedCircle />
      <p>{name}</p>
    </Stack>
  );
};

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const filteredData = users.results.map((user) => ({
      id: user.id.value,
      dob: user.dob.date,
      email: user.email,
      gender: user.gender,
      name: `${user.name.first} ${user.name.last}`,
      phone: user.phone,
      image: user.picture.thumbnail,
    }));

    setData(filteredData);
  }, []);

  return (
    <div>
      <Container >
        <Stack gap="3">
          <h1 className="text-center mt-4">Users</h1>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control placeholder="name of user" />
            </Form.Group>
            <Form.Label>Gender</Form.Label>
            <Form.Select>
              <option>Open this select menu</option>
              <option value="male">Male</option>
              <option value="Female">Female</option>
            </Form.Select>
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
              {data.map((item, index) => (
                <tr key={item?.id?.value || index}>
                  <td>
                    <Username name={item.name} image={item.image} />
                  </td>
                  <td>{item.dob}</td>
                  <td>{item.email}</td>
                  <td>{item.gender}</td>
                  <td>{item.phone}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Stack>
      </Container>
    </div>
  );
}

export default App;
