import { createBrowserRouter } from "react-router-dom";

import Layout from "./pages/Layout";
import ErrorPage from "./pages/ErrorPage";
import ChatPage from "./pages/ChatPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <Layout />,
    children: [
      { index: true, element: <Login /> },
      // { path: 'chat/:slug', element: <ChatPage />},
      { path: "register", element: <SignUp /> },
      { path: "chat/", element: <ChatPage /> },
    ],
  },
]);

export default router;
