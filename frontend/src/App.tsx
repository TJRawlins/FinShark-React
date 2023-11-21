import { Outlet } from "react-router";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";

/* APP COMPONENT:
  + At the top of the component tree
  + Smart component (state & logic)
  + All other components are the dumb components (no logic)
  + Passes data down to dumb components, and dumb components sends data requests up
*/

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
