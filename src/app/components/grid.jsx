import { h } from 'preact';
import './grid.css';
import coloursHex from './colours';

export default function Grid({
	bits = {},
	onChange,
	colours,
}) {
	return (
		<div class="grid">
			{Object.entries(bits).reverse().map(([bit, on]) => (
				<div className={`cell ${on ? 'on' : ''}`} style={{ background: coloursHex[colours[on ? 1 : 0]] }} onClick={() => onChange(bit)} />
			))}
		</div>
	);
}
