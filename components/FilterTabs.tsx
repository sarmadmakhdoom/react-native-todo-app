import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';
import { Filter } from '../types/Todo';

interface FilterTabsProps {
  activeFilter: Filter;
  onFilterChange: (filter: Filter) => void;
  counts: {
    all: number;
    active: number;
    completed: number;
  };
}

export const FilterTabs: React.FC<FilterTabsProps> = ({
  activeFilter,
  onFilterChange,
  counts,
}) => {
  const scaleValues = {
    all: React.useRef(new Animated.Value(1)).current,
    active: React.useRef(new Animated.Value(1)).current,
    completed: React.useRef(new Animated.Value(1)).current,
  };

  const handleFilterPress = (filter: Filter) => {
    // Animate button press
    Animated.sequence([
      Animated.timing(scaleValues[filter], {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValues[filter], {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    onFilterChange(filter);
  };

  const renderTab = (filter: Filter, label: string, count: number) => (
    <Animated.View
      key={filter}
      style={{ transform: [{ scale: scaleValues[filter] }] }}
    >
      <TouchableOpacity
        style={[
          styles.tab,
          activeFilter === filter && styles.activeTab,
        ]}
        onPress={() => handleFilterPress(filter)}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.tabText,
            activeFilter === filter && styles.activeTabText,
          ]}
        >
          {label}
        </Text>
        {count > 0 && (
          <View
            style={[
              styles.badge,
              activeFilter === filter && styles.activeBadge,
            ]}
          >
            <Text
              style={[
                styles.badgeText,
                activeFilter === filter && styles.activeBadgeText,
              ]}
            >
              {count}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      {renderTab('all', 'All', counts.all)}
      {renderTab('active', 'Active', counts.active)}
      {renderTab('completed', 'Completed', counts.completed)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f7',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    minHeight: 44,
  },
  activeTab: {
    backgroundColor: '#007AFF',
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8e8e93',
  },
  activeTabText: {
    color: 'white',
  },
  badge: {
    backgroundColor: '#8e8e93',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
  },
  activeBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  activeBadgeText: {
    color: 'white',
  },
});
