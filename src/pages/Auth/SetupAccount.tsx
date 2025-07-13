import {
  Box,
  Button,
  Divider,
  TextField,
  Typography,
  Link,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate, useSearchParams } from "react-router-dom";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrowBack } from "@mui/icons-material";
import { useValidateAccessCode } from "./api/useValidateAccessCode";
import { toast } from "react-toastify";
import { useSetupAccount } from "./api/useSetupAccount";

const formSchema = z.object({
  name: z.string().nonempty("Name is required"),
  password: z.string().nonempty("Password is required"),
});

type FormValues = z.infer<typeof formSchema>;

const Card = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  background: "white",
  borderRadius: theme.shape.borderRadius,
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "100vh",
  padding: theme.spacing(2),
  justifyContent: "center",
  alignItems: "center",
  background:
    "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
}));

export default function SetupAccount() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const setupAccountMutation = useSetupAccount();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setupAccountMutation.mutate({
      token,
      name: data.name,
      password: data.password,
    });
  };

  return (
    <SignInContainer>
      <Card>
        <Button sx={{ width: 100 }} startIcon={<ArrowBack fontSize="medium" />}>
          Back
        </Button>
        <Typography
          component="h1"
          variant="h4"
          sx={{
            width: "100%",
            fontSize: "clamp(2rem, 10vw, 2.15rem)",
            textAlign: "center",
          }}
        >
          Setup account
        </Typography>
        <Typography
          variant="body2"
          sx={{
            width: "100%",
            textAlign: "center",
          }}
        >
          Please enter your name and password to continue
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
          }}
        >
          <TextField
            label="Name"
            type="text"
            fullWidth
            autoComplete="name"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            autoComplete="password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button type="submit" fullWidth variant="contained">
            Submit
          </Button>
        </Box>
      </Card>
    </SignInContainer>
  );
}
