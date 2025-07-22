
import RouteHandelar from "./routes/RouteHandelar"
import { Provider } from "react-redux"
import { store } from "./store/store"

function App() {
  return (
    <Provider store={store}>
      <RouteHandelar />
    </Provider>
    )
  }

export default App