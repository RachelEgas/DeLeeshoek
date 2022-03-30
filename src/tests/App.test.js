import React from 'react';
import App from './../App';
import {shallow} from "enzyme";


it("App renders without crashing", () => {
  shallow(<App />);
});

it("renders header", () => {
  const wrapper = shallow(<App />);
  const welcome = <div style={{ display: 'none' }}>test header</div>;
  expect(wrapper.contains(welcome)).toEqual(true);
});