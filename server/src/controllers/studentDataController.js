import Student from "../model/studentDataModel.js";
import fs from "fs";

const addStudent = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      gender,
      field,
      address,
      hobbies,
      joiningDate,
    } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({
        message: "Phone number must be 10 digits and contain only numbers.",
      });
    }

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: "Student already exists." });
    }

    const newStudent = new Student({
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      gender,
      field,
      address,
      hobbies: hobbies.split(","),
      joining_date: joiningDate,
      image,
    });
    const imageUrl = `${process.env.BASE_URL}/images/${image}`;
    await newStudent.save();
    res
      .status(201)
      .json({ message: "Student added successfully", student: newStudent });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
// src/controllers/studentDataController.js

// const listStudent = async (req, res) => {
//     try {
//       const { gender, hobby, field } = req.query;
      
//       // Construct the query object based on provided filters
//       let query = {};
      
//       if (gender) {
//         query.gender = gender;
//       }
  
//       if (hobby) {
//         query.hobbies = hobby;
//       }
  
//       if (field) {
//         query.field = field;
//       }
  
//       const students = await Student.find(query);
//       res.status(200).json({ students });
//     } catch (error) {
//       res.status(500).json({ message: "Server error", error });
//     }
//   };
  

const listStudent = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json({ students });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
const deleteOldImage = (imageName) => {
  if (imageName) {
    const imagePath = `D:/C folder/Practice-projects/Practiceform/server/src/images/${imageName}`;

    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error(`Failed to delete old image: ${imagePath}`, err);
      } else {
        console.log(`Old image deleted: ${imagePath}`);
      }
    });
  }
};

const editStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      firstName,
      lastName,
      email,
      phone,
      gender,
      field,
      address,
      hobbies,
      joiningDate,
    } = req.body;

    const newImage = req.file ? req.file.filename : null;

    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({
        message: "Phone number must be 10 digits and contain only numbers.",
      });
    }

    const existingStudent = await Student.findById(id);

    if (!existingStudent) {
      return res.status(404).json({ message: "Student not found." });
    }

    const emailExists = await Student.findOne({ email, _id: { $ne: id } });
    if (emailExists) {
      return res
        .status(400)
        .json({ message: "Email is already in use by another student." });
    }

    const phoneExists = await Student.findOne({ phone, _id: { $ne: id } });
    if (phoneExists) {
      return res.status(400).json({
        message: "Phone number is already in use by another student.",
      });
    }

    if (newImage) {
      deleteOldImage(existingStudent.image);

      existingStudent.image = newImage;
    }

    existingStudent.first_name = firstName || existingStudent.first_name;
    existingStudent.last_name = lastName || existingStudent.last_name;
    existingStudent.email = email || existingStudent.email;
    existingStudent.phone = phone || existingStudent.phone;
    existingStudent.gender = gender || existingStudent.gender;
    existingStudent.field = field || existingStudent.field;
    existingStudent.address = address || existingStudent.address;
    existingStudent.hobbies = hobbies.split(",") || existingStudent.hobbies;
    existingStudent.joining_date = joiningDate || existingStudent.joining_date;

    await existingStudent.save();
    res.status(200).json({
      message: "Student updated successfully",
      student: existingStudent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
  console.count("Hellow");
};
const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }

    res.status(200).json({ student });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
const deleteStudent = async (req, res) => {
    try {
      const { id } = req.params;
      
      
      const student = await Student.findById(id);
      if (!student) {
        return res.status(404).json({ message: "Student not found." });
      }
      
     
      if (student.image) {
        const imagePath = `D:/C folder/Practice-projects/Practiceform/server/src/images/${student.image}`
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error(`Failed to delete image: ${imagePath}`, err);
          } else {
            console.log(`Image deleted: ${imagePath}`);
          }
        });
      }
      
      
      await Student.findByIdAndDelete(id);
      
      res.status(200).json({ message: "Student deleted successfully." });
    } catch (error) {
      console.error("Error deleting student:", error);
      res.status(500).json({ message: "Server error", error });
    }
  };

export { addStudent, listStudent, editStudent, getStudentById , deleteStudent };
