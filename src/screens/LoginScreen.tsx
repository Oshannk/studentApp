import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  KeyboardType,
} from 'react-native';
import {Input} from 'react-native-elements';

const renderInputField = (
  // title: string,
  placeHolder: string,
  errorMessage: string,
  renderErrorMessage: boolean,
  setValue?: Function,
  secureText?: boolean,
  keyboardType?: KeyboardType,
  _value?: any,
) => {
  return (
    <View key={placeHolder}>
      <Input
        // label={'name'}
        //editable={false}
        keyboardType={keyboardType}
        labelStyle={styles.inputLabelStyle}
        placeholderTextColor={'#777'}
        containerStyle={styles.inputContainerStyle}
        inputStyle={styles.inputStyles}
        placeholder={placeHolder}
        secureTextEntry={secureText}
        errorStyle={styles.inputError}
        errorMessage={!renderErrorMessage ? errorMessage : ''}
        onChangeText={text => {
          setValue(text);
        }}
        value={_value}
        autoCapitalize="none"
        autoCorrect={false}
        inputContainerStyle={styles.inputContainer}
        autoCompleteType={undefined}
      />
    </View>
  );
};
const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const validateUsername = () => {
    let valid = true;
    if (username.length === 0) {
      valid = false;
    }
    setIsUsernameValid(valid);
    return valid;
  };

  const validatePassword = () => {
    let valid = true;
    if (password.length === 0) {
      valid = false;
    }
    setIsPasswordValid(valid);
    return valid;
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={0}
      style={{flex: 1, alignItems: 'center', backgroundColor: 'white'}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{flex: 1, backgroundColor: 'white'}}>
        <View style={styles.container}>
          <View style={styles.titleView}>
            <Text style={styles.title}>Student Management System</Text>
          </View>
          <View style={styles.imageView}>
            <Image
              style={{width: 300, height: 300}}
              source={require('../assets/images/loginImage.jpg')}
            />
          </View>

          <View style={styles.bottomView}>
            {renderInputField(
              'Username',
              'The username is required.',
              isUsernameValid,
              setUsername,
            )}
            {renderInputField(
              'Password',
              'The password is required.',
              isPasswordValid,
              setPassword,
              true,
            )}
            <TouchableOpacity
              onPress={() => {
                const _validateUsername = validateUsername();
                const _validatePassword = validatePassword();

                if (
                  _validateUsername &&
                  _validatePassword &&
                  username === 'admin' &&
                  password === 'admin'
                ) {
                  navigation.navigate('Students');
                }
              }}
              style={styles.loginButton}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 40,
  },
  loginButton: {
    height: 45,
    backgroundColor: '#5AE4A7',
    borderRadius: 5,
    width: '93%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 15,
    fontWeight: '500',
    color: 'white',
  },
  inputContainer: {borderBottomWidth: 0, width: '100%'},
  inputError: {color: 'red', paddingBottom: 10},
  inputStyles: {
    backgroundColor: '#fff',
    borderColor: '#DADADA',
    borderRadius: 4,
    height: 40,
    padding: 10,
    overflow: 'hidden',
    borderWidth: 1,
    fontSize: 15,
  },
  inputContainerStyle: {overflow: 'hidden'},
  inputLabelStyle: {
    paddingBottom: 1,
    fontWeight: '200',
    color: 'black',
    fontSize: 16,
  },
  bottomView: {
    paddingTop: 60,
    flex: 6,
    alignItems: 'center',
    width: '100%',
  },
  title: {
    color: 'grey',
    fontSize: 25,
    fontWeight: '300',
  },
  titleView: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
  },
  imageView: {
    flex: 5,
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginScreen;
