import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCourseAction, selectNewCourseAction, updateCoursesAction } from "../redux/courseReducer";
import List from "../components/List";
import CourseDetail from "../components/CourseDetail";
import { useEffect } from "react";

export default function Teacher() {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.coursesInfo.courses);
  const teacherId = useSelector((state) => state.userInfo.userId);
  const getCourses = () => {
    var myInit = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    let params = new URLSearchParams({
      teacherId: teacherId,
    });
    var myRequest = new Request(
      "https://desolate-everglades-59280.herokuapp.com/api/courses?" + params,
      myInit
    );
    fetch(myRequest)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response.text().then((text) => {
          throw new Error(text);
        });
      })
      .then((json) => {
        dispatch(updateCoursesAction(json.courses));
      })
      .catch((error) => {
        alert(JSON.parse(error.message).message);
      });
  };
  function selectCourse (idCourse) {
    dispatch(selectCourseAction(idCourse))
  }

  function selectNewCourse(){
    dispatch(selectNewCourseAction())
  }

  useEffect(() => {
    getCourses();
    // eslint-disable-next-line
  },[]);

  return (
    <div className="courses">
      <List
        list={courses}
        type="Curso"
        onChange={selectCourse}
        onChangeNew={selectNewCourse}
        admin={false}
      />
      <CourseDetail getCourses={getCourses} />
    </div>
  );
}
