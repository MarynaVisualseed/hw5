import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import { useTranslation } from "react-i18next";

const CreateTask = ({ modal, toggle, save }) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [t] = useTranslation();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "taskName") {
      setTaskName(value);
    } else {
      setDescription(value);
    }
  };

  const handleSave = () => {
    let taskObj = {};
    taskObj["Name"] = taskName;
    taskObj["Description"] = description;
    save(taskObj);
  };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        <div>{t("createTask")}</div>
      </ModalHeader>
      <ModalBody>
        <form>
          <div className="form-group">
            <label>{t("taskName")}</label>
            <input
              type="text"
              className="form-control"
              value={taskName}
              onChange={handleChange}
              name="taskName"
            />
          </div>
          <div className="form-group">
            <label>{t("description")}</label>
            <textarea
              row="5"
              className="form-control"
              value={description}
              onChange={handleChange}
              name="description"
            ></textarea>
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSave}>
          <div>{t("create")}</div>
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          <div>{t("cancel")}</div>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CreateTask;
