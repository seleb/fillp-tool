import { h, Component } from 'preact';
import './grid.css';

export default class Grid extends Component {
	render({
		bits = {},
		onChange,
	}) {
		return (
			<div class="grid">
				{Object.entries(bits).reverse().map(([bit, on]) => (
					<div className={`cell ${on ? 'on' : ''}`} onClick={()=>onChange(bit)} />
				))}
			</div>
		);
	}
}
