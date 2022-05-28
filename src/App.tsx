import React from 'react';
import { FC } from 'react';
import { useState } from 'react';
import { MultiCheck } from './MultiCheck';
import type { Option } from './MultiCheck/Checkbox';

const options: Option[] = [
  { label: 'aaa', value: '111', },
  { label: 'bbb', value: '222', },
  { label: 'ccc', value: '333', },
  { label: 'ddd', value: '444', },
  { label: 'eee', value: '555', },
  { label: 'fff', value: '666', },
  { label: 'ggg', value: '777', },
  { label: 'hhh', value: '888', },
  { label: 'iii', value: '999', },
]

const defaultValues: string[] = [
  '333',
  '555'
]

const App: FC = (): JSX.Element => {
  const [selectedValues, setSelectedValues] = useState<string[]>(defaultValues);

  function onSelectedOptionsChange(options: Option[]): void {
    setSelectedValues(options.map(it => it.value))
  }

  return <div>
    <h1>Multi Check Component</h1>
    <MultiCheck label='my-multi-check' options={options}
      onChange={onSelectedOptionsChange}
      values={selectedValues}
      columns={2} />
    <div>
      <h2>Current selected values:</h2>
      <div>{selectedValues.join(',')}</div>
    </div>
  </div>
}

export default App;
