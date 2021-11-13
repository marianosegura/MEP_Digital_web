import React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import CourseItem from "./CourseItem";
export default function ListCourses(props) {
  const newFlag = useSelector((state) => state.teachersInfo.newFlag);
  const [courses, setCourses] = useState([]);
  const getCourses = () => {
    var myInit = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    let params = ""
    if(props.type === "teachers"){
      params = new URLSearchParams({
        "teacherId":props.id
      })
    } else { //if students
      params = new URLSearchParams({
        "studentId":props.id
      })
    }
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
        setCourses(json.courses)
      })
      .catch((error) => {
        alert(JSON.parse(error.message).message);
      });
  };
  useEffect(() => {
    getCourses();//need if 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      {!newFlag && (
        <div className="schedule">
          <p>Lista de cursos</p>
          {courses !== undefined && courses.length > 0 ? (
            courses.map((course) => {
              return (
                <CourseItem name={course.name} id={course.id} key={course.id} />
              );
            })
          ) : (
            <p>No hay cursos registrados</p>
          )}
        </div>
      )}
    </div>
  );
}
