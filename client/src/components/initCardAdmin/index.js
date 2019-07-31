import React from 'react';
import Initiative from '../initiative/index';
import Health from '../health/index';
import Wisdom from '../wisdom/index';
import Charisma from '../charisma/index';
import { Card, Media, Image, Content, Heading, Button, Columns } from 'react-bulma-components';
import './index.css';

// const bulmaAccordion = require('bulma-accordion');

const InitCardAdmin = (props) => {

  const currentOrder = props.currentOrder;
  const checkForTop = id => {
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

  return (


    // <button class="toggle" aria-label="toggle"></button>
    // <div class="accordion-body">
    //   <div class="accordion-content">
    //     Lorem ipsum dolor sit amet, consectetur adipiscing elit. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a> efficitur. Aenean ac <em>eleifend lacus</em>, in mollis lectus. Donec sodales, arcu et sollicitudin porttitor, tortor urna tempor ligula, id porttitor mi magna a neque. Donec dui urna, vehicula et sem eget, facilisis sodales sem.
    //   </div>
    // </div>

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
          <Columns>
            <div className="init-field-columns">
              <Columns.Column>
                Initiative: <Initiative {...props} /> AC: <ArmorClass {...props} />  Health: <Health {...props} />
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

export default InitCardAdmin;
