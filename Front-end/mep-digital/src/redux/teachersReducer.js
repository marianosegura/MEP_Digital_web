
const initialState = {
    teachers: [],
    selectTeacher: {},
    newFlag: false
  };
  
  export const teachersReducer = (state = initialState, action) => {
    switch (action.type) {
      case "GET_TEACHERS":
        return state;
      case "UPDATE_TEACHERS":
        let newSelectTeacher = {}
        if(state.selectTeacher !== undefined && !state.newFlag){ //if someone is selected and not a new teacher
          newSelectTeacher = action.data.teachers.find(teacher => teacher.id === state.selectTeacher.id) //updte selected
        }
        return {
          ...state,
          newFlag:false,
          teachers: action.data.teachers,
          selectTeacher: newSelectTeacher
        };
      case "SELECT_TEACHER":
        return{
          ...state,
          newFlag:false,
          selectTeacher: state.teachers.find(teacher => teacher.id === action.data.idTeacher)
        }
      case "SELECT_NEW_TEACHER":
        return{
          ...state,
          newFlag:true,
          selectTeacher:{
            name:"",
            id:"",
            lastname:"",
            ratings:[],
            email:""
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
  export function updateTeachersAction(teachers) {
    let data = { teachers: teachers };
    return createAction(data, "UPDATE_TEACHERS");
  }
  export function selectTeacherAction(idTeacher){
    return createAction({idTeacher},"SELECT_TEACHER")
  }
  export function selectNewTeacherAction(){
    return createAction({},"SELECT_NEW_TEACHER")
  }