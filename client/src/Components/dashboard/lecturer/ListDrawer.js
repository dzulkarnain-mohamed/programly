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
import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import ClassOutlinedIcon from "@material-ui/icons/ClassOutlined";
import AllInboxOutlinedIcon from "@material-ui/icons/AllInboxOutlined";
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
  state = { open: false };
  handleClick = () => {
    this.setState({ open: !this.state.open });
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
          <ListItem button component={Link} to="/lecturers/dashboard">
            <ListItemIcon>
              <HomeOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button onClick={this.handleClick}>
            <ListItemIcon>
              <AssignmentOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Exercise" />
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                component={Link}
                to="/exercises/new-exercise"
                className={classes.nested}
              >
                <ListItemIcon>
                  <AddOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="New exercise" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to={`/exercises/${user.id}`}
                className={classes.nested}
              >
                <ListItemIcon>
                  <AllInboxOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Exercises" />
              </ListItem>
            </List>
          </Collapse>
          <ListItem button component={Link} to="/lecturers/dashboard">
            <ListItemIcon>
              <ClassOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Class" />
          </ListItem>
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