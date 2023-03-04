import Router from "./Router";
import { Provider } from "react-redux";
import store from "./redux/store";
const App = () => {
  return (
    <Provider store={store}>
      <Router></Router>
    </Provider>
  );
};

export default App;
