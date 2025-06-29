# React Native Todo App

A beautiful, feature-rich Todo application built with React Native, TypeScript, and Expo. The app includes persistent storage, smooth animations, and a clean iOS-style design.

## 📱 Features

- ✅ **Add Todos**: Create new todo items with validation
- 🔄 **Toggle Complete**: Mark todos as completed or active
- 🗑️ **Delete Todos**: Remove individual todos with confirmation
- 📱 **Filter Tabs**: View All, Active, or Completed todos
- 💾 **Persistent Storage**: Todos are saved locally using AsyncStorage
- 🎨 **Beautiful UI**: iOS-style design with smooth animations
- 📊 **Statistics**: See counts for each category
- 🧹 **Clear Completed**: Remove all completed todos at once
- 🔄 **Loading States**: Proper loading indicators
- 📱 **Responsive**: Works perfectly on different screen sizes

## 🛠️ Technology Stack

- **React Native** with **Expo**
- **TypeScript** for type safety
- **AsyncStorage** for persistent local storage
- **React Hooks** for state management
- **Animated API** for smooth animations
- **FlatList** for optimized rendering

## 📁 Project Structure

```
TodoApp/
├── components/
│   ├── AddTodo.tsx       # Input component for adding new todos
│   ├── FilterTabs.tsx    # Filter tabs for All/Active/Completed
│   └── TodoItem.tsx      # Individual todo item component
├── types/
│   └── Todo.ts           # TypeScript interfaces and types
├── utils/
│   └── TodoStorage.ts    # AsyncStorage utility functions
├── App.tsx               # Main app component
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS) or Android Emulator (for Android)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sarmadmakhdoom/react-native-todo-app.git
   cd react-native-todo-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run on your preferred platform**
   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator
   - Scan QR code with Expo Go app on your device

## 📱 Screenshots

### Main Interface
- Clean, modern design with intuitive navigation
- Add todos with the floating input field
- Filter between All, Active, and Completed todos

### Features in Action
- Smooth animations when checking off todos
- Persistent storage - your todos remain after closing the app
- Smart empty states for better user experience

## 🔧 Key Components

### `App.tsx`
The main component that manages the overall state and renders all child components.

### `TodoItem.tsx`
Individual todo item with:
- Checkbox animation
- Strike-through text for completed items
- Delete button with confirmation
- Smooth press animations

### `AddTodo.tsx`
Input component featuring:
- Real-time validation
- Character count (max 100)
- Smooth button animations
- Auto-focus and keyboard handling

### `FilterTabs.tsx`
Tab component with:
- Active state highlighting
- Badge counts for each category
- Smooth transitions

### `TodoStorage.ts`
Utility class for:
- Saving todos to AsyncStorage
- Loading todos on app start
- Proper error handling
- Date serialization/deserialization

## 🎨 Design Highlights

- **iOS-inspired Design**: Clean, modern interface following iOS design principles
- **Smooth Animations**: All interactions include subtle animations for better UX
- **Consistent Spacing**: Proper spacing and typography throughout
- **Color Scheme**: Carefully chosen colors for accessibility and visual appeal
- **Shadow and Depth**: Subtle shadows and depth cues for better visual hierarchy

## 📊 State Management

The app uses React hooks for state management:
- `useState` for local component state
- `useEffect` for side effects (loading/saving data)
- Proper separation of concerns between components

## 💾 Data Persistence

- Uses `@react-native-async-storage/async-storage` for local storage
- Automatic saving whenever todos change
- Proper error handling for storage operations
- Date objects are properly serialized/deserialized

## 🔮 Future Enhancements

- [ ] Due dates and reminders
- [ ] Categories and tags
- [ ] Search functionality
- [ ] Export/import todos
- [ ] Dark mode support
- [ ] Drag and drop reordering
- [ ] Sync with cloud storage

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Sarmad Makhdoom**
- GitHub: [@sarmadmakhdoom](https://github.com/sarmadmakhdoom)
- LinkedIn: [Adil Makhdoom](https://www.linkedin.com/in/adilmakhdoom)

## 🙏 Acknowledgments

- React Native team for the excellent framework
- Expo team for simplifying development
- The open-source community for inspiration and tools

---

Made with ❤️ by [Sarmad Makhdoom](https://github.com/sarmadmakhdoom)
