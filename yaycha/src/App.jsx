// Chapter4 - React Form

// import List from "./List";
// import Item from "./Item";
// import { useContext, useState } from "react";
// import Form from "./Form";
// import { AppContext } from "./ThemedApp";

// export default function App() {
//   const { mode, setMode } = useContext(AppContext);

//   const [showForm, setShowForm] = useState(false);

//   const [data, setData] = useState([
//     { id: 1, content: "Hello", name: "Alice" },
//     { id: 2, content: "Hello", name: "Bob" },
//     { id: 3, content: "Hello", name: "Chris" },
//   ]);

//   const remove = (id) => {
//     setData(data.filter((item) => item.id !== id));
//   };

//   const add = (content, name) => {
//     const id = data[data.length - 1].id + 1;
//     setData([...data, { id, content, name }]);
//   };
//   return (
//     <div
//       style={{
//         minHeight: 1500,
//         background: mode === "dark" ? "black" : "white",
//         color: mode === "dark" ? "white" : "black",
//         paddingTop: 20,
//       }}
//     >
//       <div style={{ maxWidth: 600, margin: "0 auto" }}>
//         <h1
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           Yaycha
//           <div>
//             <button
//               onClick={() => setShowForm(!showForm)}
//               style={{
//                 width: 32,
//                 height: 32,
//                 borderRadius: 50,
//                 border: "0 none",
//                 background: showForm ? "#dc3545" : "#0d6efd",
//                 color: "white",
//               }}
//             >
//               {showForm ? "x" : "+"}
//             </button>
//             <button
//               onClick={() => setMode(mode === "dark" ? "light" : "dark")}
//               style={{
//                 marginLeft: 8,
//                 padding: "0 20px",
//                 height: 32,
//                 borderRadius: 32,
//                 border: "0 none",
//                 background: mode === "dark" ? "#333" : "#ddd",
//                 color: mode === "dark" ? "white" : "black",
//               }}
//             >
//               {mode === "dark" ? "Light" : "Dark"}
//             </button>
//           </div>
//         </h1>

//         {showForm && <Form add={add} />}

//         <List>
//           {data.map((item) => {
//             return <Item key={item.id} item={item} remove={remove} />;
//           })}
//         </List>
//       </div>
//     </div>
//   );
// }

// ################################################### //

// Chapter5 - React Context Provider

// import { createContext, useContext } from "react";

// const AppContext = createContext();

// export default function App() {
//   return (
//     <AppContext.Provider value="Yaycha">
//       <Home />
//     </AppContext.Provider>
//   );
// }

// function Home() {
//   return (
//     <div>
//       <Header />
//       <Footer />
//     </div>
//   );
// }

// function Header() {
//   const title = useContext(AppContext);
//   return <h1>{title}</h1>;
// }

// function Footer() {
//   const title = useContext(AppContext);
//   return <footer>Copyright - {title}</footer>;
// }

// ################################################### //

// Chapter6 - React UI Framework MUI

// import { useState } from "react";
// import { Box, Container } from "@mui/material";
// import Header from "./components/Header";
// import Form from "./components/Form";
// import Item from "./components/Item";
// import { useApp } from "./ThemedApp";
// export default function App() {
//   const { showForm } = useApp();
//   const [data, setData] = useState([
//     { id: 3, content: "Yay, interesting.", name: "Chris" },
//     { id: 2, content: "React is fun.", name: "Bob" },
//     { id: 1, content: "Hello, World!", name: "Alice" },
//   ]);
//   const remove = (id) => {
//     setData(data.filter((item) => item.id !== id));
//   };
//   const add = (content, name) => {
//     const id = data[0].id + 1;
//     setData([{ id, content, name }, ...data]);
//   };
//   return (
//     <Box>
//       <Header />
//       <Container maxWidth="sm" sx={{ mt: 4 }}>
//         {showForm && <Form add={add} />}
//         {data.map((item) => {
//           return <Item key={item.id} item={item} remove={remove} />;
//         })}
//       </Container>
//     </Box>
//   );
// }

// ################################################### //

// Chapter8 - React Router

import {
  createBrowserRouter,
  RouterProvider,
  Link,
  useNavigate,
  useParams,
  Outlet,
} from "react-router-dom";

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
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/profile/:id",
        element: <Profile />,
      },
    ],
  },
]);
export default function App() {
  return (
    <>
      {/* <Template /> */}
      <RouterProvider router={router} />
    </>
  );
}

function Template() {
  return (
    <div>
      <h1>App</h1>
      <Outlet />
    </div>
  );
}

function Home() {
  return (
    <>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/profile">Profile</Link>
      <h1>Home</h1>
    </>
  );
}
function About() {
  const navigate = useNavigate();
  return (
    <>
      <h1>About</h1>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Go to Home
      </button>
    </>
  );
}
function Contact() {
  const navigate = useNavigate();
  return (
    <>
      <h1>Contact</h1>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Go to Home
      </button>
    </>
  );
}
function Profile() {
  const { id } = useParams();
  return (
    <>
      <h1>Profile {id}</h1>
    </>
  );
}
