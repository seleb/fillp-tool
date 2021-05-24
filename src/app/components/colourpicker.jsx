import { h, Component } from 'preact';
import './colourpicker.css';
import colours from './colours';
import './link.css';


export class Colour extends Component {
	render({
		checked = false,
		colour,
		onClick,
		group: name,
	}) {
		return <input type="radio" name={name} onClick={onClick} checked={checked} style={{ background: colour }}  />
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
				{colours.map((colour, idx) => <Colour checked={selected==idx} group={this.group} key={colour} colour={colour} onClick={() => onClick(idx)} />)}
			</div>
		);
	}
}
