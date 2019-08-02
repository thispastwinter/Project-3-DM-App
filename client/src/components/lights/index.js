import React from 'react';
import { Container } from 'react-bulma-components';
import './index.css';
import MyButton from '../../components/buttons'

const Lights = (props) => {
  return (
    <Container id="buttons">
          <MyButton text="Light On" onClick={() => props.lightOn()}>
          </MyButton>
          <MyButton text="Light Off" onClick={() => props.lightOff()}>
          </MyButton>
          <MyButton text="Critical" onClick={() => props.critical()}>
          </MyButton>
          <MyButton text="Fade In" onClick={() => props.fadeIn()}>
          </MyButton>
          <MyButton text="Fade Out" onClick={() => props.fadeOut()}>
          </MyButton>  
    </Container>
  )
}

export default Lights;