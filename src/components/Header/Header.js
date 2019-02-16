import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, NavItem, Nav, NavDropdown, Dropdown, Image} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, withRouter } from 'react-router-dom';

import './header.css';

/**
* @desc Header section
* @version 1.0.1
* @author Lakshmikanth
*/

class Header extends Component {
  /**
  * @desc Actual rendering of the component
  * @param null
  * @return DOM element
  */
  render() {
    return (     
      <Navbar collapseOnSelect bg="primary" variant="dark" expand="lg">
        <Navbar.Brand ><Link to="/">Photo Album</Link></Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="ml-auto pr-md-5 navbar-nav">
            <Image roundedCircle src={(this.props.userProfile && this.props.userProfile.picture) ? this.props.userProfile.picture.data.url : null}/>
            <NavDropdown title={this.props.userProfile.first_name + " " + this.props.userProfile.last_name} id="basic-nav-dropdown">
              <NavDropdown.Item onClick={this.props.handleLogout.bind(this)}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
/**
* @desc connecting to redux store
* @param state
* @return redux state
*/
const mapStateToProps = state => ({
  userProfile: state.userProfile.userProfile
});

const reduxConnector = connect(mapStateToProps, null, null, { pure: false });

export default reduxConnector(withRouter(Header));