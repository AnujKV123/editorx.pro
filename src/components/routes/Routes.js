
import SignUp from "../dashboard/SignUp"
import Login from "../dashboard/Login"
import Layout from "../dashboard/Layout"
import { Navigate } from "react-router-dom"
import TextEditor from "../editor/TextEditor"
import Document from "../editor/Document"
import { isTokenExpired } from "../config/global"
import { useSelector, useDispatch } from "react-redux"
import { userLogout } from "../User/userSlice"
import ApiService from "../Services/Api.service"
import { useToast } from "../ui/use-toast"

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
        path: "/document",
        element: <ProtectedRoute><Layout /></ProtectedRoute>,
        outlet: <Document />
    },
    {
        path: "/document/:id",
        element: <ProtectedRoute><Layout /></ProtectedRoute>,
        outlet: <TextEditor />
    },
]

export default routesData