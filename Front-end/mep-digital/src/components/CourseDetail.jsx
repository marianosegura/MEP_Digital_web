import React from 'react'
import { useSelector } from 'react-redux'
import Assignments from './Assignments'
import Chat from './Chat'
import News from './News'
import RatingTeacher from './student/RatingTeacher'
import StudentList from './teacher/StudentList'
export default function CourseDetail(props) {
  const selectCourse = useSelector(state => state.coursesInfo.selectCourse)
  const type = useSelector(state => state.userInfo.type)
  return (
    <div className="detailCourse">
      {selectCourse !== undefined && (
        <div className="detailCourse">
          <News getCourses={props.getCourses}/>
          <Assignments getCourses={props.getCourses}/>
          <Chat getCourses={props.getCourses}/>
          {type === "teacher" && (
            <StudentList/>
          )}
          {type === "student" && (
            <RatingTeacher/>
          )}
        </div>
      )}
    </div>
  )
}
