import React from 'react';
import Svg, { Rect, Mask, G, Path } from 'react-native-svg';

interface IconEntradaMovimentacoesProps {
  width?: number;
  height?: number;
}

export default function IconEntradaMovimentacoes({ width = 48, height = 49 }: IconEntradaMovimentacoesProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 48 49" fill="none">
      <Rect y="0.0668945" width="48" height="48" rx="24" fill="#CAEECC"/>
      <Mask id="mask0_621_1580" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="12" y="12" width="24" height="25">
        <Rect x="12" y="12.0669" width="24" height="24" fill="#D9D9D9"/>
      </Mask>
      <G mask="url(#mask0_621_1580)">
        <Path d="M23 16.0669V28.2419L17.4 22.6419L16 24.0669L24 32.0669L32 24.0669L30.6 22.6419L25 28.2419V16.0669H23Z" fill="#148430"/>
      </G>
    </Svg>
  );
}
