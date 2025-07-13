import { Navigate, RouteObject } from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage";
import VerifyPage from "./pages/Auth/VerifyPage";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { NotFoundPage } from "./pages/Common/NotFoundPage";
import { InstructorHomePage } from "./pages/Common/InstructorHomePage";
import { StudentPage } from "./pages/Student/StudentPage";
import { LessonPage } from "./pages/Lesson/LessonPage";
import { MessagePage } from "./pages/Message/MessagePage";
import SetupAccount from "./pages/Auth/SetupAccount";
import StudentLoginPage from "./pages/Auth/StudentLoginPage";
import { TaskPage } from "./pages/Task/TaskPage";
import { useAuth } from "./hooks/auth/useAuth";
import { StudentHomePage } from "./pages/Common/StudentHomePage";

const publicRoutes: RouteObject[] = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/student-login",
    element: <StudentLoginPage />,
  },
  {
    path: "/verify",
    element: <VerifyPage />,
  },
  {
    path: "/setup-account",
    element: <SetupAccount />,
  },
];

const instructorRoutes: RouteObject[] = [
  {
    element: <ProtectedRoute allowedRoles={["instructor"]} />,
    children: [
      {
        path: "/instructor",
        element: <InstructorHomePage />,
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

const privateRoutes: RouteObject[] = [
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/instructor",
        element: <InstructorHomePage />,
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

const studentRoutes: RouteObject[] = [
  {
    element: <ProtectedRoute allowedRoles={["student"]} />,
    children: [
      {
        path: "/student",
        element: <StudentHomePage />,
        children: [
          {
            index: true,
            element: <TaskPage />,
          },
          {
            path: "tasks",
            element: <TaskPage />,
          },
          {
            path: "messages",
            element: <MessagePage />,
          },
        ],
      },
    ],
  },
];

const defaultRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <RoleBasedRedirect />,
      },
    ],
  },
];

function RoleBasedRedirect() {
  const { getUser } = useAuth();
  const userRole = getUser.role;

  if (userRole === "student") {
    return <Navigate to="/student" replace />;
  } else if (userRole === "instructor") {
    return <Navigate to="/instructor" replace />;
  }

  return <Navigate to="/login" replace />;
}

export const routes = [
  ...publicRoutes,
  ...instructorRoutes,
  ...studentRoutes,
  ...defaultRoutes,
];
