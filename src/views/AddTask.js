import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Wrapper from "../components/Wrapper";

const AddTask = ({updateTask}) => {

  const [taskName, setTaskName] = useState('')

  const handleAddTask = () => {
    updateTask(taskName)
    setTaskName('')
  }


  return (
    <Wrapper>
      <div className="task-wrapper">
        <Input setTaskNameFunc={setTaskName} value={taskName}/>
        <Button labelText="Add Task" handleClick={handleAddTask}/>
      </div>
    </Wrapper>
  );
};

export default AddTask;
