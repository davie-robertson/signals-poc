# @lit-labs/signals POC with Firebase 

This project demonstrates the use of `@lit-labs/signals` for state management in a Lit-based application. It integrates Firebase for authentication and Firestore for real-time data updates.

## Features
- **Reactive State Management**: Uses `@lit-labs/signals` to manage shared state between components.
- **Firebase Integration**: Connects to Firebase Authentication and Firestore.
- **Material Design**: Implements Material Web components for a polished UI (almost 🤠).

## Components

### `user-provider`
- Manages user authentication and state.
- Listens to Firestore for real-time updates and updates the `userSignal` with the user's data or `null` if no user is authenticated.
- Cleans up Firebase authentication listeners when the component is removed from the DOM.
- Provides `login` and `signOut` methods for authentication.

### `user-profile`
- Displays user information.
- Provides login and logout functionality.
- Reacts to changes in user state using `@lit-labs/signals`.

## Setup Instructions

### Prerequisites
- Node.js (v16 or later)
- Firebase project with Firestore and Authentication enabled

### Steps
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd signals-poc
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env.local` file in the project root with the following content:
   ```env
   VITE_FIREBASE_API_KEY=<your-firebase-api-key>
   VITE_FIREBASE_AUTH_DOMAIN=<your-firebase-auth-domain>
   VITE_FIREBASE_PROJECT_ID=<your-firebase-project-id>
   VITE_FIREBASE_STORAGE_BUCKET=<your-firebase-storage-bucket>
   VITE_FIREBASE_MESSAGING_SENDER_ID=<your-firebase-messaging-sender-id>
   VITE_FIREBASE_APP_ID=<your-firebase-app-id>
   VITE_FIREBASE_MEASUREMENT_ID=<your-firebase-measurement-id>
   ```

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```

5. **Open the Application**:
   Navigate to `http://localhost:5173` in your browser.

## Example Usage

### Signal Provider and Consumer
The `user-provider` component generates a signal that can be used by any component, regardless of its position in the DOM hierarchy. For example:

```html
<user-provider>
  <user-profile></user-profile>
</user-provider>
```

### Standalone Consumer
The `user-profile` component can also function independently of the `user-provider` component, as it directly accesses the signal:

```html
<user-profile></user-profile>
```

## License
This project is licensed under the MIT License.
