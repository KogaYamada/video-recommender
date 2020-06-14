import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  selectVideo,
  setVideos,
  isSearch,
  selectDevCategory,
} from '../../_actions';
import TopBar from '../TopBars/TopBar';
import ResponsiveBar from '../TopBars/ResponsiveBar';
import SideBar from '../SideBar';
import VideoDetail from '../VideoDetail';
import VideoList from '../VideoList';
import CommentList from '../CommentList';
import { Segment, Grid, Responsive } from 'semantic-ui-react';
import firebase from '../../config/firebase';

const TopPage = ({
  video,
  videos,
  isSearchState,
  selectDevCategory,
  selectVideo,
  setVideos,
  isSearch,
}) => {
  const [jsVideo, setJsVideo] = useState([]);
  const [nodeVideo, setNodeVideo] = useState([]);
  const [denoVideo, setDenoVideo] = useState([]);
  const [reactVideo, setReactVideo] = useState([]);
  const [vueVideo, setVueVideo] = useState([]);
  const [angularVideo, setAngularVideo] = useState([]);
  const [otherVideo, setOtherVideo] = useState([]);
  /**
   * おすすめ動画のカテゴリーとその基本データ
   */
  const categorys = [
    {
      title: 'JavaScript',
      color: 'yellow',
      isActive: true,
      key: 'javascript',
      videos: jsVideo,
      setVideos: (videos) => {
        setJsVideo(videos);
      },
    },
    {
      title: 'Node.js',
      color: 'green',
      isActive: false,
      key: 'node',
      videos: nodeVideo,
      setVideos: (videos) => {
        setNodeVideo(videos);
      },
    },
    {
      title: 'Deno',
      color: 'violet',
      isActive: false,
      key: 'deno',
      videos: denoVideo,
      setVideos: (videos) => {
        setDenoVideo(videos);
      },
    },
    {
      title: 'React/React Native',
      color: 'blue',
      isActive: false,
      key: 'react',
      videos: reactVideo,
      setVideos: (videos) => {
        setReactVideo(videos);
      },
    },
    {
      title: 'Vue.js',
      color: 'teal',
      isActive: false,
      key: 'vue',
      videos: vueVideo,
      setVideos: (videos) => {
        setVueVideo(videos);
      },
    },
    {
      title: 'Angular.js',
      color: 'red',
      isActive: false,
      key: 'angular',
      videos: angularVideo,
      setVideos: (videos) => {
        setAngularVideo(videos);
      },
    },
    {
      title: 'Other',
      color: 'grey',
      isActive: false,
      key: 'other',
      videos: otherVideo,
      setVideos: (videos) => {
        setOtherVideo(videos);
      },
    },
  ];
  /**
   * firestoreの参照
   */
  const db = firebase.firestore();
  /**
   * ページが読み込まれた時の処理
   */
  useEffect(() => {
    categorys.forEach((category) => {
      db.collection(`${category.key}Recommend`)
        .get()
        .then((querySnapshot) => {
          const datas = [];
          querySnapshot.forEach((doc) => {
            datas.push(doc.data());
          });
          category.setVideos(datas);
          if (category.key === 'javascript') {
            setVideos(datas);
            selectVideo(datas[0]);
            isSearch(false);
          }
        });
    });
    isSearch(false);
    selectDevCategory(categorys[0]);
  }, []);
  return (
    <>
      <Responsive maxWidth={1030}>
        <ResponsiveBar categorys={categorys} />
      </Responsive>
      <Responsive minWidth={1031}>
        <TopBar categorys={categorys} />
      </Responsive>
      <Grid columns="equal" stackable style={{ marginTop: '1px' }}>
        <Responsive
          as={Grid.Column}
          minWidth={1200}
          width={3}
          style={{ marginLeft: '10px' }}
        >
          <SideBar />
        </Responsive>
        <Grid.Column width={8}>
          <Segment>
            <VideoDetail video={video} />
          </Segment>
          {video && !isSearchState ? <CommentList /> : ''}
        </Grid.Column>
        <Grid.Column style={{ marginRight: '10px' }}>
          <VideoList videos={videos} />
        </Grid.Column>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    video: state.selectedVideo,
    videos: state.videos,
    isSearchState: state.isSearch,
  };
};

export default connect(mapStateToProps, {
  selectVideo,
  setVideos,
  isSearch,
  selectDevCategory,
})(TopPage);
