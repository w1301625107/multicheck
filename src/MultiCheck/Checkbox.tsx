import React from 'react';
import { FC } from 'react';

type Option = {
	label: string,
	value: string
}

type Props = {
	option: Option,
	checked: boolean,
	onChange: (value: Option) => void
}

const Checkbox: FC<Props> = (props: Props): JSX.Element => {
	const { option, checked, onChange } = props

	function handleChange() {
		onChange(option)
	}

	const classList = {
		'MultiCheck_checkbox': `MultiCheck_checkbox ${checked && 'MultiCheck_checkbox-checked'}`,
		'MultiCheck_checkbox_inner': `MultiCheck_checkbox_inner ${checked && 'MultiCheck_checkbox_inner-checked'}`
	}

	return <span className='MultiCheck_checkbox_wrapper' >
		<span className={classList.MultiCheck_checkbox}>
			<input
				className='MultiCheck_checkbox_input'
				checked={checked}
				value={option.value}
				type='checkbox'
				onChange={handleChange} />
			<span className={classList.MultiCheck_checkbox_inner}></span>
		</span>
		<span>{option.label}</span>
	</span>
}
Checkbox.displayName = 'Checkbox';

export { Checkbox, Option };
