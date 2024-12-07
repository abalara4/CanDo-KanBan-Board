import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    const token = this.getToken();
    if (token) {
      return jwtDecode<JwtPayload>(token); // Decode the token to get user profile
    }
    return null; // No token, return null
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); // Check if token exists and is not expired
  }
  
  isTokenExpired(token: string) {
    const decoded: JwtPayload = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds
    return decoded.exp ? decoded.exp < currentTime : true; // Check if the token's expiration time is less than current time
  }

  getToken(): string {
    return localStorage.getItem('token') || ''; // Return the token from localStorage
  }

  login(idToken: string) {
    localStorage.setItem('token', idToken); // Set the token to localStorage
    window.location.href = '/'; // Redirect to the home page
  }

  logout() {
    localStorage.removeItem('token'); // Remove the token from localStorage
    window.location.href = '/login'; // Redirect to the login page
  }
}

export default new AuthService();
