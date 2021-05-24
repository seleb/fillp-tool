import { h, Component } from 'preact';
import './colourpicker.css';
import colours from './colours';
import './link.css';


export function Colour({
	checked = false,
	colour,
	onClick,
	group,
}) {
	return <input title={`${group}: ${colour}`} type="radio" name={group} onClick={onClick} checked={checked} style={{ background: colours[colour] }}  />
}

export default function ColourPicker({
	onClick,
	selected,
	group,
}) {
	return (
		<div class="colour-picker">
			{colours.map((colour, idx) => <Colour checked={selected==idx} group={group} key={colour} colour={idx} onClick={() => onClick(idx)} />)}
		</div>
	);
}
