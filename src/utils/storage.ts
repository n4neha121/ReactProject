const TOKEN_KEY = "token";

export const saveTokenToStorage = async (value: unknown): Promise<void> => {
  try {
    const token = JSON.stringify(value);
    localStorage.setItem(TOKEN_KEY, token);
  } catch (e) {
    console.log(e);
  }
};

export const getTokenFromStorage = async (): Promise<string | null> => {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    return token != null ? JSON.parse(token) : null;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const removeTokenFromStorage = async (): Promise<void> => {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch (e) {
    console.error("Error removing token:", e);
  }
};
