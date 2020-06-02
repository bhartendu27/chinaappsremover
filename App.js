/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, Share, ScrollView, FlatList, Modal, TouchableOpacity, Linking} from 'react-native';
import RNAndroidInstalledApps from 'react-native-android-installed-apps';
import { chinaapps } from './chinaapps';
import IntentLauncher, { IntentConstant } from 'react-native-intent-launcher'
import SplashScreen from 'react-native-splash-screen'
import {ThemeStatic, Typography} from './app/theme'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Button from './app/components/Button'
import Header from './app/components/headers/header';


// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });
const { FontWeights, FontSizes } = Typography;
type Props = {};
export default class App extends Component<Props> {

  state = {
    apps : null,
    appsFound : [],
    scanning: false,
    showApps: false,
    modalVisible: false
  }

  removeApp(packageName) {
    IntentLauncher.startActivity({
      // action: 'android.settings.APPLICATION_DETAILS_SETTINGS',
      // action: 'android.intent.action.DELETE',
      action: 'android.intent.action.UNINSTALL_PACKAGE',
      data: `package:${packageName}`
    })
  }

  operation(list1, list2, isUnion) {
    //list1 chinaapps
    //list2 installed apps
    var result = [];

    for (var i = 0; i < list1.length; i++) {
        var item1 = list1[i],
            found = false;
        for (var j = 0; j < list2.length && !found; j++) {
            // found = item1.userId === list2[j].userId;
            // found = item1.package === list2[j].packageName;
            found = item1.packageName === list2[j].package;
        }
        if (found === !!isUnion) { // isUnion is coerced to boolean
            result.push(item1);
        }
    }
    return result;
  }

  inBoth(list1, list2) {
    return this.operation(list1, list2, true);
  }

