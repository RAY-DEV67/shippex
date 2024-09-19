import React, { useState } from "react";
import { TextInput, View, Text, StyleSheet } from "react-native";
import { useField } from "formik";
import colors from "../const/colors";

interface InputFieldProps {
  label: string;
  name: string;
  placeholder: string;
  secureTextEntry?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  placeholder,
  secureTextEntry = false,
}) => {
  const [field, meta, helpers] = useField(name);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    helpers.setTouched(true); // Explicitly mark the field as touched for validation
    field.onBlur(name); // Let Formik know the field has been blurred
  };

  return (
    <View style={styles.inputContainer}>
      {/* Show label if input is focused or has a value */}
      {(isFocused || field.value) && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          isFocused || field.value
            ? styles.focusedInputHeight
            : styles.inputHeight,
          meta.touched && meta.error
            ? styles.inputError
            : isFocused
            ? styles.inputFocused
            : styles.inputNormal,
        ]}
        placeholder={!isFocused ? placeholder : ""} // Hide placeholder if focused
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChangeText={field.onChange(name)}
        value={field.value}
        secureTextEntry={secureTextEntry}
      />
      {meta.touched && meta.error ? (
        <Text style={styles.errorText}>{meta.error}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 10,
    color: colors.darkGray,
    position: "absolute",
    top: 2,
    left: 5,
    paddingHorizontal: 5,
    zIndex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: colors.lightGray,
    color: colors.blue,
  },
  inputHeight: {
    height: 50,
  },
  focusedInputHeight: {
    height: 65,
  },
  inputNormal: {
    borderColor: colors.lightGray,
  },
  inputError: {
    borderColor: colors.red,
  },
  inputFocused: {
    borderColor: colors.blue,
  },
  errorText: {
    color: colors.red,
    fontSize: 12,
    marginTop: 5,
  },
});

export default InputField;
