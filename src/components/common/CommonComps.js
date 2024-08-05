

export const getCookie = (name) =>{
  const cookieString = document.cookie;
  console.log("isAuthenticated::",cookieString)
  const cookies = cookieString.split('; ');
  
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].split('=');
      const cookieName = decodeURIComponent(cookie[0]);
      const cookieValue = decodeURIComponent(cookie[1]);
      
      if (cookieName === name) {
        return cookieValue;
      }
    }
    return null;
  }