// action types
export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_CONTACT = 'UPDATE_CONTACT';
export const UPDATE_SETTINGS = 'UPDATE_SETTINGS';
export const UPDATE_LOGINSTATUS = 'UPDATE_LOGINSTATUS';

// action creators
export const updateUser = update => ({
  type: UPDATE_USER,
  payload: update
});

export const addContacts = newContact => ({
  type: UPDATE_CONTACT,
  payload: newContact
});

export const updateSettings = update => ({
  type: UPDATE_SETTINGS,
  payload: update
});

export const updateloginStatus = update => ({
  type: UPDATE_LOGINSTATUS,
  payload: update
});
