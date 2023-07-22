import { SvgProps } from 'react-native-svg';

export interface IconProps extends SvgProps {
  focused: boolean;
  color?: string;
  size?: number;
}
