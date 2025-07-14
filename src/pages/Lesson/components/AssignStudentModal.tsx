import { Avatar, Box, Button, Modal, Typography } from "@mui/material";
import { useState } from "react";
import { useGetStudents } from "~/pages/Student/api/useGetStudents";
import { useAssignLesson } from "../api/useAssignLesson";

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
  lesson: any;
}

export function AssignStudentModal({
  open,
  handleClose,
  lesson,
}: AddStudentModalProps) {
  const { data: response } = useGetStudents();
  console.log("lesson:", lesson);
  const students = response
    ? Object.entries(response).map(([id, student]) => student)
    : [];
  const useAssignLessonMutation = useAssignLesson();
  const handleAssign = (studentId: string) => {
    if (!lesson) return;

    useAssignLessonMutation.mutate({
      studentId,
      lessonId: lesson.id,
      title: lesson.title,
      description: lesson.description,
    });
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h5"> Assign Student Modal</Typography>
        {students.length > 0 && lesson ? (
          students.map((student, index) => {
            const isAlreadyAssigned =
              student.lessons &&
              Object.keys(student.lessons).includes(lesson.id);

            return (
              <Box
                key={student.id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  p: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar sx={{ width: 28, height: 28 }}>
                      {student.avatar}
                    </Avatar>
                    <Typography variant="body2" fontWeight={500}>
                      {student.name}
                    </Typography>
                    <Typography variant="body2" fontWeight={500}>
                      {student.phone}
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    onClick={() => handleAssign(student.id || "")}
                    disabled={isAlreadyAssigned}
                  >
                    {isAlreadyAssigned ? "Already Assigned" : "Assign"}
                  </Button>
                </Box>
              </Box>
            );
          })
        ) : (
          <Typography color="text.secondary" variant="body1">
            No student
          </Typography>
        )}
      </Box>
    </Modal>
  );
}
