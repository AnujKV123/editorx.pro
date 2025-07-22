import SignUp from "../components/dashboard/SignUp";
import Login from "../components/dashboard/Login";
import Layout from "../components/dashboard/Layout";
import { Navigate } from "react-router-dom";
import TextEditor from "../components/editor/TextEditor";
import Document from "../components/editor/Document";
import { isTokenExpired } from "../config/global";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../slices/userSlice";
import CommingSoon from "../components/other/CommingSoon";
import ChangePassword from "../components/dashboard/ChangePass";
import Dashboard from "../components/dashboard/Index";
import Profile from "../components/home/Profile";
import Home from "../components/home";

export const PublicRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  return isAuthenticated ? <Navigate to={`/home`} /> : children;
};

export const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const accessToken = useSelector((state) => state.accessToken);
  const dispatch = useDispatch();
  if (isTokenExpired(accessToken)) {
    dispatch(userLogout());
    return <Navigate to="/login" />;
  }
  return isAuthenticated ? children : <Navigate to="/register" />;
};

// export const AllRoute = ({children}) => {
//     return isAuthenticated ? children : <Navigate to="/register"/>
// }

const routesData = [
  {
    path: "",
    element: (
      <PublicRoute>
        <Layout />
      </PublicRoute>
    ),
    outlet: <Dashboard />,
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <Layout />
      </PublicRoute>
    ),
    outlet: <SignUp />,
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Layout />
      </PublicRoute>
    ),
    outlet: <Login />,
  },
  {
    path: "/change-password",
    element: (
      <PublicRoute>
        <Layout />
      </PublicRoute>
    ),
    outlet: <ChangePassword />,
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Profile />
        <Layout />
      </ProtectedRoute>
    ),
    outlet: (
      <main className="pt-20">
        <Home />
      </main>
    ),
  },
  {
    path: "/document",
    element: (
      <ProtectedRoute>
        <Profile />
        <Layout />
      </ProtectedRoute>
    ),
    outlet: (
      <main className="pt-20">
        <Document />
      </main>
    ),
  },
  {
    path: "/document/:id",
    element: (
      <ProtectedRoute>
        <Profile />
        <Layout />
      </ProtectedRoute>
    ),
    outlet: (
      <main className="pt-16">
        <TextEditor />
      </main>
    ),
  },
  {
    path: "/docs",
    element: <Layout />,
    outlet: <CommingSoon />,
  },
  {
    path: "/pricing",
    element: <Layout />,
    outlet: <CommingSoon />,
  },
  {
    path: "/contact-us",
    element: <Layout />,
    outlet: <CommingSoon />,
  },
];

export default routesData;
