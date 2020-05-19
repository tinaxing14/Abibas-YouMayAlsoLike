import React from 'react';
import { render, shallow } from 'enzyme';
import CompleteTheLook from '../ctl.jsx';

let wrapped = render(<CompleteTheLook />);
describe('Render CompleteTheLook component', () => {
  it('renders the H4 children', () => {
    expect(wrapped.find('h4').text()).toEqual('complete the look');
  });
});