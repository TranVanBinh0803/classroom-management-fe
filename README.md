# Classroom Management Website

You must add to .env to run project
VITE_API_KEY= ...
VITE_BACKEND_URL= ...

To install dependencies:

```bash
yarn
```

To run:

```bash
yarn dev
```

## Project structure

classroom-management-app-fe/
├── node_modules/                  # Installed dependencies
├── public/                        # Public assets
├── src/                           # Main source folder
│   ├── apis/                      # API communication logic
│   │   ├── services/
│   │   │   ├── queryClient.ts     # React Query client configuration
│   │   │   └── restClient.ts      # Axios or fetch wrapper
│   │
│   ├── assets/                    # Images, icons, and static files
│
│   ├── atoms/                     # Global state with Jotai or similar
│   │   ├── AuthAtoms.ts
│   │   └── store.ts
│
│   ├── components/                # Reusable and shared UI components
│   │   ├── Navigation/
│   │   ├── Profile/
│   │   └── ProtectedRoute/
│
│   ├── firebase/                  # Firebase configuration
│   │   └── config.ts
│
│   ├── hooks/                     # Custom React hooks
│   │   ├── auth/
│   │   └── socket/
│
│   ├── pages/                     # Route-level components
│   │   ├── Auth/
│   │   ├── Common/
│   │   ├── Lesson/
│   │   ├── Message/
│   │   ├── Student/
│   │   └── Task/
│
│   ├── types/                     # TypeScript interfaces and types
│   │   ├── common.ts
│   │   └── ui.ts
│
│   ├── untis/                     # Utilities and constants
│   │   └── constants.ts
│
│   ├── App.tsx                    # Root app component
│   ├── main.tsx                   # ReactDOM render entry point
│   ├── routes.tsx                 # App routes configuration
│   └── theme.ts                   # Theme and styling setup
│
├── .env                           # Environment variables
├── .gitignore                     # Git ignored files
├── eslint.config.js              # Linting rules
├── index.html                     # Base HTML file
├── package.json                   # Project metadata and dependencies
├── README.md                      # Project documentation
├── tsconfig.json                  # TypeScript configuration
├── vite.config.ts                 # Vite configuration
├── yarn.lock                      # Yarn lock file

## Project Description

Instructor dashboard: Add new student; edit, delete student; assign lesson; view students; add lesson; get lessons; chat 1-1 realtime with student

Student dashboard: Get all my lessons, mark lesson done, chat 1-1 realtime with instructor

User authentication

## Screenshots
Here are some screeenshots of the application.

![add student](/public/images/add-student.png)
![assign lesson](/public/images/assign-lesson.png)
![chat 1-1](/public/images/chat-1-1.png)
![manage lesson](/public/images/manage-lesson.png)
![manage student](/public/images/manage-student.png)
![manage task](/public/images/manage-task.png)
![mark lesson done](/public/images/mark-lesson-done.png)
![instructor login](/public/images/instructor-login.png)
![instructor verify account](/public/images/instructor-verify-account.png)
![student login](/public/images/student-login.png)
![student setup account](/public/images/student-setup-account.png)
