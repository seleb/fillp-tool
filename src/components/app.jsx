import { h, Component } from 'preact';

import Grid from './grid';
import Output from './output';
import Link from './link';

import './app.css';

export default class App extends Component {
	constructor() {
		super();
		this.state = {
			bits: {},
		};
		for (var i = 0; i < 16; ++i) {
			this.state.bits[Math.pow(2, i)] = false;
		}
		try {
			this.state.bits = {
				...this.state.bits,
				...JSON.parse(localStorage.getItem('bits')),
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

	render({ }, {
		bits = {},
	}) {
		return (
			<div class="app">
				<header>
					fillp tool
				</header>
				<main>
					<Grid bits={bits} onChange={this.onGridChange} />
					<Output bits={bits} />
				</main>
				<footer>
					Links:
					<Link url="https://www.lexaloffle.com/pico-8.php">pico-8</Link>
					<Link url="https://www.lexaloffle.com/bbs/?tid=3760">font</Link>
					<Link url="https://twitter.com/SeanSLeBlanc">contact</Link>
				</footer>
			</div>
		);
	}
}
