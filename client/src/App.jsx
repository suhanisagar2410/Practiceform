import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
// import { Provider } from 'react-redux';
// import store from './Components/store/store'; 

import "./index.css";
import Header from "./Components/Header/Header";
import FieldDataProvider from "./Components/Context/FieldContextProvider";
import HobbiesDataProvider from "./Components/Context/HobbiesContextProvider";
// import ProtectedRoute from "./Components/protectRoute/ProtectRoute";

const StudentTable = lazy(() => import("./Components/Table/StudentTable"));
// const Signup = lazy(() => import("./Components/pages/Signup"));
const StudentForm = lazy(() => import("./Components/StudentForm"));
// const Login = lazy(() => import('./Components/pages/Login'));

function App() {
  return (
    // <Provider store={store}> {/* Wrap with Redux Provider */}
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
          <FieldDataProvider>
            <HobbiesDataProvider>
              <Routes>
                {/* <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} /> */}
                {/* <Route element={<ProtectedRoute />}> */}

                <Route path="/" element={<StudentTable />} />
                <Route path="/student-form" element={<StudentForm />} />
                <Route path="/student-form/:id" element={<StudentForm />} />
                {/* </Route> */}
              </Routes>
            </HobbiesDataProvider>
          </FieldDataProvider>
        </Suspense>
      </BrowserRouter>
    // </Provider>
  );
}

export default App;
