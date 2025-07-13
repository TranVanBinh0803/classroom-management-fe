import { type Navigation } from "@toolpad/core/AppProvider";
import { Home, MenuBook, Message } from '@mui/icons-material';

export const INSTRUCTOR_NAVIGATION: Navigation = [
  {
    segment: "instructor/students",
    title: "Manage Students",
    icon: <Home />,
  },
  {
    segment: "instructor/lessons", 
    title: "Manage Lessons",
    icon: <MenuBook />,
  },
  {
    segment: "instructor/messages",
    title: "Message",
    icon: <Message />,
  },
];