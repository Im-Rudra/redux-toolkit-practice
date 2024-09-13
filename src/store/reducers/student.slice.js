import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  /* single student structure
  {
    id: Number,
    name: String,
    attendance?: String, "present" | "absent" | null;
  }
  */
  students: [],
  idTracker: 1,
}

export const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    create: (state, action) => {
      const { payload } = action;
      if (payload.name) {
        state.students = [
          ...state.students,
          { id: state.idTracker, name: payload.name }
        ];
        state.idTracker = state.idTracker + 1;
      }
    },
    remove: (state, action) => {
      const { payload } = action;
      if (payload.id) {
        const newStudentList = state.students.filter((s) => s.id !== payload.id);
        state.students = newStudentList;
      }
    },
    update: (state, action) => {
      const { payload } = action;
      if (payload.id && payload.name) {
        const newStudentList = state.students.map((student) => {
          if (student.id === payload.id) {
            const newStudent = {
              ...student,
              name: payload.name
            };
            return newStudent;
          }
          return student;
        });
        state.students = newStudentList;
      }
    },
    markPresent: (state, action) => {
      const { payload } = action;
      if (payload.id) {
        const newList = state.students.map((student) => {
          if (student.id === payload.id) {
            const newStudent = {
              ...student,
              attendance: "present"
            }
            return newStudent;
          }
          return student;
        })
        state.students = newList;
      }
    },
    markAbsent: (state, action) => {
      const { payload } = action;
      if (payload.id) {
        const newList = state.students.map((student) => {
          if (student.id === payload.id) {
            const newStudent = {
              ...student,
              attendance: "absent"
            }
            return newStudent;
          }
          return student;
        })
        state.students = newList;
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { 
  create,
  remove,
  update,
  markPresent,
  markAbsent
} = studentSlice.actions;

export default studentSlice.reducer;