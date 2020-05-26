import React from 'react';

const SideBar = () => {
  return (
    <div class="ui vertical menu">
      <div class="item">
        <div class="ui input">
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div class="item">
        Home
        <div class="menu">
          <a class="active item">Search</a>
          <a class="item">Add</a>
          <a class="item">Remove</a>
        </div>
      </div>
      <a class="item">
        <i class="grid layout icon"></i> Browse
      </a>
      <a class="item">Messages</a>
      <div class="ui dropdown item">
        More
        <i class="dropdown icon"></i>
        <div class="menu">
          <a class="item">
            <i class="edit icon"></i> Edit Profile
          </a>
          <a class="item">
            <i class="globe icon"></i> Choose Language
          </a>
          <a class="item">
            <i class="settings icon"></i> Account Settings
          </a>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
