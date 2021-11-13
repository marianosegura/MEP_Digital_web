import React from 'react'
import { useSelector } from 'react-redux'
import ListCourses from './ListCourses'
import StudentBasiInfo from './StudentBasiInfo'

export default function DetailStudent(props) {
  const selectStudent = useSelector(state => state.studentsInfo.selectStudent)
  return (
    <div className="detailCourse">
      {selectStudent !== undefined ? (
        <div className="detailCourse">
          <StudentBasiInfo getStudents={props.getStudents} />
          <ListCourses type="students" id={selectStudent.id}/>
        </div>
      ) : (
        <p>Selecciona un profesor o crea uno !</p>
      )}
    </div>
  )
}
