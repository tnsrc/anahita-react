import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Switch from '@material-ui/core/Switch';

import Progress from '../../../components/Progress';
import SimpleSnackbar from '../../../components/SimpleSnackbar';

import AppsType from '../../../proptypes/actor/Apps';
import ActorType from '../../../proptypes/Actor';
import * as actions from '../../../actions';

const ActorsSettingsApps = (props) => {
  const {
    browseApps,
    editApp,
    resetApps,
    actor,
    apps,
    isFetching,
    success,
    error,
  } = props;

  useEffect(() => {
    browseApps(actor);

    return () => {
      resetApps();
    };
  }, [browseApps, resetApps, actor]);

  const handleEditApp = (app) => {
    editApp({ actor, app });
  };

  if (apps.allIds.length === 0 && isFetching) {
    return (
      <Progress />
    );
  }

  return (
    <React.Fragment>
      <List>
        {apps.allIds.map((appId) => {
          const app = apps.byId[appId];
          const key = `app_${app.id}`;
          return (
            <ListItem
              divider
              key={key}
            >
              <ListItemText
                primary={app.name}
                secondary={app.description}
              />
              <ListItemSecondaryAction>
                <Switch
                  checked={app.enabled}
                  onChange={() => {
                    handleEditApp(app);
                  }}
                />
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
      {error &&
        <SimpleSnackbar
          isOpen={Boolean(error)}
          message="Something went wrong!"
          type="error"
        />
      }
      {success &&
        <SimpleSnackbar
          isOpen={Boolean(success)}
          message="Updated successfully!"
          type="success"
        />
      }
    </React.Fragment>
  );
};

ActorsSettingsApps.propTypes = {
  actor: ActorType.isRequired,
  browseApps: PropTypes.func.isRequired,
  editApp: PropTypes.func.isRequired,
  resetApps: PropTypes.func.isRequired,
  apps: AppsType.isRequired,
  error: PropTypes.string.isRequired,
  success: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

const mapStateToProps = (namespace) => {
  return (state) => {
    const {
      [namespace]: {
        current: actor,
      },
    } = state[namespace];

    const {
      [`${namespace}_apps`]: apps,
      isFetching,
      error,
      success,
    } = state[`${namespace}Apps`];

    return {
      actor,
      apps,
      namespace,
      error,
      success,
      isFetching,
    };
  };
};

const mapDispatchToProps = (namespace) => {
  return (dispatch) => {
    return {
      browseApps: (params) => {
        return dispatch(actions[namespace].settings.apps.browse(params));
      },
      editApp: (app) => {
        return dispatch(actions[namespace].settings.apps.edit(app));
      },
      resetApps: () => {
        return dispatch(actions[namespace].settings.apps.reset());
      },
    };
  };
};

export default (namespace) => {
  return connect(
    mapStateToProps(namespace),
    mapDispatchToProps(namespace),
  )(ActorsSettingsApps);
};
