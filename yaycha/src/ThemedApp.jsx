// import { createContext, useState } from "react";
// import App from "./App";

// export const AppContext = createContext();

// export default function ThemedApp() {
//   const [mode, setMode] = useState("dark");
//   return (
//     <AppContext.Provider value={{ mode, setMode }}>
//       <App />
//     </AppContext.Provider>
//   );
// }

// ################################################### //

// Chapter6 - React UI Framework MUI

// import { useState, createContext, useContext } from "react";
// import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
// import App from "./App";
// const theme = createTheme({
//   palette: {
//     mode: "dark",
//   },
// });
// const AppContext = createContext();
// export function useApp() {
//   return useContext(AppContext);
// }
// export default function ThemedApp() {
//   const [showForm, setShowForm] = useState(false);
//   return (
//     <ThemeProvider theme={theme}>
//       <AppContext.Provider value={{ showForm, setShowForm }}>
//         <App />
//         <CssBaseline />
//       </AppContext.Provider>
//     </ThemeProvider>
//   );
// }

// ################################################### //

// Chapter8 - React Router

import { useState, createContext, useContext, useMemo, useEffect } from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";

import { deepPurple, grey } from "@mui/material/colors";

import Template from "./Template";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Likes from "./pages/Likes";
import Profile from "./pages/Profile";
import Comments from "./pages/Comments";
import { fetchVerify } from "./libs/fetcher";
import Search from "./pages/Search";

const AppContext = createContext();

export function useApp() {
  return useContext(AppContext);
}

//Chapter12 - React Query
export const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Template />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/comments/:id",
        element: <Comments />,
      },
      {
        path: "/profile/:id",
        element: <Profile />,
      },
      {
        path: "/likes/:id",
        element: <Likes />,
      },
      {
        path: "/likes/:id/:type",
        element: <Likes />,
      },
      {
        path: "/search",
        element: <Search />,
      },
    ],
  },
]);

export default function ThemedApp() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [globalMsg, setGlobalMsg] = useState(null);
  const [auth, setAuth] = useState(null);
  const [mode, setMode] = useState("dark");

  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode,
        primary: deepPurple,
        banner: mode === "dark" ? grey[800] : grey[200],
        text: {
          fade: grey[500],
        },
      },
    });
  }, [mode]);

  useEffect(() => {
    fetchVerify().then((user) => {
      if (user) setAuth(user);
    });
  });

  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider
        value={{
          showDrawer,
          setShowDrawer,
          showForm,
          setShowForm,
          globalMsg,
          setGlobalMsg,
          auth,
          setAuth,
          mode,
          setMode,
        }}
      >
        {/* Chapter12 - React Query */}
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
        <CssBaseline />
      </AppContext.Provider>
    </ThemeProvider>
  );
}
