import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { MultiCheck } from '.';
import { Option } from './Checkbox';

const options: Option[] = [
  { label: 'aaa', value: '111', },
  { label: 'bbb', value: '222', },
]

function getByDisplayValue(value: string) {
  return screen.getByDisplayValue<HTMLInputElement>(value)
}

describe('MultiCheck', () => {
  describe('initialize', () => {
    it('basic function', () => {
      const onChange = jest.fn();
      render(<MultiCheck options={options} onChange={onChange} />)
      fireEvent.click(getByDisplayValue('111'))
      expect(onChange).toHaveBeenCalledWith([{ label: 'aaa', value: '111' }])
      fireEvent.click(getByDisplayValue('222'))
      expect(onChange).toHaveBeenCalledWith([{ label: 'aaa', value: '111' }, { label: 'bbb', value: '222' }])
      fireEvent.click(getByDisplayValue('111'))
      expect(onChange).toHaveBeenCalledWith([{ label: 'bbb', value: '222' }])
    });

    it('be controlled by value ', () => {
      const wrapper = render(<MultiCheck options={options} values={['111']} />)
      expect(getByDisplayValue('111').checked).toBeTruthy()
      wrapper.rerender(<MultiCheck options={options} values={['222']} />)
      expect(getByDisplayValue('222').checked).toBeTruthy()
    });

    it('check Select All state', () => {
      render(<MultiCheck options={options} />)
      expect(getByDisplayValue('Select All').checked).toBeFalsy()
      fireEvent.click(getByDisplayValue('111'))
      fireEvent.click(getByDisplayValue('222'))
      expect(getByDisplayValue('Select All').checked).toBeTruthy()
      fireEvent.click(getByDisplayValue('222'))
      expect(getByDisplayValue('Select All').checked).toBeFalsy()
    });

    it('be controlled by Select All', () => {
      const onChange = jest.fn();
      render(<MultiCheck options={options} onChange={onChange} />)
      fireEvent.click(screen.getByDisplayValue('Select All'))
      expect(getByDisplayValue('111').checked).toBeTruthy()
      expect(getByDisplayValue('222').checked).toBeTruthy()
      expect(onChange).toHaveBeenCalledWith(options)

      fireEvent.click(screen.getByDisplayValue('Select All'))
      expect(getByDisplayValue('111').checked).toBeFalsy()
      expect(getByDisplayValue('222').checked).toBeFalsy()
      expect(onChange).toHaveBeenCalledWith([])
    });

    it('test columns property', () => {
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

      const valueSequence = ['Select All', ...options.map(e => e.value)]

      function testHelper(col: 1 | 3 | 5 | 7 | 9) {
        return render(<MultiCheck options={options} columns={col} />).container.getElementsByClassName('MultiCheck_columns_col')
      }

      function getSequence(node: Element) {
        return Array.prototype.map.call(node.querySelectorAll('input'), e => e.value)
      }

      function getCorrectSequence(start: number, end: number) {
        return valueSequence.slice(start, end)
      }

      const case1 = testHelper(1)
      expect(getSequence(case1[0])).toEqual(getCorrectSequence(0, 10))

      const case3 = testHelper(3)
      expect(getSequence(case3[0])).toEqual(getCorrectSequence(0, 4))
      expect(getSequence(case3[1])).toEqual(getCorrectSequence(4, 7))
      expect(getSequence(case3[2])).toEqual(getCorrectSequence(7, 10))

      const case5 = testHelper(5)
      expect(getSequence(case5[0])).toEqual(getCorrectSequence(0, 2))
      expect(getSequence(case5[1])).toEqual(getCorrectSequence(2, 4))
      expect(getSequence(case5[2])).toEqual(getCorrectSequence(4, 6))
      expect(getSequence(case5[3])).toEqual(getCorrectSequence(6, 8))
      expect(getSequence(case5[4])).toEqual(getCorrectSequence(8, 10))

      const case7 = testHelper(7)
      expect(getSequence(case7[0])).toEqual(getCorrectSequence(0, 2))
      expect(getSequence(case7[1])).toEqual(getCorrectSequence(2, 4))
      expect(getSequence(case7[2])).toEqual(getCorrectSequence(4, 6))
      expect(getSequence(case7[3])).toEqual(getCorrectSequence(6, 7))
      expect(getSequence(case7[4])).toEqual(getCorrectSequence(7, 8))
      expect(getSequence(case7[5])).toEqual(getCorrectSequence(8, 9))
      expect(getSequence(case7[6])).toEqual(getCorrectSequence(9, 10))
    });

    it('renders the label if label provided', () => {
      render(<MultiCheck options={options} label='test' />)
      expect(screen.getByText('test').className).toBe('MultiCheck_label')
    });
  });
});
