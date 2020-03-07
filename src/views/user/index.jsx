import React from 'react';

function User(props) {
  const { match } = props;
  const { params } = match;
  const { user_id } = params;
  return (
    <div>{user_id} user view</div>
  )
}

export default User;