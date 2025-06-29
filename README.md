# Todo App

I built this todo app because I wanted to practice React Native and TypeScript. It's a simple but polished app that lets you manage your daily tasks.

## What it does

- Add new todos
- Mark them as complete or incomplete
- Delete todos you don't need anymore
- Filter between all, active, and completed tasks
- Everything saves automatically so your todos persist when you close the app
- Dark mode design that's easy on the eyes

## Tech stuff

Built with React Native, TypeScript, and Expo. Uses AsyncStorage to save your todos locally on your device - no internet required. I focused on making the animations smooth and the interface feel responsive.

## How to run it

You'll need Node.js and Expo CLI installed. Then:

```bash
git clone https://github.com/sarmadmakhdoom/react-native-todo-app.git
cd react-native-todo-app
npm install
npx expo start
```

Scan the QR code with Expo Go on your phone, or press 'i' to run it in the iOS simulator.

## Code structure

Pretty straightforward:
- `App.tsx` - main app logic
- `components/` - individual UI pieces (todo items, input field, filter tabs)
- `utils/TodoStorage.ts` - handles saving/loading todos
- `types/Todo.ts` - TypeScript definitions

## Things I learned

This was my first time really diving into React Native animations. The `Animated` API is pretty powerful once you get the hang of it. Also learned a lot about AsyncStorage and how to properly serialize/deserialize data.

The hardest part was getting the smooth animations right - especially the scale effects when you tap items. Spent way too much time tweaking timing values.

## What's next

Might add due dates, categories, or sync with iCloud. We'll see if I have time.

---

By [Sarmad Makhdoom](https://github.com/sarmadmakhdoom)
