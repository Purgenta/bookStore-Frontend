import Router from "./Router";
import { Provider } from "react-redux";
import store from "./redux/store";
import { createPortal } from "react-dom";
const header = document.querySelector("#main-header") as HTMLElement;
const footer = document.querySelector("#main-footer") as HTMLElement;
import Notifications from "./components/Notifications/Notifications";
import Navigation from "./components/Navigation/Navigation";
import Footer from "./components/Footer/Footer";
import AuthProvider from "./redux/AuthProvider";
const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        {createPortal(<Navigation />, header)}
        <Notifications></Notifications>
        <Router></Router>
        {createPortal(<Footer />, footer)}
      </AuthProvider>
    </Provider>
  );
};

export default App;
