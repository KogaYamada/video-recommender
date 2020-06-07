import React from 'react';
import { Link } from 'react-router-dom';

const CreateEditBar = () => {
  return (
    <div className="ui massive inverted menu">
      <Link to="/">
        <h3
          style={{
            color: 'white',
            textAlign: 'center',
            verticalAlign: 'middle',
            marginTop: '10px',
            marginLeft: '20px',
          }}
          className="ui header"
        >
          Video Recommender
        </h3>
      </Link>
    </div>
  );
};

export default CreateEditBar;
