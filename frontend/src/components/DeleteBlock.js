import React from 'react';
import PropTypes from 'prop-types';

const DeleteBlock = ({ showModal, onCancel, onConfirm, onDelete, showDeleteButton }) => {
  return (
    <>
      {showDeleteButton && (
        <button
          onClick={onDelete}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            backgroundColor: '#ff4444',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '30px',
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '18px',
            padding: '0',
            lineHeight: '1',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#ff6666'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#ff4444'}
        >
          ×
        </button>
      )}

      {}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button type="button" className="btn-close" onClick={onCancel}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this weather block?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
                <button type="button" className="btn btn-danger" onClick={onConfirm}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

DeleteBlock.propTypes = {
  showModal: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  showDeleteButton: PropTypes.bool.isRequired
};

export default DeleteBlock;