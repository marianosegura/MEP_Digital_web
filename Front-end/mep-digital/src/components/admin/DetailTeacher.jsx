import React from 'react'
import { useSelector } from 'react-redux'
import ListCourses from './ListCourses'
import Qualification from './Qualification'
import TeacherBasiInfo from './TeacherBasiInfo'
export default function DetailTeacher(props) {
  const selectTeacher = useSelector(state => state.teachersInfo.selectTeacher)
  return (
    <div className="detailCourse">
      {selectTeacher !== undefined ? (
        <div className="detailCourse">
          <TeacherBasiInfo getTeachers={props.getTeachers} />
          <ListCourses type="teachers" id={selectTeacher.id}/>
          <Qualification/>
        </div>
      ) : (
        <p>Selecciona un profesor o crea uno !</p>
      )}
    </div>
  );
}
