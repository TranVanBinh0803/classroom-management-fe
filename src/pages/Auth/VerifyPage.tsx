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
import { useNavigate } from "react-router-dom";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrowBack } from "@mui/icons-material";
import { useValidateAccessCode } from "./api/useValidateAccessCode";
import { toast } from "react-toastify";

const formSchema = z.object({
  otp: z.string().nonempty("OTP is required"),
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

export default function VerifyPage() {
  const validateAccessCodeMutation = useValidateAccessCode();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    const phone = localStorage.getItem("auth_phone");
    if (!phone) {
      toast.error("Phone not found. Please try again.");
      return;
    }
    validateAccessCodeMutation.mutate({ phone, otp: data.otp });
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
          Phone verifycation
        </Typography>
        <Typography
          variant="body2"
          sx={{
            width: "100%",
            textAlign: "center",
          }}
        >
          Please enter your code that send to your phone
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
            label="OTP"
            type="text"
            fullWidth
            autoComplete="otp"
            {...register("otp")}
            error={!!errors.otp}
            helperText={errors.otp?.message}
          />
          <Button type="submit" fullWidth variant="contained">
            Submit
          </Button>
        </Box>
        <Divider></Divider>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography sx={{ textAlign: "center" }}>
            Code not receive?
            <Link href="/register" variant="body2">
              Send again
            </Link>
          </Typography>
        </Box>
      </Card>
    </SignInContainer>
  );
}
