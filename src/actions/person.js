import { people as api } from '../api';
import {
  PERSON_READ_REQUEST, PERSON_READ_SUCCESS, PERSON_READ_FAILURE,
  // PERSON_EDIT_REQUEST, PERSON_EDIT_SUCCESS, PERSON_EDIT_FAILURE,
  // PERSON_ADD_REQUEST, PERSON_ADD_SUCCESS, PERSON_ADD_FAILURE,
  PERSON_DELETE_REQUEST, PERSON_DELETE_SUCCESS, PERSON_DELETE_FAILURE,
} from '../constants/person';

// -- Read

function readRequest() {
  return {
    type: PERSON_READ_REQUEST,
  };
}

function readSuccess(result) {
  return {
    type: PERSON_READ_SUCCESS,
    person: result.data,
  };
}

function readFailure(error) {
  return {
    type: PERSON_READ_FAILURE,
    errorMessage: error.message,
  };
}

export function readPerson(id) {
  return (dispatch) => {
    dispatch(readRequest());
    return new Promise((resolve, reject) => {
      api.readPerson(id)
        .then((result) => {
          dispatch(readSuccess(result));
          return resolve();
        }, (response) => {
          dispatch(readFailure(response));
          return reject(response);
        }).catch((error) => {
          throw new Error(error);
        });
    });
  };
}

// -- Edit

// -- Add

// -- Delete

function deleteRequest(person) {
  return {
    type: PERSON_DELETE_REQUEST,
    person,
  };
}

function deleteSuccess(response) {
  return {
    type: PERSON_DELETE_SUCCESS,
    response,
  };
}

function deleteFailure(error) {
  return {
    type: PERSON_DELETE_FAILURE,
    errorMessage: error.message,
  };
}

export function deletePerson(person) {
  return (dispatch) => {
    dispatch(deleteRequest(person));
    return new Promise((resolve, reject) => {
      api.readPerson()
        .then((result) => {
          dispatch(deleteSuccess(result));
          return resolve();
        }, (response) => {
          dispatch(deleteFailure(response));
          return reject(response);
        }).catch((error) => {
          throw new Error(error);
        });
    });
  };
}