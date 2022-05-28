import './MultiCheck.css';

import React, { useEffect, useState, memo, useRef, useCallback } from 'react';
import { FC } from 'react';
import { Checkbox, } from './Checkbox';
import type { Option } from './Checkbox'
import { Column } from './Column';

/**
 * Notice:
 * 1. There should be a special `Select All` option with checkbox to control all passing options
 * 2. If columns > 1, the options should be placed from top to bottom in each column
 *
 * @param {string} label - the label text of this component
 * @param {Option[]} options - options. Assume no duplicated labels or values
 * @param {string[]} values - If `undefined`, makes the component in uncontrolled mode with no options checked;
 *                            if not undefined, makes the component to controlled mode with corresponding options checked.
 *                            Assume no duplicated values.
 * @param {number} columns - default value is 1, and assume it can only be [1, 2, ... 9]
 * @param {Function} onChange - if not undefined, when checked options are changed, they should be passed to outside;
 *                              if undefined, the options can still be selected, but won't notify the outside
 */
type Props = {
  label?: string,
  options: Option[],
  columns?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9,
  values?: string[]
  onChange?: (options: Option[]) => void,
}

const SelectAllOption: Option = {
  label: 'Select All',
  value: 'Select All'
}

const CheckboxMemo = memo(Checkbox)

const MultiCheck: FC<Props> = (props: Props): JSX.Element => {
  const { label, options, columns = 1, values, onChange } = props
  const [value, setValue] = useState<string[]>(values || [])
  const allChecked = options.length > 0 && value.length === options.length

  useEffect(() => {
    setValue(props.values || []);
  }, [props.values]);


  function handleChange(value: string[]) {
    if (onChange) {
      onChange(options.filter(option => value.includes(option.value)))
    }
  }

  const toggleOption = (option: Option) => {
    const idx = value.indexOf(option.value)
    const newValue = [...value]

    if (idx < 0) {
      newValue.push(option.value)
    } else {
      newValue.splice(idx, 1)
    }

    if (!props.values) {
      setValue(newValue)
    }

    handleChange(newValue)
  }

  const toggleSelectAll = () => {
    let newValue: string[] = []
    if (!allChecked) {
      newValue = options.map(option => option.value)
    }
    setValue(newValue)
    handleChange(newValue)
  }

  const allCheckedBoxEle = options.length > 0 &&
    <CheckboxMemo
      key={SelectAllOption.value}
      option={SelectAllOption}
      checked={allChecked}
      onChange={toggleSelectAll} />

  const checkboxEles = options.map(option => (<CheckboxMemo
    key={option.value}
    option={option}
    checked={value.includes(option.value)}
    onChange={toggleOption} />))

  return <div className='MultiCheck'>
    {
      label && <div className='MultiCheck_label'>{label}</div>
    }
    <Column columns={columns}>
      {allCheckedBoxEle}
      {checkboxEles}
    </Column>
  </div>
}

MultiCheck.displayName = 'MultiCheck'

export {
  MultiCheck
}