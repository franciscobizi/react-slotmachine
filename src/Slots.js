import React, {useState, useEffect, createRef, Component} from 'react';

class Slots extends Component {
    
    constructor(props) {
        super(props);
        this.state = { 
            symbol1: "🍓", symbol2: "🍓", symbol3: "🍓", 
            rolling: false,
            prizes: 0,
            running: false, 
        };
        
        // get ref of dic onn which elements will roll
        this.slotRef = [createRef(), createRef(), createRef()];
    }

    // to trigger roolling and maintain state
    roll = () => {
    this.setState({
        rolling: true
    });
    setTimeout(() => {
        this.setState({ rolling: false, running: false });
        let results = [...new Set(Slots.matches)];
        this.incrementPrize(results.length);
        Slots.matches = [];
    }, 10000);
    
    // looping through all 3 slots to start rolling
    this.slotRef.forEach((slot, i) => {
        // this will trigger rolling effect
      const selected = this.triggerSlotRotation(slot.current);
      Slots.matches.push(selected);
      this.setState({ [`symbol${i + 1}`]: selected });
    });

    setTimeout(() => {
      this.setState({
        running: true
      });
  }, 600);
};

  static defaultProps = {
    default_symbols: ["🐵","🍓","🍌","🧡"]
  };

  static matches = [];

  incrementPrize(prize){
    let { prizes } = this.state;
    switch (prize) {
        case 1:
            this.setState({ prizes: prizes + 100 });
            break;
        case 2:
            this.setState({ prizes: prizes + 10 });
            break;
        default:
            break;
    }
 }

  // this will create a rolling effect and return random selected option
  triggerSlotRotation = ref => {
    function setTop(top) {
      ref.style.top = `${top}px`;
    }
    let options = ref.children;
    let randomOption = Math.floor(
      Math.random() * Slots.defaultProps.default_symbols.length
    );
    let choosenOption = options[randomOption];
    setTop(-choosenOption.offsetTop + 2);
    return Slots.defaultProps.default_symbols[randomOption];
  };

  render() {
    return (
      <div className="Slot-Machine">
        <div className="slot">
        <div className={this.state.running ? "gradient-fade running" : "gradient-fade"}></div>
          <section>
            <div className={this.state.running ? "container running" : "container"} ref={this.slotRef[0]}>
              {Slots.defaultProps.default_symbols.map((symbol, i) => (
                <div key={i}>
                  <span>{symbol}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
        <div className="slot">
        <div className={this.state.running ? "gradient-fade running" : "gradient-fade"}></div>
          <section>
            <div className={this.state.running ? "container running" : "container"} ref={this.slotRef[1]}>
              {Slots.defaultProps.default_symbols.map((symbol, i) => (
                <div key={i}>
                  <span>{symbol}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
        <div className="slot">
          <div className={this.state.running ? "gradient-fade running" : "gradient-fade"}></div>
          <section>
            <div className={this.state.running ? "container running" : "container"} ref={this.slotRef[2]}>
              {Slots.defaultProps.default_symbols.map((symbol, i) => (
                <div key={i}>
                  <span>{symbol}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
        <div className={`slot-prizes`}>{this.state.prizes}$</div>
        <div
          className={!this.state.rolling ? "roll rolling" : "roll"}
          onClick={!this.state.rolling && this.roll}
          disabled={this.state.rolling}
        >
          {this.state.rolling ? "Rolling..." : "START"}
        </div>
      </div>
    );
  }
}

export default Slots;