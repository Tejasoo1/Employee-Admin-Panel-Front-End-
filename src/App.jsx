/*
-------------------------------------------------------------------------------------------------------------
npm i --> install all the npm packages 
npm install vite-plugin-eslint --save-dev
npm i axios  
npm install react-router-dom
npm install react-hook-form
npm install styled-components
npm install react-hot-toast
npm install js-cookie

*/

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { lazy, Suspense } from "react";
import Dashboard from "./ui/Dashboard";
import ProtectedRoute from "./ui/ProtectedRoute";
import EmployeeList from "./features/employees/EmployeeList";
import CreateEmployeeForm from "./features/employees/CreateEmployeeForm";
import EmployeeProvider from "./features/employees/context/EmployeeProvider";
import SpinnerFullPage from "./ui/SpinnerFullPage";
// import Login from "./features/admin/Login";
// import AppLayout from "./ui/AppLayout";
// import PageNotFound from "./ui/PageNotFound";

const Login = lazy(() => import("./features/admin/Login"));
const AppLayout = lazy(() => import("./ui/AppLayout"));
const PageNotFound = lazy(() => import("./ui/PageNotFound"));

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<SpinnerFullPage />}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/app"
              element={
                <>
                  <EmployeeProvider>
                    <ProtectedRoute>
                      <AppLayout />
                    </ProtectedRoute>
                  </EmployeeProvider>
                </>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="employeelist" element={<EmployeeList />} />
              <Route
                path="createemployeeform"
                element={<CreateEmployeeForm />}
              />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
            style: {
              backgroundColor: "green",
              color: "white",
            },
          },
          error: {
            duration: 5000,
            style: {
              backgroundColor: "red",
              color: "white",
            },
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            cursor: "pointer",
          },
        }}
      />
    </>
  );
}

export default App;
