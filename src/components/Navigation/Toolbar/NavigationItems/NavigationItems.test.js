import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({ adapter: new Adapter() });

describe('<NavigationItems />', () => {
  const wrapper = shallow(<NavigationItems />);

  it('Should render 2 <NavigationItems /> elements if not authenicated', () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it('Should render 2 <NavigationItems /> elements if not authenicated', () => {
    wrapper.setProps({ isAuth: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });
});
