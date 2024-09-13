/* eslint-disable react/prop-types */
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { create, markAbsent, markPresent, remove, update } from './store/reducers/student.slice';

function App() {
  const { students, idTracker } = useSelector(state => state.student);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const handleCreate = () => {
    if (!name) return;
    dispatch(create({id: idTracker, name}))
    setName('');
  }
  return (
    <div className='mt-4'>
      <div className='flex gap-2 mb-4 items-center justify-center border-b-2 pb-4'>
        <input 
          className='outline-none border-2 border-gray-500 p-1 rounded'
          placeholder='Student name' 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <button className='px-2 py-1 bg-blue-400 rounded' onClick={handleCreate}>Create Student</button>
      </div>
      <div  className='grid grid-cols-3 gap-4 w-full p-4'>
        <div>
          <h2 className='text-xl font-semibold text-center'>Student List</h2>
          {
            !!students.length && students.map((s) => (
              <div key={s.id} className='flex gap-2'>
                <StudentField student={s} />
              </div>
            ))
          }
        </div>
        <div>
          <h2 className='text-xl font-semibold text-center'>Present List</h2>
          {!!students.length 
            && students
              .filter((s) => s.attendance === 'present')
              .map((s) => (
                <div key={s.id} className='flex gap-2'>
                  <StudentField student={s} mode="present" />
                </div> 
              )
            )
          }
        </div>
        <div>
          <h2 className='text-xl font-semibold text-center'>Absent List</h2>
          {!!students.length 
            && students
              .filter((s) => s.attendance === 'absent')
              .map((s) => (
                <div key={s.id} className='flex gap-2'>
                  <StudentField student={s} mode="absent" />
                </div>
              )
            )
          }
        </div>
      </div>
    </div>
  )
}

function StudentField({student, mode = "all"}) {
  // mode = "all" | "present" | "absent";
  const { students } = useSelector(state => state.student);
  const studentInfo = students.find((s) => s.id === student.id);

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("")

  const enableEdit = () => {
    setName(studentInfo.name);
    setOpen(true);
  }

  const handleUpdate = () => {
    if (open) {
      if (!name) return;
      dispatch(update({ id: student.id, name }));
    }
    setName(studentInfo.name)
    setOpen(false);
  }

  const handleCancel = () => {
    setName(student.name);
    setOpen(false);
  }

  const handleRemove = () => {
    dispatch(remove({ id: student.id }));
  }

  const handlePresent = () => {
    dispatch(markPresent({ id: student.id }))
  }

  const handleAbsent = () => {
    dispatch(markAbsent({ id: student.id }))
  }


  return (
    <div className='flex gap-2 p-2 border-2 rounded mb-1 w-full items-center justify-between'>
      {!open && (
        <span className='border-2 border-transparent p-1'>{studentInfo.name}</span>
      )}
      {open && (
        <input 
          className='outline-none border-2 disabled:border-transparent border-gray-500 p-1 rounded bg-transparent w-full'
          value={name}
          disabled={!open}
          placeholder='Student name'
          onChange={(e) => setName(e.target.value.trim())} 
        />
      )}
      <div className='flex gap-2'>
        {!open && <button className='px-2 py-1 bg-blue-400 rounded' onClick={enableEdit}>Update</button>}
        {open && (
          <div className='flex'>
            <button className='px-3 py-1 bg-green-400 rounded-l' onClick={handleUpdate}>Y</button>
            <button className='px-3 py-1 bg-red-400 rounded-r' onClick={handleCancel}>N</button>
          </div>
        )}
        <button className='px-2 py-1 bg-blue-400 rounded' onClick={handleRemove}>Delete</button>
        {mode === "present" && <button className='px-2 py-1 bg-blue-400 rounded' onClick={handleAbsent}>Absent</button>}
        {mode === "absent" && <button className='px-2 py-1 bg-blue-400 rounded' onClick={handlePresent}>Present</button>}
        {mode === "all" && (
          <>
            <button className={`px-2 py-1 bg-blue-400 rounded ${studentInfo.attendance === 'present' ? 'ring-2 ring-offset-2 ring-green-600' : null}`} onClick={handlePresent}>Present</button>
            <button className={`px-2 py-1 bg-blue-400 rounded ${studentInfo.attendance === 'absent' ? 'ring-2 ring-offset-2 ring-red-600' : null}`} onClick={handleAbsent}>Absent</button>
          </>
        )}
      </div>
    </div>
  );
}

export default App
