import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectForm from "./SignUpForm";
import Particle from "../Particle";
export default function SignUp() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
     
        <Row style={{ justifyContent: "center", paddingBottom: "114px" }}>
          <Col md={4} className="project-card">
            <ProjectForm
              isBlog={false}
              title="Chatify"
              description="Personal Chat Room or Workspace to share resources and hangout with friends build with react.js, Material-UI, and Firebase. Have features which allows user for realtime messaging, image sharing as well as supports reactions on messages."
              ghLink="https://github.com/soumyajit4419/Chatify"
              demoLink="https://chatify-49.web.app/"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
