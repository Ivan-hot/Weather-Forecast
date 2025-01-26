import React from 'react';

const AddCityButton = ({ onClick, disabled, maxBlocks }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <button
        onClick={onClick}
        disabled={disabled}
        style={{
          padding: '10px 20px',
          fontSize: '1.2rem',
          backgroundColor: disabled ? '#cccccc' : '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: disabled ? 'not-allowed' : 'pointer',
          marginTop: '1rem'
        }}
      >
        {disabled ? 'Maximum Cities Reached' : '+ Add City'}
      </button>
      {disabled && (
        <div style={{ color: '#666', marginTop: '0.5rem', fontSize: '0.9rem' }}>
          Maximum limit of {maxBlocks} cities reached
        </div>
      )}
    </div>
  );
};

export default AddCityButton;