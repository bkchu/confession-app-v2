import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

import Routes from "./routes/Routes";
import Header from "./components/header/header";
import Sidebar from "./components/sidebar/sidebar";
import "./App.scss";

library.add([faChevronLeft, faChevronRight]);

function App() {
  return (
    <>
      <Header />
      <Sidebar />
      <Routes />
    </>
  );
}

export default App;
