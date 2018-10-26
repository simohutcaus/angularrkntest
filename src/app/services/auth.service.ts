import { Injectable } from '@angular/core';
import {UserManager, UserManagerSettings, User} from 'oidc-client';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private manager: UserManager = new UserManager(getClientSettings());
    private user: User = null;

  constructor() {
    this.manager.getUser().then(user => {
      this.user = user;
    });
  }

  isLoggedIn(): boolean {
    return this.user != null && !this.user.expired;
    }

  getClaims(): any {
  return this.user.profile;
    }

  getAuthorizationHeaderValue(): string {
      return `${this.user.token_type} ${this.user.access_token}`;
    }

  startAuthentication(): Promise<void> {
      return this.manager.signinRedirect();
    }
  
  completeAuthentication(): Promise<void> {
      return this.manager.signinRedirectCallback().then(user => {
          this.user = user;
      });
    }

}

export function getClientSettings(): UserManagerSettings {
  return {
    authority: 'https://identity.reckon.com',
    client_id: 'angular_spa',
    redirect_uri: 'http://localhost:4200/auth-callback',
    post_logout_redirect_uri: 'http://localhost:4200/',
    response_type: "id_token token",
    scope: "openid profile api1",
    filterProtocolClaims: true,
    loadUserInfo: true,
    automaticSilentRenew: true,
    silent_redirect_uri: 'http://localhost:4200/silent-refresh.html'
  };
}
