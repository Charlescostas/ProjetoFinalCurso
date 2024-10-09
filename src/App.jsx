import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import { Helmet } from "react-helmet";

function App() {
  return (
    <>
      <Helmet titleTemplate="%s - Ativa365" />
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
