import React from 'react'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import Rating from './Rating'
export default function Qualification() {
  const newFlag = useSelector(state => state.teachersInfo.newFlag)
  const selectTeacher = useSelector(state => state.teachersInfo.selectTeacher)
  const [ratings] = useState(selectTeacher.ratings)

  const getRating = () => {
    if(ratings !== undefined &&ratings.length > 0){
      let sumRating = 0
      ratings.forEach(rating => {
        sumRating += rating.rating
      });
      return sumRating/ratings.length
    } else {
      return 0
    }
    
  }

  return (
    <div>
      {!newFlag && (
        <div className="schedule">
          <p>Calificaciones</p>
          <p>Promedio: {getRating()}</p>
          {ratings !== undefined && ratings.length > 0 ? (
            ratings.map((rate) => {
              return (
                <Rating
                name={rate.student.name}
                lastname={rate.student.lastname}
                rating={rate.raating}
                />
              );
            })
          ) : (
            <p>El profesor no ha sido calificado</p>
          )}
        </div>
      )}
    </div>
  )
}
