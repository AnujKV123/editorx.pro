
import { getHost } from "../config/global";

const login = async (data) => {
    try {
      const response = await fetch(getHost().API_HOST_LIVE + "/login", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        throw new Error(await response.error());
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      throw error
    }
  }

const register = async (data) => {
    try {
      const response = await fetch(getHost().API_HOST_LIVE + "/register", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        throw new Error('Network error when trying to resgister');
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      throw error
    }
  }

const logout = async ({accessToken=""}) => {
    try {
      const response = await fetch(getHost().API_HOST_LIVE + "/logout", {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });
      if (!response.ok) {
        throw new Error('Network error when trying to logout');
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      throw error
    }
  }

const acquireRefreshToken = async (refreshToken) => {
    try {
      const response = await fetch(getHost().API_HOST_LIVE + "/refresh-token", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({refreshToken:refreshToken})
      });
      if (!response.ok) {
        throw new Error('Network error when trying to acquireRefreshToken');
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      throw error
    }
  }

const getUserDocuments = async (email, accessToken) => {
    try {
      const response = await fetch(getHost().API_HOST_LIVE + "/get-user-documents", {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email:email})
      });
      if (!response.ok) {
        throw new Error('Network error when trying to get user Documents');
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      throw error
    }
  }

const updateUserAvatar = async (data, accessToken) => {
    try {
      const response = await fetch(getHost().API_HOST_LIVE + "/update-avatar", {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          // 'Accept': 'application/json',
          // 'Content-Type': 'application/json',
        },
        body:data
      });
      if (!response.ok) {
        throw new Error('Network error when trying to get user Documents');
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      throw error
    }
  }

const changePassword = async (data) => {
    try {
      const response = await fetch(getHost().API_HOST_LIVE + "/change-password", {
        method: 'POST',
        headers: {
          // 'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        throw new Error('Network error when trying to get user Documents');
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      throw error
    }
  }

const updateDocumentName = async (data, accessToken) => {
    try {
      const response = await fetch(getHost().API_HOST_DOCUMENT + "/update-document-name", {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        throw new Error('Network error when trying to update document name');
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      throw error
    }
  }

const createDocument = async (data, accessToken) => {
    try {
      const response = await fetch(getHost().API_HOST_DOCUMENT + "/create-document", {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        throw new Error('Network error when trying to create document');
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      throw error
    }
  }

const verigyUser = async (data, accessToken) => {
    try {
      const response = await fetch(getHost().API_HOST_DOCUMENT + "/verify-user", {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        throw new Error('Network error when verifying the user');
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      throw error
    }
  }

  const ApiService = {
    login,
    register,
    logout,
    acquireRefreshToken,
    getUserDocuments,
    createDocument,
    updateDocumentName,
    verigyUser,
    updateUserAvatar,
    changePassword
  }
  export default ApiService