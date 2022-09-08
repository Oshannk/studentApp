import React, {forwardRef, useReducer} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextStyle,
  TextInputProps,
  TextInput,
} from 'react-native';

enum InputActionTypes {
  INPUT_CHANGE = 'INPUT_CHANGE',
  INPUT_BLUR = 'INPUT_BLUR',
  INPUT_SET = 'INPUT_SET',
}

interface InputAction {
  type: InputActionTypes;
  value: string;
  isValid: boolean;
  touched: boolean;
}

interface InputState {
  value: string;
  isValid: boolean;
  touched: boolean;
}

const inputReducer = (state: InputState, action: InputAction) => {
  switch (action.type) {
    case InputActionTypes.INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };
    case InputActionTypes.INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };

    case InputActionTypes.INPUT_SET:
      return {
        value: action.value,
        touched: action.touched,
        isValid: action.isValid,
      };
    default:
      return state;
  }
};

interface InputProps extends TextInputProps {
  ref?: any;
  label?: string;
  labelStyle?: TextStyle;
  inputTextStyle?: TextStyle;
  initialValue: string;
  initiallyValid: boolean;
  onInputChange: Function;
  id: string;
  required?: boolean;
  passwordMatched?: boolean | undefined;
  email?: boolean;
  min?: number | undefined;
  max?: number | undefined;
  minLength?: number | undefined;
  errorText?: string;
  errorTextStyle?: TextStyle;
}

const Input: React.FC<InputProps> = forwardRef((props: InputProps) => {
  const {
    id,
    initialValue,
    initiallyValid,
    label,
    labelStyle = {},
    inputTextStyle = {},
    onInputChange,
    required,
    email,
    min,
    max,
    minLength,
    errorText,
    errorTextStyle = {},
  } = props;

  const [inputState, dispatch] = useReducer(inputReducer, {
    value: initialValue ? initialValue : '',
    isValid: initiallyValid,
    touched: false,
  });

  const textChangeHandler = (text: string) => {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (required && text.trim().length === 0) {
      isValid = false;
    }
    if (email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (min != null && +text < min) {
      isValid = false;
    }
    if (max != null && +text > max) {
      isValid = false;
    }
    if (minLength != null && text.length < minLength) {
      isValid = false;
    }
    dispatch({
      type: InputActionTypes.INPUT_CHANGE,
      value: text,
      isValid: isValid,
      touched: inputState.touched,
    });
  };

  const lostFocusHandler = () => {
    dispatch({type: InputActionTypes.INPUT_BLUR, ...inputState});
  };

  return (
    <View style={styles.formControl}>
      <Text style={{...styles.label, ...labelStyle}}>{label}</Text>
      <TextInput
        {...props}
        style={{...styles.input, ...inputTextStyle}}
        value={inputState.value}
        onChangeText={textChangeHandler}
        onBlur={lostFocusHandler}
        autoCorrect={false}
      />
      {!inputState.isValid && inputState.touched && (
        <View style={styles.errorContainer}>
          <Text style={{...styles.errorText, ...errorTextStyle}}>
            {errorText}
          </Text>
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  formControl: {
    width: '100%',
  },
  label: {
    // fontFamily: 'open-sans-bold',
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 3,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    // fontFamily: 'open-sans',
    color: 'red',
    fontSize: 13,
  },
});

export default Input;
