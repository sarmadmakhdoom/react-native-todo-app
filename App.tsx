import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  SafeAreaView,
  StatusBar,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { Todo, Filter } from './types/Todo';
import { TodoStorage } from './utils/TodoStorage';
import { TodoItem } from './components/TodoItem';
import { AddTodo } from './components/AddTodo';
import { FilterTabs } from './components/FilterTabs';

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');
  const [isLoading, setIsLoading] = useState(true);

  // Load todos on app start
  useEffect(() => {
    loadTodos();
  }, []);

  // Save todos whenever todos array changes
  useEffect(() => {
    if (!isLoading) {
      TodoStorage.saveTodos(todos);
    }
  }, [todos, isLoading]);

  const loadTodos = async () => {
    try {
      const loadedTodos = await TodoStorage.loadTodos();
      setTodos(loadedTodos);
    } catch (error) {
      console.error('Error loading todos:', error);
      Alert.alert('Error', 'Failed to load todos');
    } finally {
      setIsLoading(false);
    }
  };

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      text,
      completed: false,
      createdAt: new Date(),
    };
    setTodos(prevTodos => [newTodo, ...prevTodos]);
  };

  const toggleTodo = (id: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
              completedAt: !todo.completed ? new Date() : undefined,
            }
          : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    Alert.alert(
      'Delete Todo',
      'Are you sure you want to delete this todo?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
          },
        },
      ]
    );
  };

  const clearCompleted = () => {
    const completedCount = todos.filter(todo => todo.completed).length;
    if (completedCount === 0) {
      Alert.alert('No Completed Todos', 'There are no completed todos to clear.');
      return;
    }

    Alert.alert(
      'Clear Completed',
      `Are you sure you want to delete ${completedCount} completed todo${completedCount > 1 ? 's' : ''}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => {
            setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
          },
        },
      ]
    );
  };

  const getFilteredTodos = () => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  const getCounts = () => {
    const all = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const active = all - completed;
    return { all, active, completed };
  };

  const filteredTodos = getFilteredTodos();
  const counts = getCounts();

  const renderEmptyState = () => {
    let message = '';
    let subtitle = '';

    switch (filter) {
      case 'active':
        message = counts.all === 0 ? 'No todos yet' : 'No active todos';
        subtitle = counts.all === 0 ? 'Add your first todo above!' : 'All your todos are completed! 🎉';
        break;
      case 'completed':
        message = 'No completed todos';
        subtitle = 'Complete some todos to see them here';
        break;
      default:
        message = 'No todos yet';
        subtitle = 'Add your first todo above!';
    }

    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyStateTitle}>{message}</Text>
        <Text style={styles.emptyStateSubtitle}>{subtitle}</Text>
      </View>
    );
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading todos...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>My Todos</Text>
        {counts.completed > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={clearCompleted}
          >
            <Text style={styles.clearButtonText}>Clear Completed</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Add Todo */}
      <View style={styles.addTodoContainer}>
        <AddTodo onAdd={addTodo} />
      </View>

      {/* Filter Tabs */}
      <FilterTabs
        activeFilter={filter}
        onFilterChange={setFilter}
        counts={counts}
      />

      {/* Todo List */}
      <FlatList
        data={filteredTodos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TodoItem
            todo={item}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        )}
        contentContainerStyle={[
          styles.listContainer,
          filteredTodos.length === 0 && styles.listContainerEmpty,
        ]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#8e8e93',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  clearButton: {
    backgroundColor: '#ff3b30',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  clearButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  addTodoContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  listContainerEmpty: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  emptyStateSubtitle: {
    fontSize: 16,
    color: '#8e8e93',
    textAlign: 'center',
  },
});
