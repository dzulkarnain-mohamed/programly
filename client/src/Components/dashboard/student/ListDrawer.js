import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Collapse from "@material-ui/core/Collapse";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import SchoolOutlinedIcon from "@material-ui/icons/SchoolOutlined";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import ClassOutlinedIcon from "@material-ui/icons/ClassOutlined";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
});

class ListDrawer extends Component {
  state = { openClass: false };
  handleClickClass = () => {
    this.setState({ openClass: !this.state.openClass });
  };

  render() {
    const { user } = this.props.auth;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <List
          component="nav"
          aria-label="main folders"
          subheader={
            <ListSubheader component="div" id="main">
              Home
            </ListSubheader>
          }
        >
          <ListItem button component={Link} to="/students/dashboard">
            <ListItemIcon>
              <HomeOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button onClick={this.handleClickClass}>
            <ListItemIcon>
              <SchoolOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Classroom" />
            {this.state.openClass ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.openClass} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                component={Link}
                to="/classrooms/join-classroom"
                className={classes.nested}
              >
                <ListItemIcon>
                  <AddOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Join classroom" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to={`/myClassrooms/${user.id}`}
                className={classes.nested}
              >
                <ListItemIcon>
                  <ClassOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="My Classrooms" />
              </ListItem>
            </List>
          </Collapse>
        </List>
        <Divider />
        <List component="nav" aria-label="secondary folders">
          <ListItem button>
            <ListItemText primary="Trash" />
          </ListItem>
        </List>
      </div>
    );
  }
}

ListDrawer.propTypes = {
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(withStyles(styles)(ListDrawer));
