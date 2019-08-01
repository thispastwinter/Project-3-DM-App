import React from 'react';
import Initiative from '../initiative/index';
import Health from '../health/index';
import ArmorClass from '../armorClass/index';
import { Card, Media, Image, Content, Heading, } from 'react-bulma-components';
import './index.css'
import MyButton from '../buttons'

const InitCard = (props) => {

  const currentOrder = props.currentOrder;
  const checkForTop = id => {
    const index = currentOrder.findIndex(c => c.id === id)
    if (index === 0) {
      return <Card.Footer.Item><MyButton text="Turn Done" onClick={() => props.turnDone(props.id)}></MyButton></Card.Footer.Item>
    }
    else {
      return null;
    }
  }

  const checkForDeath = health => {
    if (health <= 0) {
      return <Card.Footer.Item>
        <MyButton text="Remove Character" onClick={() => props.removeChar(props.id)}></MyButton></Card.Footer.Item>
    }
    else {
      return null;
    }
  }

  const checkForMonster = () => {
    if (props.isMonster) {
      return (
        <Card>
          <Card.Content>
            <Media>
              <Media.Item position="left">
                <Image size={64} alt={props.name} src={props.image} />
              </Media.Item>
              <Media.Item>
                <Heading size={3}>{props.name}</Heading>
              </Media.Item>
            </Media>
            <Content>
              Initiative: {props.init}
            </Content>
          </Card.Content>
          {/* <Card.Footer>
            {checkForTop(props.id)}
            {checkForDeath(props.health)}
          </Card.Footer> */}
        </Card>
      );
    }
    else {
      return (
        <Card>
          <Card.Content>
            <Media>
              <Media.Item position="left">
                <Image size={64} alt={props.name} src={props.image} />
              </Media.Item>
              <Media.Item>
                <Heading size={3}>{props.name}</Heading>
              </Media.Item>
            </Media>
            <Content>
              Initiative: <Initiative {...props} /> AC: <ArmorClass {...props} /> Health: <Health {...props} />
            </Content>
          </Card.Content>
          <Card.Footer>
            {checkForTop(props.id)}
            {checkForDeath(props.health)}
          </Card.Footer>
        </Card>
      );
    }
  }

  return (
    checkForMonster()
  );
}

export default InitCard;
