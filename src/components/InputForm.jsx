import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { randomIdGenerator } from "/src/utility/randomIdGenerator";

const initialTaskObj = {
  task: "",
  hour: "",
  taskType: "entry",
};
const InputForm = (props) => {
  const { addTask } = props;

  const [taskObj, setTaskObj] = useState(initialTaskObj);

  const handleOnchange = (e) => {
    const keyToUpdate = e.target.name;
    setTaskObj({
      ...taskObj,
      [keyToUpdate]: e.target.value,
    });
  };

  const handleOnsubmit = (e) => {
    e.preventDefault();
    addTask({ ...taskObj, taskID: randomIdGenerator() });
    // randomIdGenerator();

    setTaskObj(initialTaskObj);

    // const newObj = [...taskArray, taskObj];
  };

  return (
    <div>
      <Form onSubmit={handleOnsubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            name="task"
            value={taskObj.task}
            onChange={handleOnchange}
            placeholder="Enter the Task "
            maxLength={100}
            minLength={2}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="number"
            name="hour"
            value={taskObj.hour}
            onChange={handleOnchange}
            placeholder="Enter hours"
            max={24}
            min={1}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add to List
        </Button>{" "}
      </Form>
    </div>
  );
};

export default InputForm;
