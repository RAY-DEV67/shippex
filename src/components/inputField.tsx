import React, { useState } from "react";
import { TextInput, View, Text, StyleSheet } from "react-native";
import { useField } from "formik";

interface InputFieldProps {
  label: string;
  name: string;
  placeholder: string;
  secureTextEntry?: boolean;
  isUrlField?: boolean; // For URL field behavior
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  placeholder,
  secureTextEntry = false,
  isUrlField = false,
}) => {
  const [field, meta, helpers] = useField(name);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);

    // For URL input, add 'https://' if not present
    if (isUrlField && !field.value.startsWith("https://")) {
      helpers.setValue("https://");
    }
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
    color: "#585363",
    position: "absolute",
    top: 2,
    left: 5,
    paddingHorizontal: 5,
    zIndex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: "#f4f2f8",
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#f4f2f8",
    color: "#2f50c1",
  },
  inputHeight: {
    height: 50,
  },
  focusedInputHeight: {
    height: 65,
  },
  inputNormal: {
    borderColor: "#ddd",
  },
  inputError: {
    borderColor: "#ff0000",
  },
  inputFocused: {
    borderColor: "#2f50c1", // Blue border when focused
  },
  errorText: {
    color: "#ff0000",
    fontSize: 12,
    marginTop: 5,
  },
});

export default InputField;
