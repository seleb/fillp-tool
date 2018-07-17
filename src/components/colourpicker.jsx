import { h, Component } from 'preact';
import './link.css';
import colours from './colours';

import './colourpicker.css';

export class Colour extends Component {
	render({
		active = false,
		colour,
		onClick,
		group: name,
	}) {
		return <label class={`colour ${active ? 'active' : ''}`} style={{ background: colour }} >
		<input type="radio" name={name} onClick={onClick} />
		</label>
	}
}

export default class ColourPicker extends Component {
	static group = 0;
	constructor() {
		super();
		this.group = ++ColourPicker.group;
	}

	render({
		url = '',
		onClick,
		selected,
	}) {
		return (
			<div class="colour-picker">
				{colours.map((colour, idx) => <Colour active={selected==idx} group={this.group} key={colour} colour={colour} onClick={() => onClick(idx)} />)}
			</div>
		);
	}
}
