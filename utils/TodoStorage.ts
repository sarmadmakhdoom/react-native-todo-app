import AsyncStorage from '@react-native-async-storage/async-storage';
import { Todo } from '../types/Todo';

const TODOS_STORAGE_KEY = '@todos';

export class TodoStorage {
  static async saveTodos(todos: Todo[]): Promise<void> {
    try {
      const jsonValue = JSON.stringify(todos);
      await AsyncStorage.setItem(TODOS_STORAGE_KEY, jsonValue);
    } catch (error) {
      console.error('Error saving todos:', error);
    }
  }

  static async loadTodos(): Promise<Todo[]> {
    try {
      const jsonValue = await AsyncStorage.getItem(TODOS_STORAGE_KEY);
      if (jsonValue != null) {
        const todos = JSON.parse(jsonValue);
        // Convert date strings back to Date objects
        return todos.map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
          completedAt: todo.completedAt ? new Date(todo.completedAt) : undefined,
        }));
      }
      return [];
    } catch (error) {
      console.error('Error loading todos:', error);
      return [];
    }
  }

  static async clearAllTodos(): Promise<void> {
    try {
      await AsyncStorage.removeItem(TODOS_STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing todos:', error);
    }
  }
}
