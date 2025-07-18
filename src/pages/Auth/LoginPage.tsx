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

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrowBack } from "@mui/icons-material";
import { useCreateAccessCode } from "./api/useCreateAccessCode";
import { phoneRegex } from "~/untils/regex";

const formSchema = z.object({
  phone: z
    .string()
    .nonempty("Phone is required")
    .regex(phoneRegex, "Phone number must be valid (e.g. +84901234567)"),
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

export default function LoginPage() {
  const createAccessCodeMutation = useCreateAccessCode();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    createAccessCodeMutation.mutate(data);
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
          Sign in
        </Typography>
        <Typography
          variant="body2"
          sx={{
            width: "100%",
            textAlign: "center",
          }}
        >
          Please enter your phone to sign in
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
            label="Phone"
            type="text"
            fullWidth
            placeholder="+84..."
            autoComplete="phone"
            {...register("phone")}
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />
          <Button type="submit" fullWidth variant="contained">
            Next
          </Button>
          <Typography
            variant="body2"
            sx={{
              width: "100%",
              textAlign: "center",
            }}
          >
            Passwordless authentication methods
          </Typography>
        </Box>
        <Divider>or</Divider>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography sx={{ textAlign: "center" }}>
            Don&apos;t have an account?{" "}
            <Link href="/register" variant="body2">
              Sign up
            </Link>
          </Typography>
        </Box>
      </Card>
    </SignInContainer>
  );
}
