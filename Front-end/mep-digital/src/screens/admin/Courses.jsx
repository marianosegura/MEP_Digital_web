import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DetailCourse from "../../components/admin/DetailCourse";
import List from "../../components/List";
import { updateCoursesAction, selectCourseAction, selectNewCourseAction } from "../../redux/courseReducer";

export default function Courses() {
  const courses = useSelector((state) => state.coursesInfo.courses);
  const dispatch = useDispatch();
  
  const getCourses = () => {
    var myInit = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    var myRequest = new Request(
      "https://desolate-everglades-59280.herokuapp.com/api/courses",
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
        dispatch(updateCoursesAction(json.courses));
      });
  };
  const checkCourses = () => {
    if ( courses.length === 0) {
      getCourses();
    }
  };

  function selectCourse (idCourse) {
    dispatch(selectCourseAction(idCourse))
  }

  function selectNewCourse(){
    dispatch(selectNewCourseAction())
  }

  useEffect(() => {
    checkCourses();
    // eslint-disable-next-line
  },[]);
  return (
    <div className = "courses">
        <List 
        list = {courses} 
        type = "Curso" 
        onChange = {selectCourse}
        onChangeNew = {selectNewCourse}
        admin={true}
        />
        <DetailCourse getCourses = {getCourses}/>
    </div>
  );
}
