import { Box, Typography, Button, Chip } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { AddStudentModal } from "./components/AddStudentModal";
import { useState } from "react";

const columns: GridColDef[] = [
  {
    field: "studentName",
    headerName: "Student Name",
    flex: 1,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => (
      <Chip
        label={params.value ? "Active" : "Inactive"}
        sx={{
          backgroundColor: params.value ? "#d1fae5" : "#fee2e2",
          color: params.value ? "#059669" : "#b91c1c",
          fontWeight: 500,
          width: "80px",
          justifyContent: "center",
        }}
      />
    ),
  },
  {
    field: "actions",
    headerName: "Action",
    flex: 1,
    align: "center",
    headerAlign: "center",
    sortable: false,
    filterable: false,
    renderCell: () => (
      <Box
        sx={{
          display: "flex",
          gap: 4,
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <Button
          variant="contained"
          sx={{ backgroundColor: "blue", textTransform: "none" }}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: "red", textTransform: "none" }}
        >
          Delete
        </Button>
      </Box>
    ),
  },
];

const rows = [
  { id: 1, studentName: "Student 1", email: "123@gmail.com", status: true },
  { id: 2, studentName: "Student 2", email: "123@gmail.com", status: false },
  { id: 3, studentName: "Student 3", email: "123@gmail.com", status: true },
  { id: 4, studentName: "Student 4", email: "123@gmail.com", status: true },
];

const paginationModel = { page: 0, pageSize: 5 };

export function LessonPage() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box
      sx={{
        p: 4,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h5" mb={3}>
        Manage lessons
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
          {rows.length} {rows.length === 1 ? "student" : "students"}
        </Typography>
        <Box display="flex" gap={2}>
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            onClick={handleOpen}
          >
            Add student
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
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection={false}
        disableRowSelectionOnClick
      />
      <AddStudentModal open={open} handleClose={handleClose} />
    </Box>
  );
}
