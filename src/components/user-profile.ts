
/**
 * A custom web component that displays a user profile card.
 * 
 * This component uses LitElement and integrates with Firebase Authentication
 * to allow users to log in with Google and sign out. It also utilizes the 
 * `@lit-labs/signals` library to reactively update the UI based on user data.
 * 
 * @customElement
 * @extends {SignalWatcher(LitElement)}
 * 
 * @csspart card - Styles the elevated card container.
 * @csspart headline - Styles the headline section of the card.
 * @csspart content - Styles the content section of the card.
 * 
 * @example
 * ```html
 * <user-profile></user-profile>
 * ```
 * 
 * @remarks
 * - If no user is logged in, the component displays a "Login with Google" button.
 * - If a user is logged in, their ID, name, and email are displayed, along with a "Sign Out" button.
 * 
 * @dependencies
 * - `@material/web/labs/card/elevated-card`
 * - `@material/web/button/filled-button`
 * - `@lit-labs/signals`
 * - `firebase/auth`
 * 
 * @methods
 * - `login`: Initiates the Google login process using Firebase Authentication.
 * - `signOut`: Signs out the currently logged-in user.
 * 
 * @fires {Event} click - Dispatched when the login or sign-out button is clicked.
 */
import '@material/web/labs/card/elevated-card';
import '@material/web/button/filled-button';
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { userSignal } from './user-provider';
import { SignalWatcher } from '@lit-labs/signals';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../libs/firebase-config';


@customElement('user-profile')
export class UserProfile extends SignalWatcher(LitElement) {
  static styles = css`
    .card {
      width: 300px;
      margin: 16px;
    }
    .headline {
      font-size: 1rem;
      font-weight: bold;
      padding: 0.5rem;
    }
    .content {
      display: flex;
      flex-direction: column;
      flex: 1;
      justify-content: space-between;
      padding: 16px;
      gap: 16px;
    }
  `;

  render() {
    const user = userSignal.get();

    if (!user) {
      return html`
        <p>No user data available.</p>
        <md-filled-button @click=${this.login}
          >Login with Google</md-filled-button
        >
      `;
    }

    return html`
      <md-elevated-card class="card">
        <div class="headline">${user.id}</div>
        <div class="content">
          ${user.name ? user.name : 'Name not available'}<br />
          ${user.email ? user.email : 'Email not available'}
          <md-filled-button @click=${this.signOut}>Sign Out</md-filled-button>
        </div>
      </md-elevated-card>
    `;
  }

  private async login() {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Login failed:', error);
    }
  }

  private signOut() {
    auth.signOut();
  }
}
