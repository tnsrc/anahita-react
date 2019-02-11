import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import StoriesContainer from './stories/Stories';
import appActions from '../actions/app';
import i18n from '../languages';

class DashboardPage extends React.Component {
  render() {
    const filters = {
      filter: 'leaders',
    };

    this.props.setAppTitle(i18n.t('dashboard:cTitle'));

    return (
      <React.Fragment>
        <Helmet>
          <title>{i18n.t('dashboard:cTitle')}</title>
        </Helmet>
        <StoriesContainer
          key="com:stories.story"
          queryFilters={filters}
          {...this.params}
        />
      </React.Fragment>
    );
  }
}

DashboardPage.propTypes = {
  setAppTitle: PropTypes.func.isRequired,
};

const mapStateToProps = () => {};
const mapDispatchToProps = (dispatch) => {
  return {
    setAppTitle: (title) => {
      dispatch(appActions.setAppTitle(title));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardPage);