  render() {
    console.log(this.state.appsFound)
    // return (
    //   <View style={styles.container}>
    //     {/* <Text style={styles.welcome}>Welcome to React Native!</Text>
    //     <Text style={styles.instructions}>To get started, edit App.js</Text>
    //     <Text style={styles.instructions}>{instructions}</Text> */}
    //     {(this.state.appsFound.length) ? (

    //       this.state.appsFound.map((data, index) => {

    //         return (
    //         <View key={index}>
    //           <Text >{data.packageName}</Text>
    //           <Text >{data.appName}</Text>
    //           <Image key={index} style={{width: 50, height: 50, borderWidth: 1, borderColor: 'red'}} source={{uri: `data:image/png;base64,${data.icon}`}} />
    //           <Button title="Del" onPress={() => {this.removeApp(data.packageName)}}/>
    //           </View>
    //           )
    //         // <Text style={styles.welcome} >{data.packageName}</Text>
    //       //   <View key={index}>
    //       //     <Text key={index}>{data.packageName}</Text>
    //       // <Text key={index}>{data.appName}</Text>
    //       //  <Image key={index} style={{width: 50, height: 50, borderWidth: 1, borderColor: 'red'}} source={{uri: `data:image/png;base64,${data.icon}`}} />
    //       //   </View>
    //       })
    //     ) : null}
    //   </View>
    // );

    if (1) {
      content = (
        <>
          {(this.state.modalVisible) ? <View style={styles.content}>
            {/* <Text style={styles.titleText}>Remove China Apps</Text> */}
            <TouchableOpacity activeOpacity={0.5} onPress={() => { Linking.openURL('https://apps.roveterio.com/app-privacy') }}>
              <Text style={[styles.subtitleText, {color: 'blue', textDecorationLine: 'underline'}]}>Privacy Policy</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} onPress={() => { Linking.openURL('mailto:developer@roveterio.com?subject=Contacting Through RemoveChinaApps') }}>
              <Text style={[styles.subtitleText, {color: 'blue', textDecorationLine: 'underline'}]}>Contact Us</Text>
            </TouchableOpacity>
            {/* <Text style={[styles.subtitleText, {color: 'blue', textDecorationLine: 'underline'}]}>Hi</Text>
            <Text style={styles.subtitleText}>Hi</Text>
            <Text style={styles.subtitleText}>Hi</Text> */}
          </View> : null}
          <View style={styles.content}>
            {/* <Text style={styles.titleText}>Remove China Apps</Text> */}
            <Text style={(this.state.apps == null) ? [styles.subtitleText] : [styles.subtitleText, {borderWidth: 2, borderColor: '#846BE2', borderRadius: 12, padding: 10, backgroundColor: '#FA8072'}] }>
              {(this.state.apps == null) ? 'Click on "Scan Now" to find installed China Apps on Your Phone.' : (this.state.appsFound.length) ? `${this.state.appsFound.length} Chinese Apps Found` : 'Awesome! No China Apps Found on Your Phone' }
          </Text>
          </View>
          <View style={styles.banner}>
            {/* <LoginBanner /> */}

            {(this.state.appsFound.length) ? (
              <FlatList
                data={this.state.appsFound}
                renderItem={({item}) => (
                  <>
                    <View style={styles.about}>
              <View style={{marginRight: 8}}>
              <Image style={{width: 50, height: 50, resizeMode: 'center'}} source={{uri: `data:image/png;base64,${item.icon}`}} />
              </View>
              <View style={{flex: 1}} >
              <Text style={styles.aboutTitle}>{item.appName}</Text>
            <Text style={styles.aboutText}>{`${Math.round(item.size/1048576)} MB`}</Text>
              </View>
              <View style={{flex: 1}}>
                <Button label="Remove" containerStyle={{backgroundColor: 'red', alignSelf: 'center', marginTop: 4}}  onPress={() => {this.removeApp(item.packageName)}}/>
              </View>
              </View>
              </>
                )}
              />

          // this.state.appsFound.map((data, index) => {
          //   return (
          //   <View key={index} style={styles.about}>
          //     <View style={{marginRight: 8}}>
          //     <Image key={index} style={{width: 50, height: 50, resizeMode: 'center'}} source={{uri: `data:image/png;base64,${data.icon}`}} />
          //     </View>
          //     <View style={{flex: 1}} >
          //     <Text style={styles.aboutTitle}>{data.appName}</Text>
          //   <Text style={styles.aboutText}>{`${Math.round(data.size/1048576)} MB`}</Text>
          //     </View>
          //     <View style={{flex: 1}}>
          //       <Button label="Remove" containerStyle={{backgroundColor: 'red', alignSelf: 'center', marginTop: 4}}  onPress={() => {this.removeApp(data.packageName)}}/>
          //     </View>
          //     </View>
          //     )
          // })
        ) : null}
            <View>
              {(this.state.scanning) ? <Text>Scanning...</Text> : null }
              {(this.state.apps == null) ?
              <Button
                // Icon={GoogleLogo}
                label='Scan Now'
                onPress={() => {
                  if(this.state.modalVisible){
                    this.setState({modalVisible: false})
                  }
                  this.scanApps();
                }}
                containerStyle={styles.loginButton}
                labelStyle={styles.loginButtonText}
                indicatorColor={ThemeStatic.white}
                loading={this.state.scanning}
                // disabled={this.state.scanning}
              /> : <><Button
              // Icon={GoogleLogo}
              label='Share this App'
              onPress={() => {
                this.onShare();
              }}
              containerStyle={[styles.loginButton]}
              labelStyle={styles.loginButtonText}
              indicatorColor={ThemeStatic.white}
              // loading={this.state.scanning}
              // disabled={this.state.scanning}
            /><TouchableOpacity activeOpacity={0.5} onPress={() => { Linking.openURL('https://play.google.com/store/apps/details?id=com.roveterio.removechinaapps') }}>
            <Text style={[styles.subtitleText, {color: 'blue', textDecorationLine: 'underline', fontSize: 14}]}>Rate Us</Text>
          </TouchableOpacity></>}

              {/* {appleSignInButton} */}
              {/* <TouchableOpacity
                // @ts-ignore
                onPress={termsAndConditionsBottomSheetRef.current.open}
                style={styles.terms}>
                <Text style={styles.termsText}>Terms and conditions</Text>
              </TouchableOpacity> */}
            </View>
          </View>
        </>
      );
    }

