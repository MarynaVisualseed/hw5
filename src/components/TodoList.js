import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "reactstrap";
import CreateTask from "./CreateTask";
import Card from "./Card";

const TodoList = () => {
  const [modal, setModal] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [lightMode, setLightMode] = useState(false);
  const [t, i18n] = useTranslation();

  const toggle = () => {
    setModal(!modal);
  };

  const toggleLightMode = () => {
    setLightMode(!lightMode);
  };

  useEffect(() => {
    let arr = localStorage.getItem("taskList");
    if (arr) {
      let obj = JSON.parse(arr);
      setTaskList(obj);
    }
  }, []);

  const deleteTask = (index) => {
    let tempList = taskList;
    tempList.splice(index, 1);
    localStorage.setItem("taskList", JSON.stringify(tempList));
    setTaskList(tempList);
    window.location.reload();
  };

  const updateListArray = (obj, index) => {
    let tempList = taskList;
    tempList[index] = obj;
    localStorage.setItem("taskList", JSON.stringify(tempList));
    setTaskList(tempList);
    window.location.reload();
  };

  const saveTask = (taskObj) => {
    let tempList = taskList;
    tempList.push(taskObj);
    localStorage.setItem("taskList", JSON.stringify(tempList));
    setTaskList(tempList);
    setModal(false);
  };

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <div className={`App ${lightMode ? "light-mode" : ""}`}>
      <div
        className={`header text-center ${lightMode ? "light-mode-header" : ""}`}
      >
        <h2>{t("todoList")}</h2>
        <div className="language-buttons">
          <button onClick={() => changeLanguage("en")}>EN</button>
          <button onClick={() => changeLanguage("cs")}>CS</button>
        </div>

        <Button
          className={`btn btn-primary ${lightMode ? "light-mode-button" : ""}`}
          onClick={() => setModal(true)}
          style={{ marginRight: "10px" }}
        >
          {t("createTaskList")}
        </Button>
        <Button
          className={`btn btn-primary ${lightMode ? "light-mode-button" : ""}`}
          onClick={toggleLightMode}
        >
          {lightMode ? t("darkMode") : t("lightMode")}
        </Button>
      </div>
      <div
        className={`task-container ${lightMode ? "light-mode-container" : ""}`}
      >
        {taskList.map((obj, index) => (
          <Card
            key={index}
            taskObj={obj}
            index={index}
            deleteTask={deleteTask}
            updateListArray={updateListArray}
          />
        ))}
      </div>
      <CreateTask toggle={toggle} modal={modal} save={saveTask} />
    </div>
  );

  //   return (
  //     <div className={`App ${darkMode ? "dark-mode" : ""}`}>
  //       <div className="header text-center">
  //         <h2>Todo List</h2>
  //         <Button className="btn btn-primary" onClick={() => setModal(true)}>
  //           Create Task List
  //         </Button>
  //         <Button className="btn btn-primary" onClick={toggleDarkMode}>
  //           {darkMode ? "Light Mode" : "Dark Mode"}
  //         </Button>
  //       </div>
  //       <div className="task-container">
  //         {taskList.map((obj, index) => (
  //           <Card
  //             key={index} // Добавляем ключ для каждой карточки
  //             taskObj={obj}
  //             index={index}
  //             deleteTask={deleteTask}
  //             updateListArray={updateListArray}
  //           />
  //         ))}
  //       </div>
  //       <CreateTask toggle={toggle} modal={modal} save={saveTask} />
  //     </div>
  //   );

  //   return (
  //     <>
  //       <div className="header text-center">
  //         <h2>Todo List</h2>
  //         <button className="btn btn-primary" onClick={() => setModal(true)}>
  //           Create Task List
  //         </button>
  //       </div>
  //       <div className="task-container">
  //         {taskList &&
  //           taskList.map((obj, index) => (
  //             <Card
  //               taskObj={obj}
  //               index={index}
  //               deleteTask={deleteTask}
  //               updateListArray={updateListArray}
  //             />
  //           ))}
  //       </div>
  //       <CreateTask toggle={toggle} modal={modal} save={saveTask} />
  //     </>
  //   );
};

export default TodoList;
