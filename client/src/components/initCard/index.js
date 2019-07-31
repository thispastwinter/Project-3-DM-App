import React from 'react';
import Initiative from '../initiative/index';
import Health from '../health/index';
import ArmorClass from '../armorClass/index';
import { Card, Media, Image, Content, Heading, Button } from 'react-bulma-components';

const InitCard = (props) => {

  const currentOrder = props.currentOrder;
  const checkForTop = id => {
    const index = currentOrder.findIndex(c => c.id === id)
    if (index === 0) {
      return <Card.Footer.Item><Button color="success" onClick={() => props.turnDone(props.id)}> Turn Done</Button></Card.Footer.Item>
    }
    else {
      return null;
    }
  }

  const checkForDeath = health => {
    if (health <= 0) {
      return <Card.Footer.Item><Button color="danger" onClick={() => props.removeChar(props.id)}> remove character </Button></Card.Footer.Item>
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
            <Content className="has-text-centered">
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
