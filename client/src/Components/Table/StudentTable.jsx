import React, { useContext, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Container,
  IconButton,
//   TextField,
//   Box,
//   InputAdornment,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { hobbiesContext } from "../Context/HobbiesContextProvider";
// import { FieldContext } from "../Context/FieldContextProvider";
import StudentPopup from "./StudentPopup";

const TableComponent = () => {

    // const fieldData = useContext(FieldContext);
    // const hobbiesData = useContext(hobbiesContext);
  const [rows, setRows] = useState([]);
  //   const [filteredRows, setFilteredRows] = useState([]);
  const [loading, setLoading] = useState(true);
  //   const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  //for popup
//   const [popupOpen, setPopupOpen] = useState(false);
//   const [selectedStudent, setSelectedStudent] = useState(null);

  //for the dropdowns
//   const [selectedGender, setSelectedGender] = useState("");
//   const [selectedHobby, setSelectedHobby] = useState("");
//   const [selectedField, setSelectedField] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const apiBaseUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL;
        //for the dropdown
        // const params = {};
        // if (selectedGender) params.gender = selectedGender;
        // if (selectedHobby) params.hobby = selectedHobby;
        // if (selectedField) params.field = selectedField;
        // const response = await axios.get(
        //   `${apiBaseUrl}/api/student/list-student`,
        //   { params }
        // );
                const response = await axios.get(
          `${apiBaseUrl}/api/student/list-student`,
          
        );
        const data = response.data.students;

        if (Array.isArray(data)) {
          const formattedData = data.map((user) => ({
            id: user._id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            phone: user.phone,
            gender: user.gender,
            hobbies: user.hobbies,
            field: user.field,
            joiningDate: user.joining_date,
            address: user.address,
            image: user.image,
          }));
          setRows(formattedData);
          //   setFilteredRows(formattedData);
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);
  //for the dropdown
// }, [selectedGender, selectedHobby, selectedField]);

  //   useEffect(() => {

  //     const lowercasedQuery = searchQuery.toLowerCase();
  //     const filtered = rows.filter((row) =>
  //       Object.values(row).some(
  //         (value) =>
  //           typeof value === "string" &&
  //           value.toLowerCase().includes(lowercasedQuery)
  //       )
  //     );
  //     setFilteredRows(filtered);
  //   }, [searchQuery, rows]);

  const handleEdit = (id) => {
    navigate(`/student-form/${id}`, { state: { id: id } });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Do you really want to delete the data?");
    if (!confirmed) return;

    try {
      const apiBaseUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL;
      await axios.delete(`${apiBaseUrl}/api/student/delete-student/${id}`);
      setRows(rows.filter((row) => row.id !== id));
      //   setFilteredRows(filteredRows.filter((row) => row.id !== id));
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };
//   const handleView = async (id) => {
//     try {
//       const apiBaseUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL;
//       const response = await axios.get(`${apiBaseUrl}/api/student/get-student-by-id/${id}`);
//       setSelectedStudent(response.data.student);
//       setPopupOpen(true);
//     } catch (error) {
//       console.error("Error fetching student data:", error);
//     }
//   };

//   const handleClosePopup = () => {
//     setPopupOpen(false);
//     setSelectedStudent(null);
//   };

  const columns = [
    { field: "firstName", headerName: "First Name", width: 150 },
    { field: "lastName", headerName: "Last Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "gender", headerName: "Gender", width: 120 },
    { field: "address", headerName: "Address", width: 200 },
    { field: "field", headerName: "Field", width: 150 },
    { field: "hobbies", headerName: "Hobbies", width: 200 },
    { field: "joiningDate", headerName: "Joining Date", width: 150 },
    {
      field: "image",
      headerName: "Image",
      width: 150,
      renderCell: (params) => (
        <img
          src={`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/images/${
            params.value
          }`}
          alt="Student"
          style={{ maxWidth: "100px", maxHeight: "100px" }}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <div>
          <IconButton color="primary" onClick={() => handleEdit(params.id)}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={() => handleDelete(params.id)}>
            <DeleteIcon />
          </IconButton>
          {/* <IconButton color="info" onClick={() => handleView(params.id)}>
            <VisibilityIcon />
          </IconButton> */}
        </div>
      ),
    },
  ];

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginTop: "3rem",
      }}
    >
      {/* <Box mb={2} sx={{ width: '100%' }}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box> */}
      {/* for the dropdowns */}
      {/* <Box mb={2} sx={{ width: '100%' }}>
        <FormControl fullWidth variant="outlined" sx={{ marginBottom: '1rem' }}>
          <InputLabel>Gender</InputLabel>
          <Select
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
            label="Gender"
          >
            <MenuItem value="">All Genders</MenuItem>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth variant="outlined" sx={{ marginBottom: '1rem' }}>
          <InputLabel>Hobby</InputLabel>
          <Select
            value={selectedHobby}
            onChange={(e) => setSelectedHobby(e.target.value)}
            label="Hobby"
          >
            <MenuItem value="">All Hobbies</MenuItem>
            {hobbiesData.map(hobby => (
              <MenuItem key={hobby.id} value={hobby.name}>{hobby.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth variant="outlined">
          <InputLabel>Field</InputLabel>
          <Select
            value={selectedField}
            onChange={(e) => setSelectedField(e.target.value)}
            label="Field"
          >
            <MenuItem value="">All Fields</MenuItem>
            {fieldData.map(field => (
              <MenuItem key={field.id} value={field.name}>{field.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box> */}

      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
        //   rows={filteredRows}
        rows={rows}
          columns={columns}
          pageSize={5}
          loading={loading}
        />
      </div>
      {/* <StudentPopup
        open={popupOpen}
        onClose={handleClosePopup}
        student={selectedStudent}
      /> */}
    </Container>
    
  );
};

export default TableComponent;
