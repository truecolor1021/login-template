import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { BsFillKeyFill, BsPeopleFill } from "react-icons/bs";
import { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";
const REGISTER_USER = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input)
  }
`;
export default function SignUpForm(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const data = {
    firstName,
    lastName,
    email: username,
    password,
    password2,
  };
  const [registerUser] = useMutation(REGISTER_USER, {
    onCompleted: (res) => {
      if (res.data) {
        navigate("/");
      }
    },
    onError: (err) => {
      console.log(err.graphQLErrors[0]?.extensions?.exception?.errors || {});
    },
  });

  const handleSubmit = () => {
    registerUser({ variables: { input: data } });
  };
  return (
    <Card className="project-card-view">
      <Card.Body>
        <Card.Title>
          {" "}
          <h1 className="project-heading">
            Sign <strong className="purple">Up </strong>
          </h1>
        </Card.Title>

        <Form validated={true}>
          <Row className="mb-3 mt-5">
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Control
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                placeholder="First name"
              />
              <Form.Control.Feedback style={{ color: "red" }}>
                {errors.firstName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom02">
              <Form.Control
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                placeholder="Last name"
              />
              <Form.Control.Feedback style={{ color: "red" }}>
                {errors.lastName}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group controlId="validationCustomUsername">
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">
                  <BsPeopleFill />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Email"
                  aria-describedby="inputGroupPrepend"
                  size="lg"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Form.Control.Feedback style={{ color: "red" }}>
                  {errors?.email}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group className="mt-3" controlId="validationCustomUsername">
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">
                  <BsFillKeyFill></BsFillKeyFill>
                </InputGroup.Text>
                <Form.Control
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                  aria-describedby="inputGroupPrepend"
                  size="lg"
                />
                <Form.Control.Feedback style={{ color: "red" }}>
                  {errors?.password}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            {/* <Form.Group className="mt-3" controlId="validationCustomUsername">
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">
                  <BsFillKeyFill></BsFillKeyFill>
                </InputGroup.Text>
                <Form.Control
                  type="password"
                  placeholder="ConformPassword"
                  aria-describedby="inputGroupPrepend"
                  size="lg"
                  onChange={(e) => setPassword2(e.target.value)}
                />
                <Form.Control.Feedback style={{ color: "red" }}>
                  {errors?.password2}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group> */}
          </Row>

          <Button onClick={handleSubmit} className="mb-3 mt-4">
            Sign Up
          </Button>
        </Form>

        {"\n"}
        {"\n"}
        {/* If the component contains Demo link and if it's not a Blog then, it will render the below component  */}
      </Card.Body>
    </Card>
  );
}
