import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext';

const RecommendCreate = () => {
  const user = useContext(AuthContext);
  console.log(user);
  return (
    <div className="ui container">
      <h2 className="ui header">オススメする</h2>
    </div>
  );
};

export default RecommendCreate;
