
export default class Auth {
    constructor() {
        this.authenticated = false;
    }

    logIn() {
        this.authenticated = true;
    }

    logOut() {
        this.authenticated = false;
    }

    isAuthenticated() {
        return this.authenticated;
    }
}