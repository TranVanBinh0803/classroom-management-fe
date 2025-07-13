import { Badge, Stack, Tooltip } from "@mui/material";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import Profile from "~/components/Profile/Profile";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { INSTRUCTOR_NAVIGATION } from "~/components/Navigation/InstructorNavigation";

function CustomToolbarActions() {
  return (
    <Stack direction="row" alignItems="center">
      <Tooltip title="Notifications">
        <Badge color="primary" variant="dot" sx={{ cursor: "pointer" }}>
          <NotificationsNoneIcon sx={{ color: "primary.main" }} />
        </Badge>
      </Tooltip>
      <Profile />
    </Stack>
  );
}

export const InstructorHomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const router = {
    pathname: location.pathname,
    searchParams: new URLSearchParams(location.search),
    navigate: (path: string | URL) => {
      if (typeof path === 'string') {
        navigate(path);
      } else {
        navigate(path.pathname + path.search);
      }
    },
  };

  return (
    <AppProvider
      navigation={INSTRUCTOR_NAVIGATION}
      branding={{
        logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
        title: "MUI",
        homeUrl: "/instructor/students",
      }}
      router={router}
    >
      <DashboardLayout
        slots={{
          toolbarActions: CustomToolbarActions,
        }}
      >
        <Outlet />
      </DashboardLayout>
    </AppProvider>
  );
};