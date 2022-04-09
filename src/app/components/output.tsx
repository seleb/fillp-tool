import { h, Component } from "preact";
import "./output.css";

export default class Output extends Component {
  constructor() {
    super();
    this.state = {
      copy: undefined,
    };
  }
  copy = (event) => {
    event.target.select();
    document.execCommand("copy");
    event.target.blur();
    clearTimeout(this.copyNotifTimeout);
    this.copyNotifTimeout = setTimeout(() => {
      this.setState({
        copy: undefined,
      });
    }, 1000);
    this.setState({
      copy: `${event.target.name} copied!`,
    });
  };
  render({ bits = {}, colours: { "0": c1, "1": c2 } = {} }, { copy = "" }) {
    const onBits = Object.entries(bits)
      .filter(([_, on]) => on)
      .map(([bit]) => bit);
    const sum = onBits.reduce((sum, bit) => sum + parseInt(bit, 10), 0);
    const coloursSum = c1 + (c2 << 4);
    return (
      <div class="output">
        <label htmlFor="Hex">Hex Sum: </label>
        <input
          readonly
          id="Hex"
          name="Hex"
          onClick={this.copy}
          value={`0x${sum.toString(16)}`}
        />
        <label htmlFor="Binary">Binary Sum: </label>
        <input
          readonly
          id="Binary"
          name="Binary"
          onClick={this.copy}
          value={`0b${sum.toString(2)}`}
        />
        <label htmlFor="DecimalSum">Decimal Sum: </label>
        <input
          readonly
          id="DecimalSum"
          name="DecimalSum"
          onClick={this.copy}
          value={sum < 32768 ? sum.toString(10) : "N/A over 32768"}
        />
        <label htmlFor="Decimal">Decimal Addition: </label>
        <input
          readonly
          id="Decimal"
          name="Decimal"
          onClick={this.copy}
          value={onBits.join("+") || 0}
        />
        <label htmlFor="color">Color: </label>
        <input
          readonly
          id="color"
          name="Color"
          onClick={this.copy}
          value={coloursSum}
        />
        <div class="copy-notif">{copy}</div>
      </div>
    );
  }
}
