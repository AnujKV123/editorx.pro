
import routesData from "./Routes"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// import { useBackendTokenCheckExpirationTime } from "../config/authProvider"

const RouteHandelar = () => {
    // useBackendTokenCheckExpirationTime()

    return(
        <Router >
            <Routes>
            {
                routesData.map(({path, element, outlet}) => {
                    return <Route key={path} path={path} element={element}>{outlet && <Route index element={outlet}/>}</Route>
                })
            }
            </Routes>
        </Router>
    )
}

export default RouteHandelar