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
import { useAddLesson } from "../api/useAddLesson";

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
}

const formSchema = z.object({
  title: z.string().nonempty("Title is required"),
  description: z.string().nonempty("Description is required"),
});

type FormValues = z.infer<typeof formSchema>;

export function AddLessonModal({ open, handleClose }: AddStudentModalProps) {
  const addLessonMutation = useAddLesson();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    addLessonMutation.mutate(data, {
      onSuccess: () => {
        reset();
        handleClose();
      },
    });
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
          Create Lesson
        </Typography>
        <Grid container spacing={2}>
          <Grid size={12}>
            <Stack gap={4}>
              <TextField
                label="Title"
                type="text"
                fullWidth
                InputLabelProps={{ shrink: true }}
                {...register("title")}
                error={!!errors.title}
                helperText={errors.title?.message}
              />
              <TextField
                label="Description"
                type="text"
                InputLabelProps={{ shrink: true }}
                fullWidth
                {...register("description")}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            </Stack>
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 6 }}>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
