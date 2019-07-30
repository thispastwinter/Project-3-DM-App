import React from 'react';
import {Button, Container, Columns} from 'react-bulma-components';
import './index.css';

const Lights = (props) => {
  return (
    <Container id="buttons" fluid>
      <Columns>
      <Columns.Column>
      <Button color="success" onClick={() => props.lightOn()}>
        Light On
      </Button>
      <Button color="success" onClick={() => props.lightOff()}>
        Light Off
      </Button>
      </Columns.Column>
      <Columns.Column>
      <Button color="success" onClick={() => props.critical()}>
        Critical
      </Button>
      <Button color="success" onClick={() => props.lightning()}>
        Lightning
      </Button>
      </Columns.Column>
      <Columns.Column>
      <Button color="success" onClick={() => props.fadeIn()}>
        Fade In
      </Button>
      <Button color="success" onClick={() => props.fadeOut()}>
        Fade Out
      </Button>
      </Columns.Column>
      </Columns>
   </Container>
  )
}

export default Lights;