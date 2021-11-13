import React from 'react';
import { Text, View, TextInput, Button, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";

export default function CreateTask(props) {
    const {handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
          title: props?.task?.title || '',
          description: props?.task?.description || ''
        }
      });
    
      const onChange = arg => {
        return {
          value: arg.nativeEvent.text,
        };
      };
    
    return (
        <View style={styles.formContainer}>
          <Text style={styles.label}>Title (max 30 characters)</Text>
          <Controller
            control={control}
            rules={{
             required: { value: true, message: 'Title is required' },
             maxLength: { value: 30, message: 'Max 30 characters Allowed' },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="title"
            defaultValue=""
          />
          {errors.title  && <Text style={styles.errorMessage}>{errors.title.message}</Text>}
          <Text style={[styles.label, styles.marginTop_10]}>Description</Text>
          <Controller
            control={control}
            rules={{
                maxLength: { value: 100, message: 'Max 100 characters Allowed' },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.TextArea}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                multiline = {true} numberOfLines = {4}
              />
            )}
            name="description"
            defaultValue=""
          />
          {errors.description  && <Text style={styles.errorMessage}>{errors.description.message}</Text>}
        <View style={styles.button}>
            <Button  title="Submit" onPress={handleSubmit(props.onSubmit)} />
        </View>
        </View>
      );
    }

const styles = StyleSheet.create({
    formContainer:{
        margin: 20
    },
    label:{
        marginBottom: 5
    },
    marginTop_10:{
        marginTop: 10
    },
    input: {
        backgroundColor: 'white',
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        borderRadius: 4,
    },
    TextArea:{
        backgroundColor: 'white',
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        borderRadius: 4,
        minHeight: 100
    },
    button:{
        marginTop: 20
    },
    errorMessage:{
        color: 'red',
        marginTop: 5
    }
    });
      