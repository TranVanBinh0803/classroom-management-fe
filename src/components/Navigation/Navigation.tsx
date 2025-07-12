import { type Navigation } from "@toolpad/core/AppProvider";
import { Home, MenuBook, Message } from '@mui/icons-material';

export const NAVIGATION: Navigation = [
  {
    segment: "students",
    title: "Manage Students",
    icon: <Home />,
  },
  {
    segment: "lessons", 
    title: "Manage Lessons",
    icon: <MenuBook />,
  },
  {
    segment: "messages",
    title: "Message",
    icon: <Message />,
  },
];