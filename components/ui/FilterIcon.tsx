import React from 'react';
import Svg, { Rect, Mask, G, Path } from 'react-native-svg';

interface FilterIconProps {
  width?: number;
  height?: number;
}

export default function FilterIcon({ width = 54, height = 55 }: FilterIconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 54 55" fill="none">
      <Rect y="0.0671387" width="54" height="54" rx="27" fill="#F2F2F2"/>
      <Mask id="mask0_621_1617" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="15" y="15" width="24" height="25">
        <Rect x="15" y="15.0671" width="24" height="24" fill="#D9D9D9"/>
      </Mask>
      <G mask="url(#mask0_621_1617)">
        <Path d="M26.4042 34.2672C26.2345 34.2672 26.0914 34.2097 25.9747 34.0947C25.858 33.9797 25.7997 33.8372 25.7997 33.6672V27.9922L19.9247 20.8422C19.7747 20.6422 19.7519 20.4297 19.8562 20.2047C19.9604 19.9797 20.1415 19.8672 20.3997 19.8672H33.5997C33.8579 19.8672 34.039 19.9797 34.1432 20.2047C34.2475 20.4297 34.2247 20.6422 34.0747 20.8422L28.1997 27.9922V33.6672C28.1997 33.8372 28.1424 33.9797 28.0277 34.0947C27.9129 34.2097 27.7707 34.2672 27.6012 34.2672H26.4042ZM26.9997 26.6172L31.0497 21.6672H22.9247L26.9997 26.6172Z" fill="#5B5B5B"/>
      </G>
    </Svg>
  );
}
