
import RouteHandelar from "./components/routes/RouteHandelar"
import { Provider } from "react-redux"
import { store } from "./components/store/store"

function App() {
  return (
    <Provider store={store}>
      <RouteHandelar />
    </Provider>
    )
  }

export default App