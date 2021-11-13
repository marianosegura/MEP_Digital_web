
const initialState = {
  students: [],
  selectStudent: {},
  newFlag: false
};

export const studentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_studentS":
      return state;
    case "UPDATE_studentS":
      let newselectStudent = {}
      if(state.selectStudent !== undefined && !state.newFlag){ //if someone is selected and not a new student
        newselectStudent = action.data.students.find(student => student.id === state.selectStudent.id) //updte selected
      }
      return {
        ...state,
        newFlag:false,
        students: action.data.students,
        selectStudent: newselectStudent
      };
    case "SELECT_student":
      return{
        ...state,
        newFlag:false,
        selectStudent: state.students.find(student => student.id === action.data.idStudent)
      }
    case "SELECT_NEW_student":
      return{
        ...state,
        newFlag:true,
        selectStudent:{
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
export function updateStudentsAction(students) {
  let data = { students: students };
  return createAction(data, "UPDATE_studentS");
}
export function selectStudentAction(idStudent){
  return createAction({idStudent},"SELECT_student")
}
export function selectNewstudentAction(){
  return createAction({},"SELECT_NEW_student")
}