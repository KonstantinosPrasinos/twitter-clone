import './App.css'
import {createBrowserRouter, Navigate, Outlet, RouterProvider} from "react-router-dom";
import {UserContext} from "./context/UserContext.jsx";
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Results from "./pages/Results.jsx";
import {useContext, useEffect} from "react";
import UserProfile from "./pages/UserProfile.jsx";

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
        path: '/user/:username',
        element: <UserProfile />
      },
      {
        path: '/results',
        element: <Results />
      },
      {
        path: '/home',
        element: <Navigate to={"/"} />
      },
      {
        path: '/',
        element: <Home />
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
  const userContext = useContext(UserContext);

  useEffect(() => {
    // Get user from local storage, in order to keep them logged in after refresh
    const localStorageUser = localStorage.getItem("user");

    if (!localStorageUser) return;

    const userObject = JSON.parse(localStorageUser)

    if (!userObject?.user_id) return;

    if (new Date(userObject?.validUntil).getTime() <= (new Date()).getTime()) {
      localStorage.removeItem("user");
      return;
    }

    userContext.dispatch({type: 'SET_USER', payload: userObject});
  }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;