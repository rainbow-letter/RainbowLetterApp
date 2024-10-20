import { StyleSheet, View, Text, Pressable } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { RootState } from '../../store/reducer';
import { useSelector } from 'react-redux';

import { tabBar } from '../../constants/icons';
import { THEME } from '../../constants/theme';

interface RouteType {
  key: string;
  name: string;
  params: undefined;
}

const FLOATING_SIZE = 72;

const TabBar = ({ state, descriptors, navigation }: any) => {
  const token = useSelector((state: RootState) => state.account.token);

  return (
    <View style={styles.container}>
      {state.routes.map((route: RouteType, index: number) => {
        const Icon = tabBar[route.name];
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
        const isfloating = route.name === 'WriteLetter';

        const onPress = () => {
          if (!token) {
            return navigation.navigate('Login');
          }

          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <Pressable
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              alignItems: 'center',
              backgroundColor: THEME.COLOR.WHITE,
            }}>
            <LinearGradient
              colors={
                isfloating
                  ? [THEME.COLOR.ORANGE_1, THEME.COLOR.ORANGE_2]
                  : [THEME.COLOR.WHITE, THEME.COLOR.WHITE]
              }
              style={
                !isfloating
                  ? styles.buttonWrap
                  : [styles.buttonWrap, styles.floatingWrap]
              }>
              <Icon
                color={isFocused ? THEME.COLOR.ORANGE_1 : THEME.COLOR.GRAY_1}
              />
              <Text
                style={
                  isfloating
                    ? styles?.floatingText
                    : {
                        ...styles?.label,
                        color: isFocused
                          ? THEME.COLOR.ORANGE_1
                          : THEME.COLOR.GRAY_1,
                      }
                }>
                {label}
              </Text>
            </LinearGradient>
          </Pressable>
        );
      })}
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  buttonWrap: {
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingWrap: {
    bottom: 12,
    width: FLOATING_SIZE,
    height: FLOATING_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: FLOATING_SIZE / 2,
  },
  floatingText: {
    fontSize: 12,
    marginTop: 4,
    color: THEME.COLOR.WHITE,
    lineHeight: 18,
  },
  label: {
    fontSize: 12,
    alignItems: 'center',
    marginTop: 4,
  },
});
