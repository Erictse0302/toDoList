import './App.css';
import React, { Fragment, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  faCircleCheck, faPen, faTrashCan
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



function App() {

/*   useEffect(() => {
    // 👇 add class to body element
    document.body.classList.add('bg-salmon');
  }, []); */


  // Tasls {ToDo List} State
  const [toDo, setTodo] = useState([
    { 'id': 1, 'title': 'Task 1', 'status': false },
    { 'id': 2, 'title': 'Task 2', 'status': false }
  ]);

  // Temp State

  const [newTask, setNewTask] = useState('');
  const [updateData, setUpdateData] = useState('');

  //Add Task
  const addTask = () => {
    if (newTask) {
      let num = toDo.length + 1;
      let newEntry = { id: num, title: newTask, status: false }
      setTodo([...toDo, newEntry])
      setNewTask('')
    }

  };

  //Delete Task
  const deleteTask = (id) => {
    let newTasks = toDo.filter(task => task.id !== id)
    setTodo(newTasks)
  };


  //Mark Task as Done
  const markDone = (id) => {
    let newTasks = toDo.map(task => {
      if (task.id === id) {
        return ({ ...task, status: !task.status })
      }
      return task;
    })

    setTodo(newTasks);
  };



  //Cancel Update
  const cancelUpdate = () => {
    setUpdateData('');


  };


  //Change Task
  const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false
    }
    setUpdateData(newEntry);
  };


  //Update Task
  const updateTask = () => {
    let filterRecords = [...toDo].filter(task => task.id !== updateData.id);
    let updateDataOject = [...filterRecords, updateData]
    setTodo(updateDataOject);
    setUpdateData('');
  };




  return (
    
      <div className="container App">
        <br></br>
        <h2>To Do List</h2>
        <br></br>


        {/* Update Task */}
        {updateData && updateData ? (
          <>
            <div className='row'>
              <div className='col'>
                <input value={updateData && updateData.title}
                  onChange={(e) => changeTask(e)}
                  className='from-control from-control-lg' />
              </div>
              <div className='col-auto'>

                <button

                  onClick={updateTask}

                  className='btn btn-lg btn-success mr-20'>
                  Update</button>
                <button onClick={cancelUpdate}

                  className='btn btn-lg btn-warning'>
                  Cancel
                </button>
              </div>

            </div>
          </>
        ) :

          (
            <>
              {/* Add task */}
              <div className='row'>
                <div className='col'>
                  <input value={newTask} onChange={(e) => setNewTask(e.target.value)} className='from-control from-control-lg' />
                </div>
                <div className='col-auto'>
                  <button
                    onClick={addTask}
                    className='btn btn-lg btn-success'
                  > addTask
                  </button>
                </div>
              </div>
            </>
          )}









        {/* Display ToDos */}

        {toDo && toDo.length ? '' : 'No Task....'}

        {toDo && toDo

          .sort((a, b) => a.id > b.id ? 1 : -1)
          .map((task, index) => {
            return (<React.Fragment key={task.id}>

              <div className="col taskBg">
                <div className={task.status ? 'done' : ''}>

                  <span className="taskNumber" > {index + 1} </span>
                  <span className="taskText" > {task.title} </span>
                </div>
                <div className='iconsWrap'>
                  <span title='Compeleted . Not Compeleted' onClick={() => markDone(task.id)}>
                    <FontAwesomeIcon icon={faCircleCheck} />
                  </span>

                  {task.status ? null :
                    (<span title='Edit' onClick={() => setUpdateData({
                      id: task.id,
                      title: task.title,
                      status: task.status ? true : false
                    })} >
                      <FontAwesomeIcon icon={faPen} />
                    </span>)}
                  <span title='Delete' onClick={() => deleteTask(task.id)}>
                    <FontAwesomeIcon icon={faTrashCan} />

                  </span>

                </div>

              </div>




            </React.Fragment>)

          })}

      </div>
   
  )
}

export default App;
