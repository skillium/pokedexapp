import React from 'react'
import PropTypes from 'prop-types'
import {
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
} from 'mdbreact'

const FormModal = ({
  open,
  title,
  loading,
  body,
  actions,
  closeHandler,
  onSubmitHandler,
}) => {
  return (
    <MDBModal
      isOpen={open}
      keyboard={!loading}
      centered
      toggle={!loading ? closeHandler : () => {}}
    >
      <MDBModalHeader toggle={!loading ? closeHandler : () => {}}>
        {title}
      </MDBModalHeader>
      <form noValidate className="needs-validation" onSubmit={onSubmitHandler}>
        <MDBModalBody>{body}</MDBModalBody>
        <MDBModalFooter>{actions}</MDBModalFooter>
      </form>
    </MDBModal>
  )
}

FormModal.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  actions: PropTypes.objectOf(PropTypes.any).isRequired,
  body: PropTypes.objectOf(PropTypes.any).isRequired,
  loading: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired,
  onSubmitHandler: PropTypes.func.isRequired,
}

export default FormModal
