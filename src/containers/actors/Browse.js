import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import InfiniteScroll from 'react-infinite-scroller';
import { Link } from 'react-router-dom';

import * as actions from '../../actions';
import i18n from '../../languages';
import permissions from '../../permissions/actor';

import PersonType from '../../proptypes/Person';
import ActorsType from '../../proptypes/Actors';

import ActorsCard from './Card';
import Masonry from '../../components/BreakpointMasonry';
import Progress from '../../components/Progress';
import { App as APP } from '../../constants';

const { LIMIT } = APP.BROWSE;

const useStyles = makeStyles((theme) => {
  return {
    actorTitle: {
      fontSize: 16,
    },
    actorAlias: {
      fontSize: 12,
    },
    addButton: {
      position: 'fixed',
      bottom: theme.spacing(3),
      right: theme.spacing(3),
      zIndex: 10,
    },
    masonryGrid: {
      display: 'flex',
      marginLeft: theme.spacing(-2),
      width: 'inherit',
    },
    card: {
      marginBottom: theme.spacing(2),
    },
  };
});

const ActorsBrowse = (props) => {
  const classes = useStyles();
  const {
    setAppTitle,
    browseList,
    resetList,
    namespace,
    viewer,
    // width,
    items,
    hasMore,
    queryFilters,
  } = props;

  const fetchList = (page) => {
    const { disabled, q } = queryFilters;
    const start = (page - 1) * LIMIT;
    browseList({
      q,
      disabled,
      start,
      limit: LIMIT,
      ...queryFilters,
    }, namespace);
  };

  useEffect(() => {
    setAppTitle(i18n.t(`${namespace}:cTitle`));

    return () => {
      resetList();
    };
  }, [setAppTitle, resetList, namespace]);

  // const columnWidth = containersUtils.getColumnWidthPercentage(width);
  const canAdd = permissions.canAdd(viewer);

  return (
    <React.Fragment>
      {canAdd &&
        <Fab
          aria-label="Add"
          color="secondary"
          className={classes.addButton}
          component={Link}
          to={`/${namespace}/add/`}
        >
          <AddIcon />
        </Fab>
      }
      <InfiniteScroll
        loadMore={fetchList}
        hasMore={hasMore}
        loader={
          <Progress key={`${namespace}-progress`} />
        }
      >
        <Masonry>
          {items.allIds.map((itemId) => {
            const node = items.byId[itemId];
            const key = `${namespace}_node_list_item_${node.id}`;
            return (
              <div
                className={classes.card}
                key={key}
              >
                <ActorsCard actor={node} />
              </div>
            );
          })
          }
        </Masonry>
      </InfiniteScroll>
    </React.Fragment>
  );
};

ActorsBrowse.propTypes = {
  browseList: PropTypes.func.isRequired,
  resetList: PropTypes.func.isRequired,
  namespace: PropTypes.string.isRequired,
  viewer: PersonType.isRequired,
  queryFilters: PropTypes.object,
  setAppTitle: PropTypes.func.isRequired,
  items: ActorsType.isRequired,
  hasMore: PropTypes.bool.isRequired,
};

ActorsBrowse.defaultProps = {
  queryFilters: {
    q: '',
    disabled: false,
  },
};

const mapStateToProps = (namespace) => {
  return (state) => {
    const {
      error,
      hasMore,
    } = state[namespace];

    const {
      viewer,
    } = state.session;

    return {
      items: state[namespace][namespace],
      namespace,
      error,
      hasMore,
      viewer,
    };
  };
};

const mapDispatchToProps = (namespace) => {
  return (dispatch) => {
    return {
      browseList: (params) => {
        return dispatch(actions[namespace].browse(params, namespace));
      },
      resetList: () => {
        return dispatch(actions[namespace].reset(namespace));
      },
      setAppTitle: (title) => {
        return dispatch(actions.app.setAppTitle(title));
      },
    };
  };
};

export default (namespace) => {
  return connect(
    mapStateToProps(namespace),
    mapDispatchToProps(namespace),
  )(ActorsBrowse);
};
