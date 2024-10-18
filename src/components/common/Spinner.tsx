import { ActivityIndicator } from 'react-native';
import React from 'react';

type Props = {
  size?: number | 'small' | 'large' | undefined;
  color?: string | undefined;
};

const Spinner = ({ size, color }: Props) => {
  return <ActivityIndicator size={size} color={color} />;
};

export default Spinner;
