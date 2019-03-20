import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';

import actions from '../../actions/socialgraph';
import ActorsType from '../../proptypes/Actors';
import PersonType from '../../proptypes/Person';
import i18n from '../../languages';

class FollowAction extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLeader: false,
      isWaiting: false,
    };

    this.handleFollow = this.handleFollow.bind(this);
    this.handleUnfollow = this.handleUnfollow.bind(this);
  }

  componentWillMount() {
    const { actor, actors } = this.props;
    const isLeader = actors.byId[actor.id] ? actors.byId[actor.id].isLeader : actor.isLeader;
    this.setState({ isLeader });
  }

  componentWillReceiveProps(nextProps) {
    const { actors, actor } = nextProps;

    if (actors.byId[actor.id]) {
      this.setState({
        isLeader: actors.byId[actor.id].isLeader,
        isWaiting: false,
      });
    }
  }

  componentWillUnmount() {
    const { reset } = this.props;
    reset();
  }

  handleFollow(event) {
    event.preventDefault();

    const { viewer, actor, followActor } = this.props;

    followActor(viewer, actor);

    this.setState({ isWaiting: true });
  }

  handleUnfollow(event) {
    event.preventDefault();

    const { viewer, actor, unfollowActor } = this.props;

    unfollowActor(viewer, actor);

    this.setState({ isWaiting: true });
  }

  render() {
    const {
      component,
      followLabel,
      unfollowLabel,
    } = this.props;

    const { isLeader, isWaiting } = this.state;
    const title = isLeader ? unfollowLabel : followLabel;
    const onClick = isLeader ? this.handleUnfollow : this.handleFollow;
    const color = isLeader ? 'inherit' : 'primary';

    if (component === 'menuitem') {
      return (
        <MenuItem
          onClick={onClick}
          disabled={isWaiting}
          color={color}
        >
          {title}
        </MenuItem>
      );
    }

    return (
      <Button
        onClick={onClick}
        disabled={isWaiting}
        color={color}
      >
        {title}
      </Button>
    );
  }
}

FollowAction.propTypes = {
  followActor: PropTypes.func.isRequired,
  unfollowActor: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  actor: PropTypes.object.isRequired,
  actors: ActorsType.isRequired,
  viewer: PersonType.isRequired,
  component: PropTypes.oneOf(['button', 'menuitem']),
  followLabel: PropTypes.string,
  unfollowLabel: PropTypes.string,
};

FollowAction.defaultProps = {
  component: 'button',
  followLabel: i18n.t('actions:follow'),
  unfollowLabel: i18n.t('actions:unfollow'),
};

const mapStateToProps = (state) => {
  const {
    viewer,
  } = state.auth;

  const {
    actors,
  } = state.socialgraph;

  return {
    actors,
    viewer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    followActor: (viewer, actor) => {
      dispatch(actions.follow(viewer, actor));
    },
    unfollowActor: (viewer, actor) => {
      dispatch(actions.unfollow(viewer, actor));
    },
    reset: () => {
      dispatch(actions.reset());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FollowAction);