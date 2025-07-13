import { type Navigation } from "@toolpad/core/AppProvider";
import { Assignment, MenuBook, Message } from '@mui/icons-material';

export const STUDENT_NAVIGATION: Navigation = [
  {
    segment: "student/tasks", 
    title: "Manage tasks",
    icon: <MenuBook />,
  },
  {
    segment: "student/messages",
    title: "Message",
    icon: <Message />,
  },
];