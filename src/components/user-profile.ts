/**
 * A custom web component that displays a user profile card.
 *
 *  It utilises the `@lit-labs/signals` library to reactively update the UI based on user data.
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
 */
import '@material/web/labs/card/elevated-card';
import '@material/web/button/filled-button';
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { userSignal } from './user-provider';
import { SignalWatcher } from '@lit-labs/signals';

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
    const userData = userSignal.get();

    if (!userData) {
      // If no user data is available, just show a message.
      return html`
        <md-elevated-card class="card">
          <div class="headline">No Signal Data Available</div>
          <div class="content">No user data available.</div>
        </md-elevated-card>
      `;
    }
    // If user data is available, display the user's profile information.
    return html`
      <md-elevated-card class="card">
        <div class="headline">${userData.id}</div>
        <div class="content">
          ${userData.name ? userData.name : 'Name not available'}<br />
          ${userData.email ? userData.email : 'Email not available'}
        </div>
      </md-elevated-card>
    `;
  }
}
