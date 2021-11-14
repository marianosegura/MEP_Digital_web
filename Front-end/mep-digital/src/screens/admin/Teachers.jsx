import React from "react";
import DetailTeacher from "../../components/admin/DetailTeacher";
import List from "../../components/List";
import { selectTeacherAction, selectNewTeacherAction, updateTeachersAction } from "../../redux/teachersReducer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
export default function Teachers() {
  const teachers = useSelector(state => state.teachersInfo.teachers)
  const dispatch = useDispatch()

  const selectNewTeacher = () => {
    dispatch(selectNewTeacherAction())
  }
  const selectTeacher = (teacherId) => {
    dispatch(selectTeacherAction(teacherId))
  }
  const getTeachers = () => {
    var myInit = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    var myRequest = new Request(
      "https://desolate-everglades-59280.herokuapp.com/api/teachers",
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
        dispatch(updateTeachersAction(json.teachers));
      });
  }
  useEffect(() => {
    getTeachers();
    // eslint-disable-next-line
  },[]);
  return (
    <div className="courses">
      <List
        list={teachers}
        type="Profesor"
        onChange={selectTeacher}
        onChangeNew={selectNewTeacher}
        admin={true}
      />
      <DetailTeacher getTeachers={getTeachers}/>
    </div>
  );
}
