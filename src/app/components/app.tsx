import localforage from "localforage";
import { Component, Fragment, h } from "preact";
import pkg from "../../../package.json";
import "./app.css";
import ColourPicker from "./colourpicker";
import Grid from "./grid";
import Link from "./link";
import Output from "./output";

export default class App extends Component<
  never,
  {
    bits: { [key: number]: boolean };
    colours: [number, number];
  }
> {
  constructor() {
    super();
    this.state = {
      bits: {},
      colours: [0, 7],
    };
    for (var i = 0; i < 16; ++i) {
      this.state.bits[Math.pow(2, i)] = false;
    }
  }

  componentDidMount = () => {
    Promise.all([
      localforage.getItem<typeof this.state["bits"]>("bits"),
      localforage.getItem<typeof this.state["colours"]>("colours"),
    ]).then(([bits, colours]) => {
      this.setState((state) => {
        const newState = { ...state };
        newState.bits = {
          ...newState.bits,
          ...bits,
        };
        if (colours) {
          if (colours.length > 0) {
            newState.colours[0] = colours[0];
          }
          if (colours.length > 1) {
            newState.colours[1] = colours[1];
          }
        }
        return newState;
      });
    });
  };

  onGridChange = (bit: number) => {
    this.setState(
      (s) => ({
        bits: {
          ...s.bits,
          [bit]: !s.bits[bit],
        },
      }),
      () => {
        localforage.setItem("bits", this.state.bits).catch((err) => {
          console.error(err);
        });
      }
    );
  };

  setColour(idx: number, colour: number) {
    this.setState(
      (s) => {
        const newState = { ...s };
        [...s.colours];
        newState.colours = [...newState.colours];
        newState.colours[idx] = colour;
        return newState;
      },
      () => {
        localforage.setItem("colours", this.state.colours).catch((err) => {
          console.error(err);
        });
      }
    );
  }

  render(_: App["props"], { bits = {}, colours = [0, 7] }: App["state"]) {
    const { "0": c1, "1": c2 } = colours;
    return (
      <Fragment>
        <header>fillp tool</header>
        <main>
          <div className="grids">
            <Grid colours={[c1, c2]} bits={bits} onChange={this.onGridChange} />
            <Grid
              tileX={3}
              tileY={3}
              colours={[c1, c2]}
              bits={bits}
              onChange={this.onGridChange}
            />
          </div>
          <ColourPicker
            group="background"
            selected={c1}
            onClick={(colour: number) => this.setColour(0, colour)}
          />
          <ColourPicker
            group="fill"
            selected={c2}
            onClick={(colour: number) => this.setColour(1, colour)}
          />
          <hr />
          <Output bits={bits} colours={colours} />
        </main>
        <footer>
          <span>v{pkg.version}</span>
          <Link url="https://www.lexaloffle.com/pico-8.php">pico-8</Link>
          <Link url="https://www.lexaloffle.com/bbs/?tid=3760">font</Link>
          <Link url="https://twitter.com/SeanSLeBlanc">contact</Link>
        </footer>
      </Fragment>
    );
  }
}
