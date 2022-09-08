import React, {useState} from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  KeyboardType,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Input} from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';

const AddStudentScreen = ({navigation}) => {
  const [showModel, setShowModel] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [parentName, setParentName] = useState('');
  const [parentContact, setParentContact] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [educationDetails, setEducationDetails] = useState<any[]>([]);
  const [isFirstNameValid, setIsFirstNameValid] = useState(true);
  const [isLastNameValid, setIsLastNameValid] = useState(true);
  const [isContactValid, setIsContactValid] = useState<[boolean, string]>([
    true,
    '',
  ]);
  const [isEmailValid, setIsEmailValid] = useState<[boolean, string]>([
    true,
    '',
  ]);
  const [isParentNameValid, setIsParentNameValid] = useState(true);
  const [isParentContactValid, setIsParentContactValid] = useState(true);
  // const [isParentEmailValid, setIsParentEmailValid] = useState(true);

  const validateFirstName = () => {
    let valid = true;
    if (firstName.length === 0) {
      valid = false;
    }
    setIsFirstNameValid(valid);
    return valid;
  };
  const validateLastName = () => {
    let valid = true;
    if (lastName.length === 0) {
      valid = false;
    }
    setIsLastNameValid(valid);
    return valid;
  };
  const validateContact = () => {
    const reg = /^(?:7|0|(?:\+94))[0-9]{9,10}$/;
    let valid = true;
    let error = 'The contact is required.';
    if (contact.length === 0) {
      valid = false;
    } else if (!reg.test(contact)) {
      valid = false;
      error = 'Invalid Contact Number!.';
    }
    setIsContactValid([valid, error]);
    return valid;
  };
  const validateEmail = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    let valid = true;
    let error = 'The email is required.';

    if (email.length === 0) {
      valid = false;
    } else if (!reg.test(email)) {
      valid = false;
      error = 'Invalid Email Address!.';
    }
    setIsEmailValid([valid, error]);
    return valid;
  };
  const validateParentName = () => {
    let valid = true;
    if (parentName.length === 0) {
      valid = false;
    }
    setIsParentNameValid(valid);
    return valid;
  };
  const validateParentContact = () => {
    let valid = true;
    if (parentContact.length === 0) {
      valid = false;
    }
    setIsParentContactValid(valid);
    return valid;
  };

  const saveButton = async () => {
    const _firstName = validateFirstName();
    const _lastName = validateLastName();
    const _contact = validateContact();
    const _email = validateEmail();
    const _parentName = validateParentName();
    const _parentContact = validateParentContact();

    const saveData = async () => {
      let value = {
        firstName: firstName,
        lastName: lastName,
        contact: contact,
        email: email,
        parentName: parentName,
        parentContact: parentContact,
        parentEmail: parentEmail,
        educationDetails: educationDetails,
      };

      try {
        const keys = await AsyncStorage.getAllKeys();
        const isEmailExist = keys.find(e => e === email) || null;
        if (isEmailExist == null) {
          const jsonValue = JSON.stringify(value);
          await AsyncStorage.setItem(email, jsonValue);
        } else {
          setIsEmailValid([false, 'Email already exist!.']);
        }
      } catch (e) {
        console.error(e);
      }
      const getvalue = await AsyncStorage.getAllKeys();
    };

    if (
      _firstName &&
      _lastName &&
      _contact &&
      _email &&
      _parentName &&
      _parentContact
    ) {
      await saveData().then(e => {
        navigation.goBack();
      });
    }
  };

  const renderInputField = (
    // title: string,
    placeHolder: string,
    errorMessage: string,
    renderErrorMessage: boolean,
    setValue: Function,
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
  interface ModelViewProps extends TextInputProps {
    edDetails: Function;
  }
  const ModelView = (props: {edDetails: Function}) => {
    const {edDetails} = props;

    const [qualification, setQualification] = useState('');
    const [instituteName, setInstituteName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [grade, setGrade] = useState('');

    const [isQualificationValid, setIsQualificationValid] = useState(true);
    const [isInstituteNameValid, setIsInstituteNameValid] = useState(true);
    const [isStartDateValid, setIsStartDateValid] = useState(true);
    const [isEndDateValid, setIsEndDateValid] = useState(true);
    const [isGradeValid, setIsGradeValid] = useState(true);

    const validateQualification = () => {
      let valid = true;
      if (qualification.length === 0) {
        valid = false;
      }
      setIsQualificationValid(valid);
      return valid;
    };

    const validateInstituteName = () => {
      let valid = true;
      if (instituteName.length === 0) {
        valid = false;
      }
      setIsInstituteNameValid(valid);
      return valid;
    };

    const validateStartDate = () => {
      let valid = true;
      if (startDate.length === 0) {
        valid = false;
      }
      setIsStartDateValid(valid);
      return valid;
    };

    const validateEndtDate = () => {
      let valid = true;
      if (endDate.length === 0) {
        valid = false;
      }
      setIsEndDateValid(valid);
      return valid;
    };

    const validateGrade = () => {
      let valid = true;
      if (grade.length === 0) {
        valid = false;
      }
      setIsGradeValid(valid);
      return valid;
    };

    const AddButton = () => {
      const _validateQualification = validateQualification();
      const _validateInstituteName = validateInstituteName();
      const _validateStartDate = validateStartDate();
      const _validateEndDate = validateEndtDate();
      const _validateGrade = validateGrade();

      let edObj = {
        qualification: qualification,
        instituteName: instituteName,
        startDate: startDate,
        endDate: endDate,
        grade: grade,
      };
      if (
        _validateEndDate &&
        _validateStartDate &&
        _validateGrade &&
        _validateQualification &&
        _validateInstituteName
      ) {
        edDetails(edObj);
        setShowModel(false);
      }
    };

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModel}
        onRequestClose={() => {}}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                paddingBottom: 8,
                borderBottomWidth: 1,
                borderColor: '#ccc',
                marginBottom: 20,
              }}>
              <Text style={{color: '#333', fontWeight: '600', fontSize: 20}}>
                Qualification
              </Text>

              <TouchableOpacity
                onPress={() => {
                  setShowModel(false);
                }}>
                <Feather name={'x'} color={'#ccc'} size={20} />
              </TouchableOpacity>
            </View>
            <View>
              {renderInputField(
                'Qualification',
                'The qualification is required.',
                isQualificationValid,
                setQualification,
              )}
              {renderInputField(
                'Institute Name',
                'The institute name is required.',
                isInstituteNameValid,
                setInstituteName,
              )}
              {renderInputField(
                'Started Date',
                'The started date is required.',
                isStartDateValid,
                setStartDate,
              )}
              {renderInputField(
                'End Date',
                'The end date is required.',
                isEndDateValid,
                setEndDate,
              )}
              {renderInputField(
                'Grade',
                'The grade is required.',
                isGradeValid,
                setGrade,
              )}
              <TouchableOpacity
                onPress={() => {
                  AddButton();
                }}
                style={styles.loginButton}>
                <Text style={styles.loginText}>ADD</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const EducationListArr = educationDetails.map(item => (
    <View
      key={item.qualification}
      style={{
        width: '90%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 8,
        marginVertical: 5,
      }}>
      <Text style={{color: '#555'}}>{item.qualification}</Text>
      <Text style={{color: '#555'}}>{item.instituteName}</Text>
      <Text style={{color: '#555'}}>
        {item.startDate} - {item.endDate}
      </Text>
      <Text style={{color: '#555'}}>{item.grade}</Text>
      <View style={{paddingVertical: 5}} />
    </View>
  ));

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        flex: 1,
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
      }}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        style={{flex: 1, width: '100%', backgroundColor: '#fff'}}
        keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          {renderInputField(
            'First Name',
            'The first name is required.',
            isFirstNameValid,
            setFirstName,
          )}

          {renderInputField(
            'Last Name',
            'The last name is required.',
            isLastNameValid,
            setLastName,
          )}
          {renderInputField(
            'Contact Number',
            isContactValid[1],
            isContactValid[0],
            setContact,
            'numeric',
          )}
          {renderInputField(
            'Email',
            isEmailValid[1],
            isEmailValid[0],
            setEmail,
          )}
          {renderInputField(
            'Parent Name',
            'The parent name is required.',
            isParentNameValid,
            setParentName,
          )}
          {renderInputField(
            'Parent Contact',
            'The parent contact is required.',
            isParentContactValid,
            setParentContact,
            'numeric',
          )}
          {renderInputField(
            'Parent Email',
            'The parent email is required.',
            true,
            setParentEmail,
          )}
          {EducationListArr}

          <TouchableOpacity
            onPress={() => {
              const _firstName = validateFirstName();
              const _lastName = validateLastName();
              const _contact = validateContact();
              const _email = validateEmail();
              const _parentName = validateParentName();
              const _parentContact = validateParentContact();
              if (
                _firstName &&
                _lastName &&
                _contact &&
                _email &&
                _parentName &&
                _parentContact
              ) {
                setShowModel(true);
              }
            }}
            style={styles.loginButton}>
            <Text style={styles.loginText}>Add Qualifications</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              saveButton();
            }}
            style={styles.loginButton}>
            <Text style={styles.loginText}>Save</Text>
          </TouchableOpacity>
        </View>
        <View>
          <ModelView
            edDetails={(text: any) => {
              setEducationDetails((e: any) => {
                return [...e, text];
              });
            }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 40,
    paddingBottom: 40,
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    width: '85%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
  loginButton: {
    marginVertical: 10,
    height: 45,
    backgroundColor: '#5AE4A7',
    borderRadius: 5,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 20,
    fontWeight: '400',
    color: 'white',
  },
});
export default AddStudentScreen;
