import React from 'react';
import { Spinner } from 'react-bootstrap'

const LoadSpinner = (props) => {
  return (
    <>
    <Spinner animation="grow" variant="light" role="status" />
    <Spinner animation="grow" variant="light" role="status" />
    <Spinner animation="grow" variant="light" role="status" />
  </>
  );
};

export {LoadSpinner};

const BorderSpinner = (props) => {
  return (
    <>
    <Spinner animation="border" variant="dark"/>
  </>
  );
};

export {BorderSpinner};

