import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useIsFocused } from '@react-navigation/native';
import NetInfo from "@react-native-community/netinfo";
import { LogBox } from 'react-native';

export default function CheckNetwork({ navigation }) {
  const [network, setNetwork] = useState(true);
  const isFocused = useIsFocused();

  const checkNetwork = async () => {
    NetInfo.fetch().then(state => {
      setNetwork(state.isInternetReachable === true);
      //  console.log("Connection type", state.type);
      // console.log("Is isInternetReachable?", state.isInternetReachable);
    });
  };

  useEffect(() => {
    if (isFocused) {
      checkNetwork();
      LogBox.ignoreLogs(['new NativeEventEmitter']);
      //LogBox.ignoreAllLogs()
    }
    //  sets up an event listener
    const unsubscribe = NetInfo.addEventListener(state => {
      setNetwork(state.isInternetReachable === true);
    });

    return () => {
      unsubscribe(); // listener is cleaned up
    };
  }, [isFocused]);

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity style={{ width: wp('100'), height: hp('100'), justifyContent: 'center', alignItems: 'center' }}>
        {network === true ? (
          <>
            <MaterialIcon name={'wifi-strength-outline'} size={hp('6.5%')} color={'black'} />
            <Text style={{ color: 'black', fontSize: hp('1.70') }}>Stable Network </Text>
          </>
        ) : (
          <>
            <MaterialIcon name={'wifi-strength-off-outline'} size={hp('6.5%')} color={'black'} />
            <Text style={{ color: 'black', fontSize: hp('1.70') }}>No Network </Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
}
