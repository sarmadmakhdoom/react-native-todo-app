import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  Alert,
} from 'react-native';

interface AddTodoProps {
  onAdd: (text: string) => void;
}

export const AddTodo: React.FC<AddTodoProps> = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const scaleValue = React.useRef(new Animated.Value(1)).current;

  const handleSubmit = () => {
    if (text.trim().length === 0) {
      Alert.alert('Error', 'Please enter a todo item');
      return;
    }

    if (text.trim().length > 100) {
      Alert.alert('Error', 'Todo text must be less than 100 characters');
      return;
    }

    // Animation for button press
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    onAdd(text.trim());
    setText('');
  };

  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, isFocused && styles.inputFocused]}>
        <TextInput
          style={styles.input}
          placeholder="Add a new todo..."
          placeholderTextColor="#8E8E93"
          value={text}
          onChangeText={setText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onSubmitEditing={handleSubmit}
          returnKeyType="done"
          maxLength={100}
          multiline={false}
        />
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <TouchableOpacity
            style={[styles.addButton, text.trim().length === 0 && styles.addButtonDisabled]}
            onPress={handleSubmit}
            disabled={text.trim().length === 0}
            activeOpacity={0.7}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
      {text.length > 80 && (
        <Text style={styles.characterCount}>
          {text.length}/100 characters
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#2C2C2E',
  },
  inputFocused: {
    borderColor: '#0A84FF',
    shadowOpacity: 0.4,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
    paddingVertical: 12,
    paddingRight: 12,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0A84FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonDisabled: {
    backgroundColor: '#48484A',
  },
  addButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 24,
  },
  characterCount: {
    fontSize: 12,
    color: '#8E8E93',
    textAlign: 'right',
    marginTop: 4,
    marginRight: 4,
  },
});
