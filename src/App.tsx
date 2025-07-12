import { useRoutes } from "react-router-dom";
import { routes } from "./routes";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./apis/queryClient";
import { Provider as JotaiProvider } from "jotai";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { store } from "./atoms/store";
import theme from "./theme";
import { ToastContainer } from "react-toastify";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  const appRoutes = useRoutes(routes);

  return (
    <QueryClientProvider client={queryClient}>
      <JotaiProvider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {appRoutes}
          <ToastContainer position="bottom-right" autoClose={1000} />
        </ThemeProvider>
      </JotaiProvider>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
