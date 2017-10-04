import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { rgba } from 'polished';

const Wrapper = styled.div``;
const Header = styled.header``;
const Content = styled.section`
  box-sizing: border-box;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  height: auto;
  padding: 5rem;
  width: 100%;
`;
const Footer = styled.footer``;

const PageTemplate = ({ header, children, footer, ...props }) => {
  return (
    <Wrapper {...props}>
      <Header>{header}</Header>
      <Content>{children}</Content>
      <Footer>{footer}</Footer>
    </Wrapper>
  )
}

PageTemplate.propTypes = {
  header: PropTypes.node.isRequired,
  children: PropTypes.any.isRequired,
};

export default PageTemplate;
