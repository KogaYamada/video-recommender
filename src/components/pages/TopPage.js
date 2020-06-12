import React from 'react';
import { connect } from 'react-redux';
import { selectVideo, setVideos, isSearch } from '../../_actions';
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import VideoDetail from '../VideoDetail';
import VideoList from '../VideoList';
import CommentList from '../CommentList';
import { Segment, Grid, Container } from 'semantic-ui-react';

const TopPage = ({ video, videos, isSearchState }) => {
  return (
    <>
      <TopBar />
      <Container fluid>
        <Grid columns="equal" stackable>
          <Grid.Column width={3}>
            <SideBar />
          </Grid.Column>
          <Grid.Column width={8}>
            <Segment>
              <VideoDetail video={video} />
            </Segment>
            <div>{video && !isSearchState ? <CommentList /> : ''}</div>
          </Grid.Column>
          <Grid.Column width={5}>
            <VideoList videos={videos} />
          </Grid.Column>
        </Grid>
      </Container>
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

export default connect(mapStateToProps, { selectVideo, setVideos, isSearch })(
  TopPage
);
