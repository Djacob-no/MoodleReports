import React from "react";
import SortableTable from "./SortableTable";

const Modal = ({title, handleClose, show, data }) => {
  const showHideClassName = show ? "modal d-block" : "modal d-none";

  if (data){
    return (
      <div className={showHideClassName}>
        <div className="modal-container">
          <a href="javascript:;" className="modal-close" onClick={handleClose}>
            close
              </a>
  <h1>{title}</h1>
              <div className="table-wrapper">
          
              <SortableTable data={data} />
  
          </div>
        </div>
      </div>
    );
  }else return null;
  


};

export default Modal;