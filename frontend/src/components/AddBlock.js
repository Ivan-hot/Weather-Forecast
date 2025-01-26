import React from 'react';
import PropTypes from 'prop-types';

const AddBlock = ({ onAdd, disabled }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <button
        onClick={onAdd}
        disabled={disabled}
        style={{
          padding: '10px 20px',
          fontSize: '1.2rem',
          backgroundColor: disabled ? '#cccccc' : '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: disabled ? 'not-allowed' : 'pointer',
        }}
      >
        Add Weather Block
      </button>
    </div>
  );
};

AddBlock.propTypes = {
  onAdd: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired
};

export default AddBlock;