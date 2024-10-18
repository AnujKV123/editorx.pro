
import SignUp from "../dashboard/SignUp"
import Login from "../dashboard/Login"
import Layout from "../dashboard/Layout"
import { Navigate } from "react-router-dom"
import TextEditor from "../editor/TextEditor"
import Document from "../editor/Document"
import { isTokenExpired } from "../config/global"
import { useSelector, useDispatch } from "react-redux"
import { userLogout } from "../User/userSlice"
import CommingSoon from "../other/CommingSoon"
import ChangePassword from "../dashboard/ChangePass"
import ApiService from "../Services/Api.service"

export const PublicRoute = ({children}) => {
    const isAuthenticated = useSelector((state) => state.isAuthenticated);
    return isAuthenticated ? <Navigate to={`/document`}/> : children
    
}

export const ProtectedRoute = ({children}) => {
    const isAuthenticated = useSelector((state) => state.isAuthenticated);
    const accessToken = useSelector((state) => state.accessToken);
    const dispatch = useDispatch()
    if(isTokenExpired(accessToken)){
        dispatch(userLogout())
        return <Navigate to="/login"/>
    }
    return isAuthenticated ? children : <Navigate to="/register"/>
}

// export const AllRoute = ({children}) => {
//     return isAuthenticated ? children : <Navigate to="/register"/>
// }


const routesData = [
    {
        path: "",
        element: <PublicRoute><Layout /></PublicRoute>,
        outlet:<SignUp />
    },
    {
        path: "/register",
        element: <PublicRoute><Layout /></PublicRoute>,
        outlet: <SignUp />
    },
    {
        path: "/login",
        element: <PublicRoute><Layout /></PublicRoute>,
        outlet: <Login />
    },
    {
        path: "/change-password",
        element: <PublicRoute><Layout /></PublicRoute>,
        outlet: <ChangePassword />
    },
    {
        path: "/document",
        element: <ProtectedRoute><Layout /></ProtectedRoute>,
        outlet: <Document />
    },
    {
        path: "/document/:id",
        element: <ProtectedRoute><Layout /></ProtectedRoute>,
        outlet: <TextEditor />
    },
    {
        path: "/docs",
        element: <Layout />,
        outlet: <CommingSoon />
    },
    {
        path: "/pricing",
        element: <Layout />,
        outlet: <CommingSoon />
    },
    {
        path: "/contact-us",
        element: <Layout />,
        outlet: <CommingSoon />
    },
]

export default routesData