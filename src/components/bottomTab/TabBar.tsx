import { StyleSheet, View, Text, Pressable } from 'react-native';
import React from 'react';
import { tabBar } from '../../constants/icons';
import { theme } from '../../constants/theme';

interface RouteType {
  key: string;
  name: string;
  params: undefined;
}

const FLOATING_SIZE = 72;

const TabBar = ({ state, descriptors, navigation }: any) => {
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
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
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
            }}>
            <View
              style={
                !isfloating
                  ? styles.buttonWrap
                  : [styles.buttonWrap, styles.floatingWrap]
              }>
              <Icon color={isFocused ? '#FFB74D' : '#BDBDBD'} />
              <Text
                style={
                  isfloating
                    ? styles?.floatingText
                    : {
                        ...styles?.label,
                        color: isFocused ? '#FFB74D' : '#BDBDBD',
                      }
                }>
                {label}
              </Text>
            </View>
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
    paddingVertical: 8,
  },
  buttonWrap: {
    padding: 10,
    alignItems: 'center',
  },
  floatingWrap: {
    position: 'absolute',
    bottom: 4,
    width: FLOATING_SIZE,
    height: FLOATING_SIZE,
    alignItems: 'center',
    backgroundColor: '#FFB74D',
    borderRadius: FLOATING_SIZE / 2,
  },
  floatingText: {
    fontSize: 12,
    marginTop: 4,
    color: theme.color.white,
  },
  label: {
    fontSize: 12,
    alignItems: 'center',
    marginTop: 4,
  },
});
