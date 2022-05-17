import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

// #FFFFFF
// #494749
// #1F1E1E
// #010001

const TabArr = [
  {
    route: 'Home',
    label: 'Home',
    type: Ionicons,
    activeIcon: 'home',
    inActiveIcon: 'home-outline',
    component: HomeScreen,
    tabBarColor: '#581ce6',
  },
  {
    route: 'Add',
    label: 'Add',
    type: FontAwesome, // MartiacalCommunity
    activeIcon: 'plus-square',
    inActiveIcon: 'plus-square-o',
    component: SettingsScreen,
    tabBarColor: '#1ce65c',
  },
  {
    route: 'Like',
    label: 'Like',
    type: Ionicons,
    activeIcon: 'ios-heart-sharp',
    inActiveIcon: 'ios-heart-outline',
    component: ProfilesScreen,
    tabBarColor: '#e6a91c',
  },
  {
    route: 'Account',
    label: 'Home',
    type: FontAwesome, // FontAwesome
    activeIcon: 'user',
    inActiveIcon: 'user-o',
    component: NotificationScreen,
    tabBarColor: '#9e0888',
  },
];

const {width} = Dimensions.get('window');
const MARGIN = 16;
const TAB_BAR_WIDTH = width - 2 * MARGIN;
const TAB_WIDTH = TAB_BAR_WIDTH / TabArr.length;

function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
      }}>
      <Text>Home screen</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
      }}>
      <Text>Settings!</Text>
    </View>
  );
}

function ProfilesScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
      }}>
      <Text>ProfilesScreen!</Text>
    </View>
  );
}

function NotificationScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
      }}>
      <Text>NotificationScreen!</Text>
    </View>
  );
}

function MyTabBar({state, descriptors, navigation}) {
  const [translateX, setTranslateX] = useState(new Animated.Value(0));

  useEffect(() => {
    translateTab(state.index);
  }, [state.index]);

  const translateTab = index => {
    // Animated.spring(translateX, {
    //   toValue: index * TAB_WIDTH,
    //   useNativeDriver: true,
    // }).start();

    Animated.timing(translateX, {
      toValue: index * TAB_WIDTH,
      useNativeDriver: true,
      duration: 700,
      easing: Easing.bezier(0.68, -0.55, 0.265, 1.55),
    }).start();
  };

  return (
    <View style={styles.tabBarContainer}>
      <Animated.View style={[styles.slidingTabContainer, {}]}>
        <Animated.View
          style={[
            {
              width: 70,
              height: 55,
              alignSelf: 'center',
              borderRadius: 13,
              bottom: 25,
              borderWidth: 6.5,
              borderColor: '#1F1E1E',
            },
            {
              transform: [{translateX}],
              backgroundColor: '#010001',
            },
          ]}
        />
      </Animated.View>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const TabBarIcon = options.tabBarIcon;
        const IconComponentName = TabBarIcon.type;

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            key={index}
            style={{flex: 1, alignItems: 'center', paddingHorizontal: 3}}>
            <TabIcon
              isFocused={isFocused}
              TabBarIcon={TabBarIcon}
              IconComponentName={IconComponentName}
              label={label}
              index={state.index}
              tabColor={options.tabColor}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const TabIcon = ({
  isFocused,
  TabBarIcon,
  IconComponentName,
  label,
  index,
  tabColor,
}) => {
  const [translateY] = useState(new Animated.Value(0));

  useEffect(() => {
    if (isFocused) {
      translateIcon(-19);
    } else {
      translateIcon(0);
    }
  }, [isFocused]);

  const translateIcon = val => {
    // Animated.spring(translateY, {
    //   toValue: val,
    //   useNativeDriver: true,
    // }).start();

    Animated.timing(translateY, {
      toValue: val,
      useNativeDriver: true,
      duration: 400,
      easing: Easing.bezier(0.55, 0.055, 0.675, 0.19),
    }).start();
  };

  return (
    <>
      <Animated.View style={{transform: [{translateY}]}}>
        <IconComponentName
          name={TabBarIcon.inActiveIcon}
          size={24}
          color={isFocused ? '#FFFFFF' : '#494749'}
        />
      </Animated.View>
      {isFocused ? (
        <View style={{height: 30, alignItems: 'center'}}>
          <View style={{top: -6}}>
            <Text style={{color: '#FFFFFF', fontSize: 19}}>•</Text>
          </View>
          <View style={{top: -12}}>
            <Text style={{color: isFocused ? '#FFFFFF' : '#333333'}}>
              {label}
            </Text>
          </View>
        </View>
      ) : null}
    </>
  );
};

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{headerShow: false}}
        tabBar={props => <MyTabBar {...props} />}>
        {TabArr.map((item, index) => {
          return (
            <Tab.Screen
              key={index}
              name={item.route}
              component={item.component}
              options={{
                tabBarColor: item.tabBarColor,
                tabColor: item.tabBarColor,
                tabBarIcon: {
                  type: item.type,
                  activeIcon: item.activeIcon,
                  inActiveIcon: item.inActiveIcon,
                },
              }}
            />
          );
        })}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    width: TAB_BAR_WIDTH,
    height: 75,
    position: 'absolute',
    alignSelf: 'center',
    bottom: 16,
    backgroundColor: '#1F1E1E',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  slidingTabContainer: {
    width: TAB_WIDTH,
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
  },
  slidingTab: {
    width: 70,
    height: 55,
    alignSelf: 'center',
    borderRadius: 13,
    bottom: 25,
    borderWidth: 6.5,
    borderColor: '#1F1E1E',
  },
});
