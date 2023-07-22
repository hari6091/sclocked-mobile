import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import { screens } from "../constants";
import { Doors, Profile } from "../screens";
import { MainTabParamList } from "./types";
import { HomeIcon, DoorIcon, PeopleIcon } from "../components";

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabScreen = () => {
  return (
    <Tab.Navigator
      backBehavior="history"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#28374D",
          borderTopEndRadius: 10,
          borderTopStartRadius: 10,
        },
      }}
    >
      <Tab.Screen
        name={screens.DOOR}
        component={Doors}
        options={({ route }) => ({
          headerShown: false,
          tabBarIcon: (props) => <DoorIcon {...props} />,
        })}
      />
      <Tab.Screen
        name={screens.PROFILE}
        component={Profile}
        options={({ route }) => ({
          headerShown: false,
          tabBarIcon: (props) => <PeopleIcon {...props} />,
        })}
      />
    </Tab.Navigator>
  );
};

export default MainTabScreen;
