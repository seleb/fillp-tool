import { h, Component, } from 'preact';
import './output.css';

function copyToClipboard(str) {
	const el = document.createElement('textarea');
	el.value = str;
	el.setAttribute('readonly', '');
	el.style.position = 'absolute';
	el.style.left = '-9999px';
	document.body.appendChild(el);
	el.select();
	document.execCommand('copy');
	document.body.removeChild(el);
};

export default class Output extends Component {
	constructor() {
		super();
		this.state = {
			copy: undefined,
		};
	}
	copy = (event) => {
		copyToClipboard(event.target.value);
		clearTimeout(this.copyNotifTimeout);
		this.copyNotifTimeout = setTimeout(() => {
			this.setState({
				copy: undefined,
			});
		}, 1000);
		this.setState({
			copy: `${event.target.name} copied!`,
		});
	}
	render({
		bits = {},
	}, {
		copy = '',
	}) {
		const onBits = Object.entries(bits).filter(([_, on]) => on).map(([bit]) => bit);
		const sum = onBits.reduce((sum, bit) => sum + parseInt(bit, 10), 0);
		return (
			<div class="output">
				<label for="Hex">Hex Sum: </label><input name="Hex" readOnly onClick={this.copy} value={`0x${sum.toString(16)}`} />
				<label for="Binary">Binary Sum: </label><input name="Binary" readOnly onClick={this.copy} value={`0b${sum.toString(2)}`} />
				<label for="Decimal">Decimal Addition: </label><input name="Decimal" readOnly onClick={this.copy} value={onBits.join('+') || 0} />
				<div class="copy-notif">{copy}</div>
			</div>
		);
	}
}
