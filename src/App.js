import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter, Route, Switch } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import FacebookButton from './components/FacebookButton';
import config from './config';
import * as actions from './store/actions/index';
import Routes from './Routes';
import Header from './components/Header/Header';
import AlbumList from './components/Album/AlbumList';
import PhotoGrid from './components/Album/PhotoGrid';
import NotFound from './components/NotFound';

function waitForInit() {
  return new Promise((res, rej) => {
    const hasFbLoaded = () => {
      if (window.FB) {
        res();
      } else {
        setTimeout(hasFbLoaded, 300);
      }
    };
    hasFbLoaded();
  });
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    }

    this.handleVeiwAlbum = this.handleVeiwAlbum.bind(this);
  }

  async componentDidMount() {
    await waitForInit();
    
    this.loadFacebookSDK();

    if(localStorage.getItem('accessToken') && localStorage.getItem('accessToken') !== '' 
    && localStorage.getItem('expiresIn') && localStorage.getItem('expiresIn') !== '' 
    && localStorage.getItem('expiresIn') > new Date().getTime()) {
      this.userHasAuthenticated(true);
      this.handleGetProfile();        
    } else {
      this.userHasAuthenticated(false);
    }
  
    this.setState({ isAuthenticating: false });
  }
    
  loadFacebookSDK() {
    window.FB.init({
      appId      : config.faceBookAppId,
      status     : true,
      xfbml      : true,
      version    : 'v3.1'
    });
  }

  handleGetProfile = () => {
    window.FB.api('/me', 
      { fields: 'first_name, last_name, email, picture', 
        access_token: localStorage.getItem('accessToken')
      },profileResponse => {
        this.props.onSetUserProfile(profileResponse);
    });
    
    this.handleGetAlbums();
  }

  handleGetAlbums = () => {
    window.FB.api('/me', 
      { fields:'albums{name,count,cover_photo{picture}}',
        access_token: localStorage.getItem('accessToken')
      }, albumResponse => {
        this.props.onSetAlbum(albumResponse.albums.data);
    });
  }

  handleGetAlbumPhotos = (albumId) => {
    window.FB.api(albumId + "/",
    { fields:'photos{picture,images}',
      access_token: localStorage.getItem('accessToken')
    }, photosResponse => {
      this.props.onSetPhotos(photosResponse.photos.data);
      this.props.history.push("/photos");
    });
  }

  handleVeiwAlbum = (albumId) => {
    this.handleGetAlbumPhotos(albumId);
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  };
  
  handleLogout = () => {
    console.log('logout clicked')
    window.FB.logout(response => {    
      console.log('logout resposne', response)  
      this.userHasAuthenticated(false);
      localStorage.clear();
      console.log('Logged out');
    });
    // this.props.history.push("/login");
  };
  
  render() {  
    return (   
      !this.state.isAuthenticated?
      <FacebookButton handleGetProfile={this.handleGetProfile} />:        
      <Fragment>    
        <Header handleLogout={this.handleLogout} />
        <Switch>
            <Route path="/facebook-connect" component={FacebookButton} />
            <Route path="/" component={() => <AlbumList albums={this.props.albums} viewAlbum={this.handleVeiwAlbum} /> } />
            <Route path="/albums" component={() => <AlbumList albums={this.props.albums} viewAlbum={this.handleVeiwAlbum} /> } />
            <Route path="/photos" component={() => <PhotoGrid photos={this.props.photos} /> } />
            { /* Finally, catch all unmatched routes */ }
            <Route component={NotFound} />
        </Switch>      
      </Fragment>
        
    );
  }    
}

/**
* @desc connecting to redux store
* @param state
* @return redux state
*/
const mapStateToProps = state => {
  return {
    userProfile: state.userProfile.userProfile,
    albums: state.album.album,
    photos: state.album.photos
  };
}
  
/**
 * @desc connecting to redux actions
 * @param dispatch
 * @return redux actions
 */  
const mapDispatchToProps = dispatch => {
  return {
    onSetUserProfile: (userProfile) => dispatch(actions.setUserProfile(userProfile)),
    onSetAlbum: (album) => dispatch(actions.setAlbum(album)),
    onSetPhotos: (photos) => dispatch(actions.setPhotos(photos))
  }
}
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));