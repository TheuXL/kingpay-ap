import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface SetaCalendarioIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export const SetaCalendarioIcon: React.FC<SetaCalendarioIconProps> = ({ 
  width = 13, 
  height = 8, 
  color = '#00051B' 
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 13 8" fill="none">
      <Path 
        d="M0.453612 1.5606L1.51134 0.493349L6.47092 5.40867L11.3862 0.449097L12.4535 1.50683L6.48044 7.53365L0.453612 1.5606Z" 
        fill={color}
      />
    </Svg>
  );
};
