import React from 'react';
import {Button, Container} from 'react-bulma-components';

const Hue = (props) => {
  return (
    <Container fluid>
      <Button color="success" onClick={() => props.lightOn()}>
        Light On
      </Button>
      <Button color="success" onClick={() => props.lightOff()}>
        Light Off
      </Button>
      <Button color="success" onClick={() => props.critical()}>
        Critical
      </Button>
      <Button color="success" onClick={() => props.lightning()}>
        Lightning
      </Button>
      <Button color="success" onClick={() => props.connection()}>Connect to Hue!</Button>
   </Container>
  )
}

export default Hue;