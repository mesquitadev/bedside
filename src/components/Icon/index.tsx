import React from 'react';
import {Svg} from 'react-native-svg';
import * as allIcons from './icons';
interface Icon {
  width: number;
  height: number;
  viewBox: string;
  primaryColor: string;
  secondaryColor: string;
  name: string;
}

const Icon = ({
  width,
  height,
  viewBox,
  name,
  primaryColor,
  secondaryColor,
}: Icon) => (
  <Svg width={width} height={height} viewBox={viewBox}>
    {allIcons[name](primaryColor, secondaryColor)}
  </Svg>
);

Icon.defaultProps = {
  name: 'Back',
  primaryColor: '#000',
  secondaryColor: '',
  width: 32,
  height: 32,
  viewBox: '0 0 32 32',
};

export default Icon;
