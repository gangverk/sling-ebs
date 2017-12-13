import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';

import * as ApiActions from '../../components/Actions/actions';
import closeX from '../Modal/x.png';

const ModalWrapper = styled.div`
  ${props => {
    if (!props.visable) {
      return css`
        display: none;
      `;
    } else {
      return css`
        position: fixed; /* Stay in place */
        z-index: 1; /* Sit on top */
        padding-top: 100px; /* Location of the box */
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0, 0, 0); /* Fallback color */
        background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
      `;
    }
  }};
`;

const NewsFeedWrapper = styled.div`
  background-color: white;
  margin: auto;
  border: 2px solid #dadada;
  border-radius: 5px;
  width: 550px;
  .header{
    display: flex;
    justify-content: space-between;
    img{
      height: 25px;
    }
  }
  .articlesDiv {
    border: 2px solid #dadada;
    margin 20px;
    max-height: 300px;
    overflow-y: scroll;
  }
  h1 {
    margin: 10px 30px 10px 40px;
  }
  article {
    margin-top: 10px;
    border: 2px solid #dadada;
    border-radius: 5px;
    width: 420px;
    h1 {
      margin: 10px;
    }
    p {
      margin: 10px;
    }
  }
`;

class NewsFeed extends Component {
  static propTypes = {
    channelsArticles: PropTypes.shape({
      length: PropTypes.numb,
    }),
    fetchChannelClient: PropTypes.func.isRequired,
    visable: PropTypes.bool.isRequired,
    hideNewsFeed: PropTypes.func.isRequired,
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
  }

  render() {
    return (
      <ModalWrapper visable={this.props.visable}>
        <NewsFeedWrapper>
          <div className="header">
            <h1>News Feed </h1>
            <button onClick={this.props.hideNewsFeed}>
              <img alt="X button" src={closeX} />
            </button>
          </div>
          <div className="articlesDiv">
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
          </div>
        </NewsFeedWrapper>
      </ModalWrapper>
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
