import React from 'react';
import Initiative from '../initiative/index';
import Health from '../health/index';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Card, Media, Image, Content, Heading } from 'react-bulma-components';

const InitCard = (props) => {

  const currentOrder = props.currentOrder;
  const checkForTop = id => {
    const index = currentOrder.findIndex(c => c.id === id)
    if (index === 0) {
      return <Card.Footer.Item renderAs="button" onClick={() => props.turnDone(props.id)}> turn done </Card.Footer.Item>
    }
    else {
      return null;
    }
  }

  const checkForDeath = health => {
    if (health <= 0) {
      return <Card.Footer.Item renderAs="button" onClick={() => props.removeChar(props.id)}> remove character </Card.Footer.Item>
    }
    else {
      return null;
    }
  }

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
          Initiative: <Initiative {...props} /> AC: {props.ac} <br /> Health: <Health {...props} />
        </Content>
      </Card.Content>
      <Card.Footer>
        {checkForTop(props.id)}
        {checkForDeath(props.health)}
      </Card.Footer>
    </Card>
  );
}

export default InitCard;

//  <Card>
//       <Card.Content>
//         <Media>
//           <Media.Item renderAs="figure" position="left">
//             <Image renderAs="p" size={64} alt="64x64" src="http://bulma.io/images/placeholders/128x128.png" />
//           </Media.Item>
// <Media.Item>
//   <Heading size={4}>John Smith</Heading>
//   <Heading subtitle size={6}>
//     @johnsmith
//   </Heading>
// </Media.Item>
//         </Media>
//         <Content>
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris. <a>@bulmaio</a>.
//           <a href="#1">#css</a> <a href="#2">#responsive</a>
//           <br />
//           <time dateTime="2016-1-1">11:09 PM - 1 Jan 2016</time>
//         </Content>
//       </Card.Content>
//       <Card.Footer>
// <Card.Footer.Item renderAs="a" href="#Yes">
//   Yes
// </Card.Footer.Item>
//         <Card.Footer.Item renderAs="a" href="#No">
//           No
//         </Card.Footer.Item>
//         <Card.Footer.Item renderAs="a" href="#Maybe">
//           Maybe
//         </Card.Footer.Item>
//       </Card.Footer>
//     </Card>
// <Button color="success" onClick={() => props.turnDone(props.id)}> turn done </Button>
// <Button color="danger" onClick={() => props.removeChar(props.id)}> remove character </Button>
//<Card.Footer.Item renderAs="button" color='success' onClick={() => props.turnDone(props.id)}> turn done </Card.Footer.Item> */}
//<Card.Footer.Item renderAs="a" href="#" color='danger' onClick={() => props.removeChar(props.id)}> remove character </Card.Footer.Item>
