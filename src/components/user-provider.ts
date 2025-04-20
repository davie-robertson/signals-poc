/**
 * A LitElement-based custom element that provides user authentication and data management
 * using Firebase and Lit's signal system. This component listens to Firebase authentication
 * state changes and updates a shared signal (`userSignal`) with the authenticated user's data.
 *
 * @customElement
 * @extends {SignalWatcher(LitElement)}
 *
 * @property {(() => void) | null} unsubscribeAuth - A function to unsubscribe from Firebase
 * authentication state changes. It is initialized as `null` and set when the component
 * connects to the DOM.
 *
 * @fires userSignal - A shared signal that holds the authenticated user's data or `null`
 * if no user is authenticated. The signal is updated whenever the authentication state
 * changes or the user's Firestore document is updated.
 *
 * @method connectedCallback - Lifecycle method called when the component is added to the DOM.
 * It sets up a listener for Firebase authentication state changes and updates the `userSignal`
 * accordingly.
 *
 * @method disconnectedCallback - Lifecycle method called when the component is removed from
 * the DOM. It cleans up the Firebase authentication listener by calling `unsubscribeAuth`.
 *
 * @method render - Renders the component's content. This component uses a `<slot>` to allow
 * child elements to be projected into it.
 *
 * @example
 * ```html
 * <user-provider>
 *   <!-- Child elements here will have access to the userSignal -->
 * </user-provider>
 * ```
 */
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { signal } from '@lit-labs/signals';
import { auth, db } from '../libs/firebase-config';
import { doc, onSnapshot } from 'firebase/firestore';
import { SignalWatcher } from '@lit-labs/signals';

// Signal to hold user data
export const userSignal = signal<{ id: string; [key: string]: any } | null>(null);

@customElement('user-provider')
export class UserProvider extends SignalWatcher(LitElement) {
  unsubscribeAuth: (() => void) | null = null;

  connectedCallback() {
    super.connectedCallback();

    // Set up a listener for Firebase authentication state changes.
    // When the authentication state changes, this function is triggered.
    this.unsubscribeAuth = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // If a user is authenticated, get a reference to their Firestore document.
        const userDoc = doc(db, 'users', user.uid);

        // Listen for real-time updates to the user's Firestore document.
        // The `onSnapshot` function is triggered whenever the document changes.
        onSnapshot(userDoc, (snapshot) => {
          if (snapshot.exists()) {
            // If the document exists, extract its data and update the `userSignal`.
            // The `userSignal` is a shared signal that holds the user's data.
            const data = snapshot.data();
            userSignal.set({ id: snapshot.id, ...data });
          } else {
            // If the document does not exist, set the `userSignal` to null.
            userSignal.set(null);
          }
        });
      } else {
        // If no user is authenticated, set the `userSignal` to null.
        userSignal.set(null);
      }
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    // Clean up the Firebase authentication listener when the component is removed from the DOM.
    this.unsubscribeAuth?.();
  }

    render() {
    return html`<slot></slot>`;
  }
}
