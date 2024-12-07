import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo), // Convert userInfo to JSON
    });

    if (!response.ok) {
      throw new Error('Login failed'); // Handle unsuccessful login
    }

    const data = await response.json(); // Parse the JSON response
    return data; // Return the data (which should include the token)
  } catch (error) {
    console.error('Error during login:', error);
    throw error; // Rethrow the error for further handling
  }
};

export { login };