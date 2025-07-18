import { Box, Button, Modal, Typography } from "@mui/material";
import { useMarkLessonDone } from "../api/useMarkLessonDone";
import { useAtomValue } from "jotai";
import { user } from "~/atoms/AuthAtoms";

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

interface ViewDetailLessonModalProps {
  open: boolean;
  handleClose: () => void;
  lesson: any;
}

export function ViewDetailLessonModal({
  open,
  handleClose,
  lesson,
}: ViewDetailLessonModalProps) {
  const getUser = useAtomValue(user);
  const userId = getUser?.id || "";
  const markLessonDoneMutation = useMarkLessonDone();
  const handleMarkLessonDone = () => [
    markLessonDoneMutation.mutate(
      { lessonId: lesson.id, studentId: userId },
      {
        onSuccess: () => {
          handleClose();
        },
      }
    ),
  ];
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
          variant="h4"
          sx={{ textAlign: "center", mb: 6 }}
        >
          Detail lesson
        </Typography>
        <Typography variant="h5" mb={2}>
          {lesson?.title ? lesson.title : "-"}
        </Typography>
        <Typography variant="body2">
          {lesson?.description ? lesson.description : "-"}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 6 }}>
          <Button
            type="submit"
            variant="contained"
            disabled={lesson?.isCompleted && lesson.isCompleted === true}
            onClick={handleMarkLessonDone}
          >
            Complete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
