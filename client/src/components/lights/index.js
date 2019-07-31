import React from 'react';
import {Button, Container, Columns} from 'react-bulma-components';
import './index.css';
import MyButton from '../../components/buttons'

const Lights = (props) => {
  return (
    <Container id="buttons" fluid>
      <Columns>
      <Columns.Column>
      <MyButton text="Light On" onClick={() => props.lightOn()}>
      </MyButton>
      <MyButton text="Light Off" onClick={() => props.lightOff()}>
      </MyButton>
      </Columns.Column>
      <Columns.Column>
      <MyButton text="Critical" onClick={() => props.critical()}>
      </MyButton>
      <MyButton text="Lightning" onClick={() => props.lightning()}>
      </MyButton>
      </Columns.Column>
      <Columns.Column>
      <MyButton text="Fade In" onClick={() => props.fadeIn()}>
      </MyButton>
      <MyButton text="Fade Out" onClick={() => props.fadeOut()}>
      </MyButton>
      </Columns.Column>
      </Columns>
   </Container>
  )
}

export default Lights;