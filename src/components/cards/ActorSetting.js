import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';

const styles = {
  avatar: {
    textDecoration: 'none',
  },
};

const ActorSettingCard = (props) => {
  const {
    classes,
    actor,
    subheader,
    namespace,
    children,
  } = props;

  const avatarSrc = actor.imageURL.medium && actor.imageURL.medium.url;
  const initials = actor.name.charAt(0);

  return (
    <React.Fragment>
      <Card>
        <CardHeader
          avatar={
            <Avatar
              aria-label={actor.name}
              className={classes.avatar}
              alt={actor.name}
              src={avatarSrc}
              component={Link}
              to={`/${namespace}/${actor.id}/`}
            >
              {!avatarSrc && initials}
            </Avatar>
          }
          title={actor.name}
          subheader={subheader}
        />
        <Divider />
        {children}
      </Card>
    </React.Fragment>
  );
};

ActorSettingCard.propTypes = {
  classes: PropTypes.object.isRequired,
  actor: PropTypes.object.isRequired,
  subheader: PropTypes.string,
  namespace: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

ActorSettingCard.defaultProps = {
  subheader: 'Settings',
};

export default withStyles(styles)(ActorSettingCard);
