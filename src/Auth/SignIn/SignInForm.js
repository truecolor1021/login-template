import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { BsFillKeyFill, BsPeopleFill } from "react-icons/bs";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { signIn, setAuthToken } from "../../lib/api";
import { useNavigate } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";
const LOGIN_USER = gql`
  mutation login($input: LoginInput!) {
    login(input: $input)
  }
`;
export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const navigator = useNavigate();
  const [loginUser] = useMutation(LOGIN_USER, {
    onCompleted: (res) => {
      if (res) {
        setAuthToken(res.login); // Adjust this if the login response has a nested object
        navigator("/project");
      }
    },
    onError: (err) => {
      setErrors(err.graphQLErrors[0]?.extensions?.exception?.errors || {});
    },
  });
  const handleSubmit = () => {
    let formErrors = {};

    if (!email) {
      formErrors.email = "Email is required";
    }
    if (!password) {
      formErrors.password = "Password is required";
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      loginUser({ variables: { input: { email, password } } });
    }
  };
  return (
    <Card className="project-card-view">
      <Card.Body>
        <Card.Title>
          {" "}
          <h3 className="project-heading">
            Sign <strong className="purple">In </strong>
          </h3>
        </Card.Title>

        <Form validated={true}>
          <Row className="mb-3">
            <Form.Group className="mt-5" controlId="validationCustomUsername">
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">
                  <BsPeopleFill></BsPeopleFill>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Email"
                  aria-describedby="inputGroupPrepend"
                  size="lg"
                  onChange={(e) => setEmail(e.target.value)}
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
                  type="password"
                  placeholder="Password"
                  aria-describedby="inputGroupPrepend"
                  size="lg"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Form.Control.Feedback style={{ color: "red" }}>
                  {errors?.password}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>

          <Button onClick={handleSubmit} className="mb-3 mt-4">
            Sign In
          </Button>
        </Form>

        {"\n"}
        {"\n"}
        {/* If the component contains Demo link and if it's not a Blog then, it will render the below component  */}
      </Card.Body>
    </Card>
  );
}
