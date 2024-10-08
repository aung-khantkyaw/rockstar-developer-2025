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

import { useState, createContext, useContext } from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import App from "./App";
const theme = createTheme({
  palette: {
    mode: "dark",
  },
});
const AppContext = createContext();
export function useApp() {
  return useContext(AppContext);
}
export default function ThemedApp() {
  const [showForm, setShowForm] = useState(false);
  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider value={{ showForm, setShowForm }}>
        <App />
        <CssBaseline />
      </AppContext.Provider>
    </ThemeProvider>
  );
}
