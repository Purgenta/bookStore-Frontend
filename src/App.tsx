import "./App.css";
import Router from "./Router";
import { Provider } from "react-redux";
import store from "./redux/store";
const App = () => {
  return (
    <div>
      <Provider store={store}>
        <Router></Router>
      </Provider>
    </div>
  );
};

export default App;
