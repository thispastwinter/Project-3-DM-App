import React from 'react';
import Initiative from '../initiative/index';
import Health from '../health/index';
import ArmorClass from '../armorClass/index';
import Strength from '../strength/index';
import Dexterity from '../dexterity/index';
import Constitution from '../constitution/index';
import Intelligence from '../intelligence/index';
import Wisdom from '../wisdom/index';
import Charisma from '../charisma/index';
import { Card, Media, Image, Content, Columns } from 'react-bulma-components';
import './index.css';
import MyButton from '../buttons'

const InitCard = (props) => {

  let currentOrder = props.currentOrder;
  const checkForTop = id => {
    const index = currentOrder.findIndex(c => c.id === id)
    if (index === 0) {
      return <Card.Footer.Item><MyButton primary={true} text="Turn Done" onClick={() => props.turnDone(props.id)}></MyButton></Card.Footer.Item>
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
      let index = currentOrder.findIndex(c => c.id === props.id)
      return (
        <Card className={index === 0 ? "init-blinking" : "init-card"}>
          <Card.Content>
            <Media>
              <Media.Item position="left">
                <Image size={64} alt={props.name} src={props.image} />
              </Media.Item>
              <Media.Item>
                <h2 className="character-names" size={3}>{props.name}</h2>
              </Media.Item>
            </Media>
            <Content>
            <div className="statHeader" id="monsterInitHeader">Initiative: {props.init}</div>
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
      let index = currentOrder.findIndex(c => c.id === props.id)
      return (
        <Card className={index === 0 ? 'init-blinking' : 'init-card'}>
          <Card.Content>
            <Media>
              <Media.Item position="left">
                <Image size={64} alt={props.name} src={props.image} />
              </Media.Item>
              <Media.Item>
                <h2 className="character-names" size={3}>{props.name}</h2>
              </Media.Item>
            </Media>
            <Content>
              <Columns>
                <div className="init-field-columns">
                  <Columns.Column>
                    Initiative: <Initiative {...props} /> Armor Class: <ArmorClass {...props} />  Health: <Health {...props} />
                  </Columns.Column>
                </div>
                {/* </Columns> */}
                {/* <Columns> */}
                <div className="init-field-columns">
                  <Columns.Column>
                    Strength: <Strength {...props} /> Dexterity: <Dexterity {...props} /> Constitution: <Constitution {...props} />
                  </Columns.Column>
                </div>
                {/* </Columns> */}
                {/* <Columns> */}
                <div className="init-field-columns">
                  <Columns.Column>
                    Intelligence: <Intelligence {...props} /> Wisdom: <Wisdom {...props} /> Charisma: <Charisma {...props} />
                  </Columns.Column>
                </div>
              </Columns>
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
