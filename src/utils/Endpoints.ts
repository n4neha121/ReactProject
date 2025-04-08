const ENDPOINTS = {
  REGISTER: "auth/register",
  LOGIN: "auth/login",
  GET_PROFILE: (userId: string) => `auth/profile/${userId}`,
  CREATE_PROFILE: "auth/profile/create",
};
export default ENDPOINTS;
