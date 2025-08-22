import React from 'react';
import Svg, { Rect, Mask, G, Path } from 'react-native-svg';

interface IconSaidaMovimentacoesProps {
  width?: number;
  height?: number;
}

export default function IconSaidaMovimentacoes({ width = 48, height = 49 }: IconSaidaMovimentacoesProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 48 49" fill="none">
      <Rect y="0.0668945" width="48" height="48" rx="24" fill="#ECECEC"/>
      <Mask id="mask0_621_1590" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="12" y="12" width="24" height="25">
        <Rect x="36" y="36.0669" width="24" height="24" transform="rotate(-180 36 36.0669)" fill="#D9D9D9"/>
      </Mask>
      <G mask="url(#mask0_621_1590)">
        <Path d="M25 32.0669L25 19.8919L30.6 25.4919L32 24.0669L24 16.0669L16 24.0669L17.4 25.4919L23 19.8919L23 32.0669L25 32.0669Z" fill="#00051B"/>
      </G>
    </Svg>
  );
}
