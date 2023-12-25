import './App.css'
import {createBrowserRouter, Navigate, Outlet, RouterProvider} from "react-router-dom";
import userContext from "./context/UserContext.jsx";
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";

function ProtectedLayout() {
  // If the user is not connected, navigate to log in
  // temp because log in doesn't work
  // if (!userContext.state?.id)
  //   return <Navigate to={"/Login"} replace />

  // When we want to have certain elements that always stay visible, like a navigation bar, we add it below
  return (
      <Outlet />
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedLayout />,
    children: [
        // Add here all protected routes
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/home',
        element: <Navigate to={"/"} />
      }
    ]
  },
    // All non protected routes go here
  {
    path: '/register',
    element: <Register />
  },

  {
    path: '/Login',
    element: <Login />
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;

