import React from 'react';
import Svg, { Rect, Mask, G, Path } from 'react-native-svg';

interface IconSaidaProps {
  width?: number;
  height?: number;
}

export const IconSaida: React.FC<IconSaidaProps> = ({ width = 24, height = 24 }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 48 49" fill="none">
      <Rect y="0.5" width="48" height="48" rx="24" fill="#F2F2F2"/>
      <Mask id="mask0_384_2746" maskUnits="userSpaceOnUse" x="12" y="12" width="24" height="25">
        <Rect x="12" y="12.5" width="24" height="24" fill="#D9D9D9"/>
      </Mask>
      <G mask="url(#mask0_384_2746)">
        <Path d="M23 32.5V20.325L17.4 25.925L16 24.5L24 16.5L32 24.5L30.6 25.925L25 20.325V32.5H23Z" fill="#00051B"/>
      </G>
    </Svg>
  );
};
