const USER_SCOPES: any = {
  full: {
    attributes: ['id', 'name', 'email', 'created_at', 'updated_at', 'deleted_at']
  },
  withPassword: {
    attributes: ['id', 'name', 'email', 'password']
  }
}

export default USER_SCOPES;