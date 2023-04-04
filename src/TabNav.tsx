import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import HomeScreen from './screen/HomeScreen';
import CounterScreen from './screen/CounterScreen';
import LogoutScreen from './screen/LogoutScreen';
import MeterSVG from './assets/icons/svgIcons/MeterSVG';
import HomeSVG from './assets/icons/svgIcons/HomeSVG';
import LogoutSVG from './assets/icons/svgIcons/LogoutSVG';
import {COLORS} from './constants/theme';

type MainTabParamList = {
  HomeScreen: undefined;
  Counter: undefined;
  Logout: undefined;
};

const Tab = createMaterialBottomTabNavigator<MainTabParamList>();

function TabNav() {
  return (
    <Tab.Navigator
      activeColor="#fff"
      inactiveColor="#3e2465"
      barStyle={{backgroundColor: COLORS.secondary}}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Главная',
          tabBarIcon: () => <HomeSVG />,
        }}
      />
      <Tab.Screen
        name="Counter"
        component={CounterScreen}
        options={{
          tabBarLabel: 'Показания',
          tabBarIcon: () => <MeterSVG />,
        }}
      />
      <Tab.Screen
        name="Logout"
        component={LogoutScreen}
        options={{
          tabBarLabel: 'Выход',
          tabBarIcon: () => <LogoutSVG />,
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNav;
