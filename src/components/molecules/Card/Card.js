import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Heading from 'components/atoms/Heading/Heading';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import Button from 'components/atoms/Button/Button';
import LinkIcon from 'assets/link.svg';

const StyledWrapper = styled.div`
  border-width: 2px;
  border-style: solid;
  border-color: ${({ activeColor, theme }) => (activeColor ? theme[activeColor] : theme.white)};

  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.02), 0px 1px 12px rgba(0, 0, 0, 0.12);  
  border-radius: 1rem;
  overflow: hidden;
  min-height: 38rem;
  display: grid;
  grid-template-rows: 0.25fr 1fr;
`;

const InnerWrapper = styled.div`
  position: relative;
  padding: 1.5rem 3rem;
  
  :first-of-type {
    z-index: 2;
  }
  
  ${({ flex }) => flex && css`
      display: flex;
      flex-direction: column;
      justify-content: space-between;
  `
}`;

const StyledHeading = styled(Heading)`
  max-width: 80%;
  margin: 1rem 0 0;
`;

const DateInfo = styled(Paragraph)`
  font-weight: ${({ theme }) => theme.bold};
  font-size: ${({ theme }) => theme.fontSize.xs};
  margin: 0 0 1rem;
`;

const StyledAvatar = styled.img`
  position: absolute;
  top: 2rem;
  right: 2rem;
  width: 6rem;
  height: 6rem;
  border: 1px solid ${({ theme }) => theme.grey300};
  border-radius: 50%;
`;

const StyledLinkButton = styled.a`
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme }) => (theme.grey300)};
  border-radius: 50%;

  position: absolute;
  top: 2rem;
  right: 2rem;
  display: block;
  width: 4rem;
  height: 4rem;
  background: ${({ theme }) => theme.white} url(${LinkIcon}) no-repeat;
  background-size: 60%;
  background-position: 50%;
`;

class Card extends Component {
  state = {
    redirect: false,
  }

  handleCardClick = () => this.setState({ redirect: true });

  render() {
    const {
      cardType, title, created, content, twitterName, articleUrl, id,
    } = this.props;

    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to={`${cardType}/${id}`} />;
    }
    return (
      <StyledWrapper activeColor={cardType} onClick={this.handleCardClick}>
        <InnerWrapper>
          <StyledHeading>{title}</StyledHeading>
          <DateInfo>{created}</DateInfo>
          {cardType === 'twitters'
          && <StyledAvatar src={`https://unavatar.now.sh/twitter/${twitterName}`} />}
          {cardType === 'articles' && <StyledLinkButton href={articleUrl} />}
        </InnerWrapper>
        <InnerWrapper flex>
          <Paragraph>
            {content}
          </Paragraph>
          <Button secondary>Remove</Button>
        </InnerWrapper>
      </StyledWrapper>
    );
  }
}

Card.propTypes = {
  cardType: PropTypes.oneOf(['notes', 'twitters', 'articles']),
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired,
  twitterName: PropTypes.string,
  articleUrl: PropTypes.string,
  content: PropTypes.string.isRequired,
};

Card.defaultProps = {
  cardType: 'notes',
  twitterName: null,
  articleUrl: null,
};

export default Card;