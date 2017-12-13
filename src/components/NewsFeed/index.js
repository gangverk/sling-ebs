import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';

import * as ApiActions from '../../components/Actions/actions';

const NewsFeedWrapper = styled.div`
  article {
    border: 2px solid #dadada;
    border-radius: 5px;
    h1 {
      margin: auto;
    }
    p {
      margin: auto;
    }
  }
`;

class NewsFeed extends Component {
  static propTypes = {
    channelsArticles: PropTypes.shape({
      length: PropTypes.numb,
    }),
    fetchChannelClient: PropTypes.func.isRequired,
  };

  static defaultProps = {
    channelsArticles: [],
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.channelsArticles.length === 0) {
      for (let i = 0; i < nextProps.channels.length; i++) {
        if (nextProps.channels[i].name === 'newsFeedClients') {
          this.props.fetchChannelClient(nextProps.channels[i].id);
        }
      }
    }
  }

  renderArticles() {
    if (this.props.channelsArticles.length > 0) {
      let articles = this.props.channelsArticles;
      return (
        <ul>
          {articles.map(article => {
            let firstLine = article.content.split('\n')[0];
            let rest = article.content;
            rest = rest.substring(rest.indexOf('\n') + 1);
            return (
              <article>
                <h1>{firstLine}</h1>
                <p>{rest}</p>
              </article>
            );
          })}
        </ul>
      );
    }
    // return <p> {articles[0].content} </p>;
  }

  render() {
    return (
      <NewsFeedWrapper>
        <button onClick={this.renderArticles}>button</button>
        {this.props.channelsArticles === [] ? (
          <ReactLoading
            type={'spin'}
            color={'#0085ff'}
            delay={0}
            className="loadingSpinner"
          />
        ) : (
          this.renderArticles()
        )}
      </NewsFeedWrapper>
    );
  }
}

const mapStateToProps = state => ({
  channels: state.ApiReducer.channels,
  channelsArticles: state.ApiReducer.channelsArticles,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...ApiActions,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(NewsFeed);
