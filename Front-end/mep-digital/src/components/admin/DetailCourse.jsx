import React from 'react'
import { useSelector } from "react-redux";
import CourseBasiInfo from './CourseBasiInfo';

export default function DetailCourse(props) {
    const selectCourse = useSelector(state => state.coursesInfo.selectCourse)
    const newFlag = useSelector(state => state.coursesInfo.newFlag)
    return (
        <div className = "detailCourse">
        {selectCourse.name !== undefined
        ?
            (
                <CourseBasiInfo
                name = {selectCourse.name}
                id = {selectCourse.id}
                grade = {selectCourse.grade}
                new = {newFlag}
                getCourses = {props.getCourses}
                />

            )
        :
            (
                <h1>Selecciona un curso o crea uno nuevo</h1>
            )
        }
            
        </div>
    )
}
