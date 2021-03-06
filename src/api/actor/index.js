import admins from './admins';
import apps from './apps';
import followrequests from './followrequests';
import permissions from './permissions';
import privacy from './privacy';

export default (namespace) => {
  return {
    admins: admins(namespace),
    apps: apps(namespace),
    followrequests: followrequests(namespace),
    permissions: permissions(namespace),
    privacy: privacy(namespace),
  };
};
