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
  background-color: #f4f5f9;
  margin: auto;
  border: none;
  width: 550px;

  .header {
    display: flex;
    justify-content: space-between;
    display: flex;
    height: 5%;
    width: 100%;
    color: #ffffff;
    font-family: Trebuchet MS;
    font-size: 20px;
    color: #0085ff;
    background-color: #ffffff;
    button {
      border: none;
      background-color: Transparent;
      cursor: pointer;
      padding: 0;
      outline: none;
      margin-right: 4%;
    }
    p {
      font-family: Trebuchet MS;
      font-size: 20px;
      margin-left: 1em;
    }
    img {
      height: 30px;
    }
  }
  .articlesDiv {
    max-height: 300px;
    overflow-y: scroll;
  }
  article {
    margin-top: 10px;
    border-radius: 5px;
    width: 420px;
    ${'' /* background-color: white;
    box-shadow: 0 4px 10px 0 rgba(50, 70, 90, 0.1); */} h1 {
      color: #0085ff;
      margin-bottom: -15px;
      margin-top: 30px;
      margin-left: 19px;
    }
    p {
      font-family: Trebuchet MS;
      font-size: 20px;
      margin-left: 1em;
      color: #738190;
    }
  }
`;

class NewsFeed extends Component {
  static propTypes = {
    locale: PropTypes.shape({
      newsFeed: PropTypes.string,
    }),
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
            <p>{this.props.locale.newsFeed} </p>
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
  locale: state.LocaleReducer,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...ApiActions,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(NewsFeed);
