import { Route, Routes } from "react-router";
import NavBar from "./components/NavBar";
import Courses from "./screens/admin/Courses";
import Students from "./screens/admin/Students";
import Teachers from "./screens/admin/Teachers";
import Login from "./screens/Login";
import Password from "./screens/Password";
import Student from "./screens/Student";
import Teacher from "./screens/Teacher";

function App() {
  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="student" element={<Student/>} />
        <Route path="teacher" element={<Teacher/>} />
        <Route path="teachers" element={<Teachers/>} />
        <Route path="students" element={<Students/>} />
        <Route path="courses" element={<Courses/>} />
        <Route path="password" element={<Password/>} />
      </Routes>
    </div>
  );
}

export default App;
