import { h, Component } from 'preact';

import Grid from './grid';
import Output from './output';
import Link from './link';
import pkg from '../../../package.json';

import './app.css';
import ColourPicker from './colourpicker';

export default class App extends Component {
	constructor() {
		super();
		this.state = {
			bits: {},
			colours: [0, 7],
		};
		for (var i = 0; i < 16; ++i) {
			this.state.bits[Math.pow(2, i)] = false;
		}
		try {
			this.state.bits = {
				...this.state.bits,
				...JSON.parse(localStorage.getItem('bits')),
			};
			this.state.colours = {
				...this.state.colours,
				...JSON.parse(localStorage.getItem('colours')),
			};
		} catch (error) {
			console.error(error);
		}
	}

	onGridChange = bit => {
		this.setState({
			bits: {
				...this.state.bits,
				[bit]: !this.state.bits[bit],
			},
		});
		try {
			localStorage.setItem('bits', JSON.stringify(this.state.bits));
		} catch (error) {
			console.error(error);
		}
	}

	setColour(idx, colour) {
		this.setState({
			colours: {
				...this.state.colours,
				[idx]: colour,
			},
		});
		try {
			localStorage.setItem('colours', JSON.stringify(this.state.colours));
		} catch (error) {
			console.error(error);
		}
	}

	render({ }, {
		bits = {},
		colours = {},
	}) {
		const {
			'0': c1,
			'1': c2,
		} = colours;
		return (
			<div class="app">
				<header>
					fillp tool
				</header>
				<main>
					<div className="grids">
						<Grid colours={[c1,c2]} bits={bits} onChange={this.onGridChange} />
						<Grid tileX={3} tileY={3} colours={[c1,c2]} bits={bits} onChange={this.onGridChange} />
					</div>
					<ColourPicker selected={c1} onClick={colour => this.setColour(0, colour)} />
					<ColourPicker selected={c2} onClick={colour => this.setColour(1, colour)} />
					<hr />
					<Output bits={bits} colours={colours} />
				</main>
				<footer>
					<span>v{pkg.version}</span>
					<Link url="https://www.lexaloffle.com/pico-8.php">pico-8</Link>
					<Link url="https://www.lexaloffle.com/bbs/?tid=3760">font</Link>
					<Link url="https://twitter.com/SeanSLeBlanc">contact</Link>
				</footer>
			</div>
		);
	}
}
