import Router from "./Router";
import { Provider } from "react-redux";
import store from "./redux/store";
import { createPortal } from "react-dom";
const header = document.querySelector("#main-header") as HTMLElement;
import Navigation from "./components/Navigation/Navigation";
const App = () => {
  return (
    <Provider store={store}>
      {createPortal(<Navigation />, header)}
      <Router></Router>
    </Provider>
  );
};

export default App;
