import {React, createRef, Component} from 'react';
import Slots from './Slots';

const Header = () =>{
    return (
      <h1>Playing in slot machine</h1>
    );
}

class Machine extends Component {
  
  render() {
    return (
      <div>
        <Header />
        <Slots />
      </div>
    );
  }
}

export default Machine;