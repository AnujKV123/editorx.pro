import { jwtDecode } from "jwt-decode";


export const getHost =() =>{
    const currentHost = `${window.location.hostname}`;
    
    switch(currentHost) {
        case 'localhost':           //local
            return {
                API_HOST_LIVE:"http://localhost:8000/api/v1/users",
                API_HOST_DOCUMENT:"http://localhost:8000/api/v1/documents",
                HOST_URL:"http://localhost:8000",
            }

        case 'editorx.pro':           //live
            return {
                API_HOST_LIVE:"https://real-time-text-editor-backed.onrender.com/api/v1/users",
                API_HOST_DOCUMENT:"https://real-time-text-editor-backed.onrender.com/api/v1/documents",
                HOST_URL:"https://real-time-text-editor-backed.onrender.com",
            }
        default:
            return {
                API_HOST_LIVE:"http://localhost:8000/api/v1/users",
                API_HOST_DOCUMENT:"http://localhost:8000/api/v1/documents",
                HOST_URL:"http://localhost:8000",
            }
      }
}

export const isTokenExpired = (token) => {
    if (!token) return true;
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp < currentTime;
    } catch (error) {
      return true;
    }
};