import React from "react";
import { TextInput, View, Text, StyleSheet } from "react-native";
import { useField } from "formik";

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
  // useField hook returns helpers for input fields in Formik
  const [field, meta] = useField(name);

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={[
          styles.input,
          meta.touched && meta.error ? styles.inputError : styles.inputNormal,
        ]}
        placeholder={placeholder}
        onChangeText={field.onChange(name)}
        onBlur={field.onBlur(name)}
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
    fontSize: 14,
    color: "#6b6b6b",
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#ddd"
  },
  inputNormal: {
    borderColor: "#ddd",
  },
  inputError: {
    borderColor: "#ff0000",
  },
  errorText: {
    color: "#ff0000",
    fontSize: 12,
    marginTop: 5,
  },
});

export default InputField;
