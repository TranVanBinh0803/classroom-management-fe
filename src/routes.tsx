import { RouteObject } from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage";
import VerifyPage from "./pages/Auth/VerifyPage";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { NotFoundPage } from "./pages/Common/NotFoundPage";
import { HomePage } from "./pages/Common/HomePage";
import { StudentPage } from "./pages/Student/StudentPage";
import { LessonPage } from "./pages/Lesson/LessonPage";
import { MessagePage } from "./pages/Message/MessagePage";

const publicRoutes: RouteObject[] = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/verify",
    element: <VerifyPage />,
  },
];

const privateRoutes: RouteObject[] = [
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        children: [
          {
            index: true,
            element: <StudentPage />,
          },
          {
            path: "students",
            element: <StudentPage />,
          },
          {
            path: "lessons",
            element: <LessonPage />,
          },
          {
            path: "messages",
            element: <MessagePage />,
          },
          {
            path: "*",
            element: <NotFoundPage />,
          },
        ],
      },
    ],
  },
];

export const routes = [...publicRoutes, ...privateRoutes];