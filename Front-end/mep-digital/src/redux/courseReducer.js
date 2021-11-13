

const initialState = {
  courses: [],
  selectCourse: {},
  newFlag: false
};

export const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_COURSES":
      return state;
    case "UPDATE_COURSES":
      let newSelectCourse = {}
      if(state.selectCourse !== undefined && !state.newFlag){ //if someone is selected and not a new course
        newSelectCourse = action.data.courses.find(course => course.id === state.selectCourse.id) //updte selected
      }
      return {
        ...state,
        newFlag:false,
        courses: action.data.courses,
        selectCourse: newSelectCourse
      };
    case "SELECT_COURSE":
      return{
        ...state,
        newFlag:false,
        selectCourse: state.courses.find(course => course.id === action.data.idCourse)
      }
    case "SELECT_NEW_COURSE":
      return{
        ...state,
        newFlag:true,
        selectCourse:{
          name:"",
          id:"",
          assignments:[],
          chat:[],
          grade1:-1,
          news: [],
          schedule:[],
          students:[],
          teacher:{}
        }
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
export function selectNewCourseAction(idCourse){
  return createAction({},"SELECT_NEW_COURSE")
}



