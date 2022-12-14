import cookies from "vue-cookies";
import JWTDecode from "jwt-decode";

const cookieStorageName = "g5Blt8KCgF";

const saveTokenToStorage = (token) => {
  cookies.set(cookieStorageName, token);
};

const removeTokenFromStorage = () => {
  cookies.remove(cookieStorageName);
};

const getTokenFromStorage = () => {
  return cookies.get(cookieStorageName);
};

const isAuthTokenValid = () => {
  const token = getTokenFromStorage();
  try {
    if (token) {
      // If token is not valid then it will throw an error and dispatch won't be reachable
      const { exp } = JWTDecode(token);

      const now = Date.now();
      return exp >= now / 1000 ? token : false;
    }
    return false;
  } catch (error) {
    return false;
  }
};

export {
  saveTokenToStorage,
  getTokenFromStorage,
  isAuthTokenValid,
  removeTokenFromStorage,
};
