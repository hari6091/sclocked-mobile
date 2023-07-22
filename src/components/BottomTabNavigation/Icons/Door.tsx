import { FontAwesome5 } from "@expo/vector-icons";
import { Icon } from "native-base";
import React from "react";

import { IconProps } from "./types";

export const Door = (props: IconProps) => {
  const color = props.focused ? "#fff" : "#2486CE";

  return <Icon as={FontAwesome5} name="door-closed" size="7" color={color} />;
};

export default Door;
