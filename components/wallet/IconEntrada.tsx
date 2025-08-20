import React from 'react';
import Svg, { Rect, Mask, G, Path } from 'react-native-svg';

interface IconEntradaProps {
  width?: number;
  height?: number;
}

export const IconEntrada: React.FC<IconEntradaProps> = ({ width = 24, height = 24 }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 48 49" fill="none">
      <Rect y="0.5" width="48" height="48" rx="24" fill="#CAEECC"/>
      <Mask id="mask0_384_2733" maskUnits="userSpaceOnUse" x="12" y="12" width="24" height="25">
        <Rect x="12" y="12.5" width="24" height="24" fill="#D9D9D9"/>
      </Mask>
      <G mask="url(#mask0_384_2733)">
        <Path d="M23 16.5V28.675L17.4 23.075L16 24.5L24 32.5L32 24.5L30.6 23.075L25 28.675V16.5H23Z" fill="#148430"/>
      </G>
    </Svg>
  );
};
