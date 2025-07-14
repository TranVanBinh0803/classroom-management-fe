import { Box, Typography, Avatar, Chip, Button } from "@mui/material";
import { useState } from "react";
import { useGetMyLessons } from "./api/useGetMyLessons";
import { useAtomValue } from "jotai";
import { user } from "~/atoms/AuthAtoms";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ViewDetailLessonModal } from "./components/ViewDetailLessonModal";

const paginationModel = { page: 0, pageSize: 5 };

export function TaskPage() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedLesson, setSelectedLesson] = useState<any | null>(null);

  const getUser = useAtomValue(user);
  const userId = getUser?.id || "";
  const { data: response } = useGetMyLessons(userId);
  const myLessonRows = response?.data
    ? Object.entries(response.data).map(([id, lesson]: [string, any]) => ({
        id,
        ...lesson,
      }))
    : [];
  console.log("myLessonRows:", myLessonRows);

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
      field: "isCompleted",
      headerName: "Status",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Chip
          label={params.value ? "Completed" : "InCommpleted"}
          sx={{
            backgroundColor: params.value ? "#d1fae5" : "#fee2e2",
            color: params.value ? "green" : "red",
            fontWeight: 500,
            width: "150px",
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
      renderCell: (params) => {
        const handleViewDetail = () => {
          setSelectedLesson(params.row);
          setOpen(true);
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
              onClick={handleViewDetail}
            >
              View
            </Button>
          </Box>
        );
      },
    },
  ];

  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <Typography>Tasks</Typography>
      <DataGrid
        sx={{
          width: "100%",
        }}
        rows={myLessonRows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection={false}
        disableRowSelectionOnClick
      />
      <ViewDetailLessonModal
        open={open}
        handleClose={() => {
          setSelectedLesson(null);
          handleClose();
        }}
        lesson={selectedLesson}
      />
    </Box>
  );
}
