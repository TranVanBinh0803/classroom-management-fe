import { Box, Typography, Button, Chip } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useGetLessons } from "./api/useGetLesson";
import { AddLessonModal } from "./components/AddLessonModal";
import { AssignStudentModal } from "./components/AssignStudentModal";

const paginationModel = { page: 0, pageSize: 5 };

export function LessonPage() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedLesson, setSelectedLesson] = useState<any | null>(null);

  const [openAssignModal, setOpenAssignModal] = useState(false);
  const handleCloseAssignModal = () => setOpenAssignModal(false);

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "actions",
      headerName: "Action",
      flex: 1,
      align: "center",
      headerAlign: "center",
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        const handleAssignStudent = () => {
          setSelectedLesson(params.row);
          setOpenAssignModal(true);
        };

        return (
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              mt: 1,
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              sx={{ backgroundColor: "blue", textTransform: "none" }}
              onClick={handleAssignStudent}
            >
              Assign Student
            </Button>
          </Box>
        );
      },
    },
  ];
  const { data: response } = useGetLessons();
  const lessonRows = response
    ? Object.entries(response).map(([id, lesson]) => ({
        id,
        title: lesson.title,
        description: lesson.description,
      }))
    : [];
  return (
    <Box
      sx={{
        p: 4,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h5" mb={3}>
        Manage Lessons
      </Typography>
      <Box
        mb={3}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">
          {lessonRows.length} {lessonRows.length === 1 ? "lesson" : "lessons"}
        </Typography>
        <Box display="flex" gap={2}>
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            onClick={handleOpen}
          >
            Add lesson
          </Button>
          <Button startIcon={<SearchIcon />} variant="outlined">
            Filter
          </Button>
        </Box>
      </Box>
      <DataGrid
        sx={{
          width: "100%",
        }}
        rows={lessonRows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection={false}
        disableRowSelectionOnClick
      />
      <AddLessonModal
        open={open}
        handleClose={() => {
          handleClose();
        }}
      />

      <AssignStudentModal
        open={openAssignModal}
        handleClose={() => {
          handleCloseAssignModal();
        }}
        lesson={selectedLesson}
      />
    </Box>
  );
}
