import React from "react";

const MaxFavoritesModal = ({ show, onClose }) => {
    return (
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Maximum Favorites Reached</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          To add a new city, please delete an existing favorite first. Maximum is 5 cities.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };