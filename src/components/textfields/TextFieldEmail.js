import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import * as actions from '../../actions/auth';
import * as validate from '../../containers/people/validate';

class TextFieldEmail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initValue: props.value,
      error: false,
      helperText: '',
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { emailAvailable } = nextProps;

    this.setState({
      error: !emailAvailable,
      helperText: emailAvailable ? 'Good email!' : 'Email already taken!',
    });
  }

  handleFieldChange(event) {
    const { value } = event.target;
    const { isEmailTaken, onChange } = this.props;

    if (validate.email(value) && this.state.initValue !== value) {
      isEmailTaken(value);
    }

    onChange(event);
  }

  render() {
    const {
      error,
      helperText,
    } = this.state;

    const {
      value,
      disabled,
    } = this.props;

    return (
      <TextField
        name="email"
        value={value}
        onChange={this.handleFieldChange}
        label="Email"
        error={this.props.error || error}
        helperText={this.props.helperText || helperText}
        fullWidth
        margin="normal"
        disabled={disabled}
      />
    );
  }
}

TextFieldEmail.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  isEmailTaken: PropTypes.func.isRequired,
  emailAvailable: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.string,
};

TextFieldEmail.defaultProps = {
  value: '',
  disabled: false,
  emailAvailable: false,
  error: false,
  helperText: '',
};

const mapStateToProps = (state) => {
  const {
    emailAvailable,
  } = state.auth;

  return {
    emailAvailable,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    isEmailTaken: (email) => {
      dispatch(actions.validateEmail(email));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TextFieldEmail);
