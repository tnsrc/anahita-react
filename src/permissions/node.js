import { Person as PERSON } from '../constants';

const { ADMIN, SUPER_ADMIN } = PERSON.FIELDS.TYPE;

const canEdit = (viewer, node) => {
  if (node.administratorIds) {
    if (node.administratorIds.indexOf(String(viewer.id)) > -1) {
      return true;
    }
  }

  if ([SUPER_ADMIN, ADMIN].includes(viewer.usertype)) {
    return true;
  }

  if (node.owner && node.owner.id === viewer.id) {
    return true;
  }

  if (node.author && node.author.id === viewer.id) {
    return true;
  }

  return false;
};

const canAdd = (viewer) => {
  if ([SUPER_ADMIN, ADMIN].includes(viewer.usertype)) {
    return true;
  }

  return false;
};

const canDelete = (viewer, node) => {
  if ([SUPER_ADMIN, ADMIN].includes(viewer.usertype)) {
    return true;
  }

  if (node.owner && node.owner.id === viewer.id) {
    return true;
  }

  return false;
};

export default {
  canAdd,
  canEdit,
  canDelete,
};
