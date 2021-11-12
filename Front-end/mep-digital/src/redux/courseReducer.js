

const initialState = {
  courses: [],
  selectCourse: {}
};

export const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_COURSES":
      return state;
    case "UPDATE_COURSES":
      return {
        ...state,
        courses: action.data.courses,
      };
    case "SELECT_COURSE":
      console.log(state.courses.find(course => course.id === action.data.idCourse))
      return{
        ...state,
        selectCourse: state.courses.find(course => course.id === action.data.idCourse)
      }
    default:
      console.log("No registred action");
      console.log(action);
      return state;
  }
};

export function createAction(data, type) {
  return {
    type: type,
    data: data,
  };
}
export function updateCoursesAction(courses) {
  let data = { courses: courses };
  return createAction(data, "UPDATE_COURSES");
}
export function selectCourseAction(idCourse){
  return createAction({idCourse},"SELECT_COURSE")
}



