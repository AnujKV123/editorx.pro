
import { getHost } from "../config/global";

const register = async (data, accessToken) => {
  try {
    const response = await fetch(getHost().API_HOST_LIVE + "/register", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Network error when trying to resgister");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw error;
  }
};

const getUsers = async ({email, documentId, userId}, accessToken) => {
  try {
    const response = await fetch(`${getHost().API_HOST_LIVE}/get-users?email=${email}&documentId=${documentId}&userId=${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Network error when trying to get user");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw error;
  }
};

const getUserDocuments = async (email, accessToken) => {
  try {
    const response = await fetch(
      getHost().API_HOST_LIVE + "/get-user-documents",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      }
    );
    if (!response.ok) {
      throw new Error("Network error when trying to get user Documents");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw error;
  }
};

const updateUserAvatar = async (data, accessToken) => {
  try {
    const response = await fetch(getHost().API_HOST_LIVE + "/update-avatar", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        // 'Accept': 'application/json',
        // 'Content-Type': 'application/json',
      },
      body: data,
    });
    if (!response.ok) {
      throw new Error("Network error when trying to get user Documents");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw error;
  }
};

const changePassword = async (data) => {
  try {
    const response = await fetch(getHost().API_HOST_LIVE + "/change-password", {
      method: "POST",
      headers: {
        // 'Authorization': `Bearer ${accessToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Network error when trying to get user Documents");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw error;
  }
};

const updateDocumentName = async (data, accessToken) => {
  try {
    const response = await fetch(
      getHost().API_HOST_DOCUMENT + "/update-document-name",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      throw new Error("Network error when trying to update document name");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw error;
  }
};

const createDocument = async (data, accessToken) => {
  try {
    const response = await fetch(
      getHost().API_HOST_DOCUMENT + "/create-document",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      throw new Error("Network error when trying to create document");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw error;
  }
};

const getDocuments = async (
  { search, page, limit, data = {} },
  accessToken
) => {
  try {
    const response = await fetch(
      `${
        getHost().API_HOST_DOCUMENT
      }/get-documents?search=${search}&page=${page}&limit=${limit}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      throw new Error("Network error when trying to get documents");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw error;
  }
};

const getDocumentById = async ({ data = {}, id }, accessToken) => {
  try {
    const response = await fetch(`${getHost().API_HOST_DOCUMENT}/get-document-by-id/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Network error when trying to get document");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw error;
  }
};

const sendInvite = async (data, accessToken) => {
  try {
    const response = await fetch(getHost().API_HOST_LIVE_MAIN + "/invite" + "/send-invite", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Network error when trying to invite user");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw error;
  }
};

const handleInvite = async (data, accessToken) => {
  try {
    const response = await fetch(getHost().API_HOST_LIVE_MAIN + "/invite" + "/handle-invite", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Network error when trying to handle invite");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw error;
  }
};

const getInvites = async (data, accessToken) => {
  try {
    const response = await fetch(getHost().API_HOST_LIVE_MAIN + "/invite" + "/get-invitations", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Network error when trying to get invites");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw error;
  }
};

const verifyUser = async (data, accessToken) => {
  try {
    const response = await fetch(getHost().API_HOST_DOCUMENT + "/verify-user", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Network error when verifying the user");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw error;
  }
};

const deleteDocument = async (data, accessToken) => {
  try {
    const response = await fetch(getHost().API_HOST_DOCUMENT + "/delete-document", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Network error when trying to delete document");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw error;
  }
};

const ApiService = {
  register,
  getUserDocuments,
  createDocument,
  updateDocumentName,
  verifyUser,
  updateUserAvatar,
  changePassword,
  getDocuments,
  getDocumentById,
  sendInvite,
  getInvites,
  handleInvite,
  getUsers,
  deleteDocument
};
export default ApiService;
