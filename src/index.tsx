export const isAuthenticated = () => {
    const user = localStorage.getItem("user");
    return user !== null; // Ensures it returns a boolean value
};
