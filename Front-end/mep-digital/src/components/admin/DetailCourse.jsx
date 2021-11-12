import React from "react";
import { useSelector } from "react-redux";
import CourseBasiInfo from "./CourseBasiInfo";
import Schedule from "./Schedule";

export default function DetailCourse(props) {
  const selectCourse = useSelector((state) => state.coursesInfo.selectCourse);
  const newFlag = useSelector((state) => state.coursesInfo.newFlag);
  return (
    <div className="detailCourse">
      {selectCourse.name !== undefined ? (
        <div className="detailCourse">
          <CourseBasiInfo
            name={selectCourse.name}
            id={selectCourse.id}
            grade={selectCourse.grade}
            new={newFlag}
            getCourses={props.getCourses}
          />
          <Schedule 
          schedule={selectCourse.schedule}
          getCourses={props.getCourses}
          courseId={selectCourse.id}
          new={newFlag}
          />
        </div>
      ) : (
        <h1>Selecciona un curso o crea uno nuevo</h1>
      )}
    </div>
  );
}
