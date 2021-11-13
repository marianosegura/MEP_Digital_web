import React from "react";
import List from "../../components/List";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  selectNewstudentAction,
  selectStudentAction,
  updateStudentsAction,
} from "../../redux/studentsReducer";
import DetailStudent from "../../components/admin/DetailStudent";

export default function Students() {
  const students = useSelector((state) => state.studentsInfo.students);
  const dispatch = useDispatch();

  const selectNewStudent = () => {
    dispatch(selectNewstudentAction());
  };
  const selectStudent = (studentId) => {
    dispatch(selectStudentAction(studentId));
  };

  const getStudents = () => {
    var myInit = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    var myRequest = new Request(
      "https://desolate-everglades-59280.herokuapp.com/api/students",
      myInit
    );
    fetch(myRequest)
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .then((json) => {
        dispatch(updateStudentsAction(json.students));
      });
  };
  useEffect(() => {
    getStudents();
    // eslint-disable-next-line
  },[]);
  return (
    <div className="courses">
      <List
        list={students}
        type="Estudiante"
        onChange={selectStudent}
        onChangeNew={selectNewStudent}
      />
      <DetailStudent getStudents={getStudents} />
    </div>
  );
}
