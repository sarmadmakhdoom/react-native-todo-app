import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { Todo } from '../types/Todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onDelete,
}) => {
  const scaleValue = React.useRef(new Animated.Value(1)).current;

  const handlePress = () => {
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
    onToggle(todo.id);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Animated.View style={[styles.container, { transform: [{ scale: scaleValue }] }]}>
      <TouchableOpacity
        style={[styles.todoItem, todo.completed && styles.completedItem]}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <View style={styles.checkboxContainer}>
          <View style={[styles.checkbox, todo.completed && styles.checkedBox]}>
            {todo.completed && <Text style={styles.checkmark}>✓</Text>}
          </View>
        </View>
        
        <View style={styles.contentContainer}>
          <Text style={[styles.todoText, todo.completed && styles.completedText]}>
            {todo.text}
          </Text>
          <Text style={styles.dateText}>
            {todo.completed && todo.completedAt
              ? `Completed ${formatDate(todo.completedAt)}`
              : `Created ${formatDate(todo.createdAt)}`}
          </Text>
        </View>
        
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDelete(todo.id)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.deleteText}>×</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  completedItem: {
    backgroundColor: '#f8f9fa',
    opacity: 0.7,
  },
  checkboxContainer: {
    marginRight: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedBox: {
    backgroundColor: '#007AFF',
  },
  checkmark: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
  },
  todoText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#8e8e93',
  },
  dateText: {
    fontSize: 12,
    color: '#8e8e93',
  },
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ff3b30',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  deleteText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
