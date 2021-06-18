import React from 'react';
import { shallow, enzyme } from 'enzyme';
import toJson from 'enzyme-to-json';
import App from './App';
import { render } from '@testing-library/react';
import { Main } from './App';
import { expect, jest } from '@jest/globals';



test('should render App correctly', () => {
  const wrapper = shallow(<App />) 
  expect(toJson(wrapper)).toMatchSnapshot();
});


test('should render Main Page correctly', () => {
  const { getByText } = render(<App />);
  expect(getByText(/Please submit a link to get started!/i)).toBeInTheDocument();
});

test('should show data on Main Page correctly', () => {
  const mockLink = [["hepsiburada", "www.hepsiburada.com", 5], ["n11", "www.n11.com", 2]]
  const wrapper = shallow(<Main options={mockLink} filters={'Asc'}/>);
  expect(toJson(wrapper)).toMatchSnapshot();
})

test('should ascending-sort data on Options correctly', () => {
  const onSortChange = jest.fn();
  const value = 'Desc';
  const mockLink = [["hepsiburada", "www.hepsiburada.com", 5], ["n11", "www.n11.com", 2]];
  const wrapper = shallow(<Main options={mockLink} onSortChange={onSortChange} filters={'Desc'}/>);
  wrapper.find('select').simulate('change', {
    target: { value }
  });
  expect(wrapper.instance('filters')).toBe(value);
})

test('should ascending-sort data on Options correctly', () => {
  const onSortChange = jest.fn();
  const value = 'Asc';
  const mockLink = [["hepsiburada", "www.hepsiburada.com", 5], ["n11", "www.n11.com", 2]];
  const wrapper = shallow(<Main options={mockLink} onSortChange={onSortChange} filters={'Asc'}/>);
  const component = wrapper.instance();
  wrapper.find('select').simulate('change', {
    target: { value }
  });
  expect(wrapper.state('filters')).toBe(value);
})

