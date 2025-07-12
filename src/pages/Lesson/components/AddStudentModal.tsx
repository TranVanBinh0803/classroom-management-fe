import { zodResolver } from "@hookform/resolvers/zod";
import { StackedBarChart } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import z from "zod";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

interface AddStudentModalProps {
  open: boolean;
  handleClose: () => void;
}

const formSchema = z.object({
  studentName: z.string().nonempty("Student name is required"),
  email: z.string().nonempty("Email is required"),
  address: z.string().nonempty("Address is required"),
  phone: z.string().nonempty("Phone number is required"),
  role: z.string().nonempty("Role is required"),
});

type FormValues = z.infer<typeof formSchema>;

export function AddStudentModal({ open, handleClose }: AddStudentModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentName: "",
    },
  });
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h3"
          component="h2"
          sx={{ textAlign: "center", mb: 6 }}
        >
          Create student
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid size={6}>
              <Stack gap={4}>
                <TextField
                  label="Student Name"
                  type="text"
                  fullWidth
                  autoComplete="studentName"
                  {...register("studentName")}
                  error={!!errors.studentName}
                  helperText={errors.studentName?.message}
                />
                <TextField
                  label="Email address"
                  type="email"
                  fullWidth
                  autoComplete="email"
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
                <TextField
                  label="Address"
                  type="text"
                  fullWidth
                  autoComplete="address"
                  {...register("address")}
                  error={!!errors.address}
                  helperText={errors.address?.message}
                />
              </Stack>
            </Grid>
            <Grid size={6}>
              <Stack gap={4}>
                <TextField
                  label="Phone number"
                  type="text"
                  fullWidth
                  autoComplete="phone"
                  {...register("phone")}
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                />
                <TextField
                  label="Role"
                  type="text"
                  fullWidth
                  autoComplete="role"
                  {...register("role")}
                  error={!!errors.role}
                  helperText={errors.role?.message}
                />
              </Stack>
            </Grid>
          </Grid>
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" sx={{ mt: 6 }}>
            Create
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