    return (



      <View style={styles.container}>
        <Header
        title='Remove China Apps'
        IconRight={this.IconRight}
      />
        {content}
        {/* {} */}
        {/* <TermsAndConditionsBottomSheet ref={termsAndConditionsBottomSheetRef} /> */}
        {/* <ConfirmationModal
          label='Confirm'
          title='Terms and Conditions'
          description={`By clicking confirm you agree to our terms and conditions`}
          color={ThemeStatic.accent}
          isVisible={termsConfirmationModal}
          toggle={termsConfirmationToggle}
          onConfirm={processNewUser}
        /> */}
        {/* <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setModalVisible(!this.state.modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </View>
        <View>
          <Text>Hi</Text>
        </View>
      </Modal> */}
      </View>

    );
  }

  componentDidMount() {
    // RNAndroidInstalledApps.getApps()
    // this.scanApps()
    SplashScreen.hide();
  }

  IconRight = () =>
    (<TouchableOpacity onPress={() => { this.setState({modalVisible: !this.state.modalVisible}) }} activeOpacity={0.95} style={[{alignItems: 'flex-end', marginLeft: 5, width: 25, borderRadius: 50, borderWidth: 2, borderColor: '#000000'}]}>
      <Text style={{color: '#333', alignSelf: 'center', textDecorationStyle:'solid'}}>i</Text>
    </TouchableOpacity>)




  onShare = async () => {
    try {
      const result = await Share.share({
        message:
          `I Found ${(this.state.appsFound.length) ? 'and Removed '+this.state.appsFound.length : 'No'} Chinese Apps on My Phone.\n Download *Remove China Apps* https://play.google.com/store/apps/details?id=com.roveterio.removechinaapps`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
  }

  async scanApps() {
    await this.setStateAsync({scanning: true});
    // if(this.state.scanning){
      RNAndroidInstalledApps.getNonSystemApps()
      .then(apps => {
        this.setState({apps, scanning: true});
        // console.log(apps)
        // console.log(chinaapps)
        console.log(this.inBoth(apps,chinaapps))
        let appsFound = this.inBoth(apps,chinaapps);
        if(appsFound) {
          this.setState({appsFound, scanning: false});
        } else {
          this.setState({scanning: false})
        }
      })
      .catch(error => {
        alert(error);
      });
    // }

  }

}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // justifyContent: 'center',
//     // alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  content: {
    marginTop: responsiveHeight(8),
    marginHorizontal: 20
  },
  titleText: {
    ...FontWeights.Bold,
    ...FontSizes.Heading,
    color: '#000000'
  },
  subtitleText: {
    ...FontWeights.Light,
    ...FontSizes.Label,
    marginTop: 10,
    alignSelf: 'center',
    color: '#000000'
  },
  banner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: responsiveHeight(Platform.select({ ios: 10, android: 12 })),
    paddingBottom: 16,
  },
  loginButton: {
    height: 44,
    width: responsiveWidth(90),
    alignSelf: 'center',
    marginTop: 16,
    // marginBottom: 10,
    borderWidth: Platform.select({ ios: StyleSheet.hairlineWidth, android: 0.8 }),
    borderColor: '#846BE2',
    backgroundColor: '#846BE2'
  },
  loginButtonText: {
    ...FontWeights.Regular,
    ...FontSizes.Body,
    marginLeft: 10,
    color: '#FFFFFF'
  },
  appleSignIn: {
    height: 44,
    width: responsiveWidth(90),
    marginBottom: 10
  },
  loadingAppleLogin: {
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  terms: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  termsText: {
    ...FontWeights.Light,
    ...FontSizes.Body,
    color: '#BBBBBB'
  },
  about: {
    flexDirection: 'row',
    padding: 8,
    marginTop: 2,
    backgroundColor: '#fff',
    borderColor: '#846BE2',
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 2,
    width: responsiveWidth(90)
  },
  aboutTitle: {
    ...FontWeights.Regular,
    ...FontSizes.Body,
    color: 'black',
  },
  aboutText: {
    ...FontWeights.Light,
    ...FontSizes.Body,
    color: 'black',
    // marginTop: 2,
  }
});
