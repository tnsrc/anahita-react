import React, { useState } from 'react';
import PropTypes from 'prop-types';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Switch from '@material-ui/core/Switch';

import AppType from '../../../../proptypes/actor/App';

const ActorsSettingsAppsBrowse = (props) => {
  const {
    handleEdit,
    app,
  } = props;

  const [enabled, setEnabled] = useState(app.enabled);

  return (
    <ListItem>
      <ListItemText
        primary={app.name}
        secondary={app.description}
      />
      <ListItemSecondaryAction>
        <Switch
          checked={enabled.enabled}
          onChange={() => {
            app.enabled = !app.enabled;
            setEnabled(app.enabled);
            handleEdit(app);
          }}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

ActorsSettingsAppsBrowse.propTypes = {
  app: AppType.isRequired,
  handleEdit: PropTypes.func.isRequired,
};

export default ActorsSettingsAppsBrowse;
