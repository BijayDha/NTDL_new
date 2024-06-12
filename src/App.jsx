import {
  Button,
  Col,
  Container,
  ListGroup,
  Row,
  Stack,
  Table,
} from "react-bootstrap";
import Title from "./components/Title";
import "bootstrap/dist/css/bootstrap.min.css";
import InputForm from "./components/InputForm";
import { useEffect, useState } from "react";

import { BsArrowRightSquareFill } from "react-icons/bs";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";

function App() {
  const [taskArray, setTaskArray] = useState([]);

  const [isUnwantedAvailable, setIsUnwantedAvailable] = useState(false);

  useEffect(() => {
    const unWantedobjCheck = taskArray.some(
      (task) => task.taskType === "unwanted"
    );
    setIsUnwantedAvailable(unWantedobjCheck);
    console.log("unWantedobjCheck", unWantedobjCheck);
  }, [taskArray]);

  // const [unWantedTaskArray, setUnWantedTaskArray] = useState([]);

  // Load initial tasks from local storage
  useEffect(() => {
    const storedTasks = localStorage.getItem("taskArray");
    if (storedTasks) {
      // console.log("parse items", JSON.parse(storedTasks));
      setTaskArray(JSON.parse(storedTasks));
    }
  }, []);

  const addTask = (task) => {
    const checkExistingTaskName = taskArray.some(
      (existingTask) => existingTask.task === task.task
    );
    console.log("checkExistingTaskName", checkExistingTaskName);
    if (!checkExistingTaskName) {
      const updatedTaskArray = [...taskArray, task];
      setTaskArray(updatedTaskArray);
      localStorage.setItem("taskArray", JSON.stringify(updatedTaskArray));
    } else {
      alert("Task already exists");
    }
  };
  // console.log("isUnwantedAvailable", isUnwantedAvailable);

  const totalHours = taskArray.reduce((acc, curr) => {
    return acc + Number(curr.hour);
  }, 0);

  const totalUnwantedTaskHours = taskArray.reduce((acc, curr) => {
    if (curr.taskType === "unwanted") {
      return acc + Number(curr.hour);
    }
    return acc;
  }, 0);
  // console.log(totalUnwantedTaskHours);

  const handleMoveClick = (taskid) => {
    const updatedTaskArray = taskArray.map((task) => {
      if (task.taskID === taskid) {
        return {
          ...task,
          taskType: task.taskType === "entry" ? "unwanted" : "entry",
        };
      }
      return task;
    });

    setTaskArray(updatedTaskArray);
    localStorage.setItem("taskArray", JSON.stringify(updatedTaskArray));
  };

  const handleDeleteClick = (taskid) => {
    const afterDeletedTaskArray = taskArray.filter((task) => {
      return task.taskID !== taskid;
    });
    setTaskArray(afterDeletedTaskArray);
    localStorage.setItem("taskArray", JSON.stringify(afterDeletedTaskArray));
  };
  // console.log(taskArray);
  return (
    <>
      <Container className="mt-4">
        <div className="bg-secondary-subtle border-success  mt-4 d-flex justify-content-center">
          <Title />
        </div>

        <Stack className=" mx-5 my-5">
          <InputForm addTask={addTask} />
        </Stack>

        <Stack>
          <Row>
            {taskArray.length > 0 && (
              <Col>
                <h1>All list</h1>

                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Task</th>
                      <th>Time Taken</th>
                      <th>Move/Del</th>
                    </tr>
                  </thead>
                  <tbody>
                    {taskArray.map((task, index) => {
                      if (task.taskType === "entry") {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{task.task}</td>
                            <td>{task.hour}</td>
                            <td>
                              <button
                                onClick={() => handleMoveClick(task.taskID)}
                              >
                                <FaArrowAltCircleRight />
                              </button>
                              <button>
                                <FaRegTrashAlt
                                  onClick={() => handleDeleteClick(task.taskID)}
                                />
                              </button>
                            </td>
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                </Table>
              </Col>
            )}
            {isUnwantedAvailable && (
              <Col>
                <h1>Unwanted List</h1>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Task</th>
                      <th>Time Taken</th>
                      <th>Move/Del</th>
                    </tr>
                  </thead>
                  <tbody>
                    {taskArray.map((task, index) => {
                      if (task.taskType === "unwanted") {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{task.task}</td>
                            <td>{task.hour}</td>
                            <td>
                              <button
                                onClick={() => handleMoveClick(task.taskID)}
                              >
                                <FaArrowAltCircleLeft />
                              </button>
                              <button>
                                <FaRegTrashAlt
                                  onClick={() => handleDeleteClick(task.taskID)}
                                />
                              </button>
                            </td>
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                </Table>
              </Col>
            )}
          </Row>
          {taskArray.length > 0 && (
            <Row>
              <Col>Total task Hours = {totalHours}</Col>
              <Col>Confused time = {totalHours - totalUnwantedTaskHours}</Col>
              <Col> You could have save = {totalUnwantedTaskHours}</Col>
            </Row>
          )}
        </Stack>
      </Container>
    </>
  );
}

export default App;
