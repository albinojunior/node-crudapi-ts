export const defaultScope = {
  attributes: ['id', 'name', 'email', 'created_at', 'updated_at', 'deleted_at']
};

export const scopes = {
  full: {
    ...defaultScope
  },
  withPassword: {
    attributes: ['id', 'name', 'email', 'password']
  },
  resetPassword: {
    attributes: ['id', 'email', 'reset_password_token', 'reset_password_expires']
  }
}

