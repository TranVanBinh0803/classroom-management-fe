import { Box, Typography, Button, Chip } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useGetStudents } from "./api/useGetStudents";
import { useDeleteStudent } from "./api/useDeleteStudent";
import { AddStudentModal } from "./components/AddStudentModal";
import { useCreateConversation } from "./api/useCreateConversation";
import { useAtomValue } from "jotai";
import { user } from "~/atoms/AuthAtoms";

const paginationModel = { page: 0, pageSize: 5 };

export function StudentPage() {
  const getUser = useAtomValue(user);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [editingStudent, setEditingStudent] = useState<any | null>(null);

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "phone",
      headerName: "Phone",
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
      field: "address",
      headerName: "Address",
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
            color: params.value ? "green" : "red",
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
      flex: 2,
      align: "center",
      headerAlign: "center",
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        const studentId = params.row.id;
        const deleteStudentMutation = useDeleteStudent(studentId);
        const createConversationMutation = useCreateConversation();

        const handleDelete = () => {
          if (confirm("Are you sure you want to delete this student?")) {
            deleteStudentMutation.mutate();
          }
        };

        const handleEdit = () => {
          setEditingStudent(params.row);
          setOpen(true);
        };

        const handleCreateConversation = () => {
          createConversationMutation.mutate({
            participants: [getUser, params.row],
          });
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
              sx={{ backgroundColor: "green", textTransform: "none" }}
              onClick={handleCreateConversation}
            >
              Chat
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: "blue", textTransform: "none" }}
              onClick={handleEdit}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: "red", textTransform: "none" }}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Box>
        );
      },
    },
  ];
  const { data: response } = useGetStudents();
  const studentRows = response
    ? Object.entries(response).map(([id, student]) => ({
        id,
        name: student.name,
        phone: student.phone,
        email: student.email,
        address: student.address,
        status: !!student.password,
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
        Manage students
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
          {studentRows.length}{" "}
          {studentRows.length === 1 ? "student" : "students"}
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
        rows={studentRows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection={false}
        disableRowSelectionOnClick
      />
      <AddStudentModal
        open={open}
        handleClose={() => {
          setEditingStudent(null);
          handleClose();
        }}
        student={editingStudent}
      />
    </Box>
  );
}
