import './App.css'
import {createBrowserRouter, Navigate, Outlet, RouterProvider} from "react-router-dom";
import {UserContext} from "./context/UserContext.jsx";
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import {useContext} from "react";

function ProtectedLayout() {
  // If the user is not connected, navigate to log in
  const userContext = useContext(UserContext);

  if (!userContext?.state?.user_id)
    return <Navigate to={"/Login"} replace />

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

