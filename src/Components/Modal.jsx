import React from "react";

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal d-block" : "modal d-none";

  return (
    <div className={showHideClassName}>
      <div className="modal-container">
        <a href="javascript:;" className="modal-close" onClick={handleClose}>
          close
            </a>

            <div className="table-wrapper">
        <table className="fl-table">
          <tr>
            <th>Candidate</th>
            <th>Exam</th>
            <th>Grade</th>
            <th>DateModified</th>
          </tr>
          {children}
        </table>
</div>
      </div>
    </div>
  );


};

export default Modal;