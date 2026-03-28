import React from "react";
import "./Modal.scss";

const Modal = ({
  isOpen,
  title,
  children,
  onClose,
  onSave,
  saveButtonText = "Save",
  cancelButtonText = "Cancel",
  showFooter = true,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-body">{children}</div>

        {showFooter && (
          <div className="modal-footer">
            <button className="btn-cancel" onClick={onClose}>
              {cancelButtonText}
            </button>
            {onSave && (
              <button className="btn-save" onClick={onSave}>
                {saveButtonText}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
