import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createExercise } from "../../../../actions/exerciseActions";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CodeMirror from "./CodeMirror";

const styles = theme => ({
  "@global": {
    body: {
      background: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    background: "secondary"
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
});

class CreateExercise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topicName: "",
      topic: "",
      difficulty: "",
      question: "",
      content: "",
      answer: "",
      errors: {},
      open: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newExercise = {
      topicName: this.state.topicName,
      topic: this.state.topic,
      difficulty: this.state.difficulty,
      question: this.state.question,
      content: this.state.content,
      answer: this.state.answer
    };

    this.props.createExercise(newExercise);

    this.setState({ open: true });
  }

  handleTopic = event => {
    this.setState({ topic: event.target.value });
  };

  handleDifficulty = event => {
    this.setState({ difficulty: event.target.value });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  changeContent = newContent => {
    this.setState({ content: newContent });
  };

  render() {
    const { user } = this.props.auth;
    const { open, errors } = this.state;
    const { classes } = this.props;
    const widthDifficulty = 70,
      widthTopic = 50;

    return (
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Exercise
          </Typography>
          <form onSubmit={this.onSubmit} className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="topicName"
                  name="topicName"
                  label="Topic Name"
                  variant="outlined"
                  fullWidth
                  required
                  autoFocus
                  autoComplete="topicName"
                  value={this.state.topicName}
                  onChange={this.onChange}
                  error={!!errors.topicName}
                  helperText={errors.topicName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl
                  variant="outlined"
                  required
                  fullWidth
                  error={!!errors.topic}
                >
                  <InputLabel>Topic</InputLabel>
                  <Select
                    value={this.state.topic}
                    onChange={this.handleTopic}
                    labelWidth={widthTopic}
                  >
                    <MenuItem value={"Inheritance"}>Inheritance</MenuItem>
                    <MenuItem value={"Abstraction"}>Abstraction</MenuItem>
                    <MenuItem value={"Polymorphism"}>Polymorphism</MenuItem>
                    <MenuItem value={"Encapsulation"}>Encapsulation</MenuItem>
                  </Select>
                  <FormHelperText>{errors.topic}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl
                  variant="outlined"
                  required
                  fullWidth
                  error={!!errors.difficulty}
                >
                  <InputLabel>Difficulty</InputLabel>
                  <Select
                    value={this.state.difficulty}
                    onChange={this.handleDifficulty}
                    labelWidth={widthDifficulty}
                  >
                    <MenuItem value={"Easy"}>Easy</MenuItem>
                    <MenuItem value={"Hard"}>Hard</MenuItem>
                  </Select>
                  <FormHelperText>{errors.difficulty}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="question"
                  name="question"
                  label="Question"
                  variant="outlined"
                  fullWidth
                  required
                  autoComplete="question"
                  value={this.state.question}
                  onChange={this.onChange}
                  error={!!errors.question}
                  helperText={errors.question}
                />
              </Grid>
              <Grid item xs={12}>
                {/* <CodeMirror
                  content={this.state.content}
                  changeContent={this.changeContent}
                /> */}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="answer"
                  name="answer"
                  type="answer"
                  label="Answer"
                  variant="outlined"
                  fullWidth
                  required
                  autoComplete="answer"
                  value={this.state.answer}
                  onChange={this.onChange}
                  error={!!errors.answer}
                  helperText={errors.answer}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Create
            </Button>
          </form>
          <Dialog
            open={open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Success!"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Successfully create!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={this.handleClose}
                component={Link}
                to={`/exercises/${user.id}`}
                autoFocus
                color="primary"
              >
                Ok
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Container>
    );
  }
}

CreateExercise.propTypes = {
  auth: PropTypes.object.isRequired,
  exercise: PropTypes.object.isRequired,
  createExercise: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  exercise: state.exercise,
  errors: state.errors
});

export default connect(mapStateToProps, { createExercise })(
  withRouter(withStyles(styles)(CreateExercise))
);
