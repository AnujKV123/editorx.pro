import ApiService from "../Services/Api.service";
import { handleLogOut } from "../User/UserInfo";
import { jwtDecode } from "jwt-decode";
import { useCallback, useEffect, useRef } from "react";
import { Navigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { userLogout, refreshAccessToken } from "../User/userSlice";



export  const  useBackendTokenCheckExpirationTime  = () => {
    // const mydata = localStorage.getItem('user')
    const dispatch = useDispatch()
    const token = useSelector((state) => state.accessToken);
    const refreshToken = useSelector((state) => state.refreshToken);
    const isAuthenticated = useSelector((state) => state.isAuthenticated);
    const REFRESH_THRESHOLD = 3000;
    const  TOKEN_CHECK_INTERVAL  =  60000 * 5; // 5 minute in milliseconds
    const  interval  =  useRef(null);
    
    const  acquireTokenWithRefreshToken  =  useCallback(async () => { 
        try { 
            if (isAuthenticated) {
                const  response  =  await  ApiService.acquireRefreshToken(refreshToken);
                dispatch(refreshAccessToken({accessToken: response.data.accessToken}));

            }else{
                const  response  = await handleLogOut(token)
                if(response){
                    dispatch(userLogout())
                    return <Navigate to="/login"/>
                }
            }
        } catch (error) {  
            const  response  = await handleLogOut(token)
                if(response){
                    dispatch(userLogout())
                    return <Navigate to="/login"/>
                }
        }
    },[isAuthenticated,refreshToken,token,dispatch]);

    useEffect(() => {
        const  checkTokenExpiry  = () => {
            if (token) {
                const  decodeToken  =  jwtDecode(token); 
                const  currentTime  =  Math.floor(Date.now() /  1000); // Current time in seconds
                const  timeUntilExpiry  =  decodeToken.exp  -  currentTime; 
                console.log("TokenExpiresIn",timeUntilExpiry)
                if (timeUntilExpiry  <=  REFRESH_THRESHOLD) {     // Token is about to expire or has expired, refresh it
                    acquireTokenWithRefreshToken();
                }
            }
        };
        interval.current  =  setInterval(checkTokenExpiry, TOKEN_CHECK_INTERVAL);
        checkTokenExpiry(); // Check token expiry immediately after mounting     
        return () =>  clearInterval(interval.current);
    }, [acquireTokenWithRefreshToken,token, TOKEN_CHECK_INTERVAL]);
        return  null; // You might not need to return anything from this hook
};