import { zodResolver } from "@hookform/resolvers/zod";
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
import { useAddStudent } from "../api/useAddStudent";
import { useEffect } from "react";
import { useUpdateStudent } from "../api/useUpdateStudent";
import { phoneRegex } from "~/untils/regex";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

interface AddStudentModalProps {
  open: boolean;
  handleClose: () => void;
  student?: any;
}

const formSchema = z.object({
  name: z.string().nonempty("Student name is required"),
  email: z.string().nonempty("Email is required"),
  address: z.string().nonempty("Address is required"),
  phone: z
    .string()
    .nonempty("Phone number is required")
    .regex(phoneRegex, "Phone number must be valid (e.g. +84901234567)"),
});

type FormValues = z.infer<typeof formSchema>;

export function AddStudentModal({
  open,
  handleClose,
  student,
}: AddStudentModalProps) {
  const addStudentMutation = useAddStudent();
  const updateStudentMutation = useUpdateStudent(student?.id || "");

  const isPending = student
    ? updateStudentMutation.isPending
    : addStudentMutation.isPending;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: student?.name || "",
      email: student?.email || "",
      address: student?.address || "",
      phone: student?.phone || "",
    },
  });

  useEffect(() => {
    if (open)
      reset({
        name: student?.name || "",
        email: student?.email || "",
        address: student?.address || "",
        phone: student?.phone || "",
      });
  }, [open, student, reset]);

  const onSubmit = async (data: FormValues) => {
    if (student) {
      updateStudentMutation.mutate(data, {
        onSuccess: () => {
          reset();
          handleClose();
        },
      });
    } else {
      addStudentMutation.mutate(data, {
        onSuccess: () => {
          reset();
          handleClose();
        },
      });
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} component="form" onSubmit={handleSubmit(onSubmit)}>
        <Typography
          id="modal-modal-title"
          variant="h4"
          sx={{ textAlign: "center", mb: 6 }}
        >
          {student ? "Update student" : "Create student"}
        </Typography>
        <Grid container spacing={2}>
          <Grid size={6}>
            <Stack gap={4}>
              <TextField
                label="Student Name"
                fullWidth
                InputLabelProps={{ shrink: true }}
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
              <TextField
                label="Email"
                type="email"
                InputLabelProps={{ shrink: true }}
                fullWidth
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Stack>
          </Grid>
          <Grid size={6}>
            <Stack gap={4}>
              <TextField
                label="Phone Number"
                fullWidth
                {...register("phone")}
                InputLabelProps={{ shrink: true }}
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
              <TextField
                label="Address"
                fullWidth
                {...register("address")}
                InputLabelProps={{ shrink: true }}
                error={!!errors.address}
                helperText={errors.address?.message}
              />
            </Stack>
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 6 }}>
          <Button type="submit" variant="contained" disabled={isPending}>
            {isPending
              ? student
                ? "Updating..."
                : "Creating..."
              : student
                ? "Update"
                : "Create"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
