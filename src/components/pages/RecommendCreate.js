import React, { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { Dropdown, Embed } from 'semantic-ui-react';
import fireabase from '../../config/firebase';

const RecommendCreate = () => {
  const user = useContext(AuthContext);
  const [description, setDescription] = useState('');
  const options = [
    { key: 1, text: 'JavaScript', value: 1 },
    { key: 2, text: 'Node.js', value: 2 },
    { key: 3, text: 'Deno', value: 3 },
    { key: 4, text: 'React/React Native', value: 4 },
    { key: 5, text: 'Vue.js', value: 5 },
    { key: 6, text: 'Angular.js', value: 6 },
    { key: 7, text: 'OTher', value: 7 },
  ];
  const videoSrc = `https://www.youtube.com/embed/5y_KJAg8bHI`;
  return (
    <div className="ui container">
      <h2 class="ui icon center aligned header">
        <i class="youtube icon"></i>
        <div class="content">
          動画をオススメする
          <div class="sub header">
            Manage your account settings and set e-mail preferences.
          </div>
        </div>
      </h2>
      <div style={{ maxWidth: '600px' }} className="ui segment">
        <Embed
          id="5y_KJAg8bHI"
          placeholder="/images/image-16by9.png"
          source="youtube"
        />
      </div>
      <form className="ui form">
        <div className="ui segment">
          <label>カテゴリー</label>
          <Dropdown clearable options={options} selection />
          <div className="field">
            <label>コメント</label>
            <textarea rows="5" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default RecommendCreate;
