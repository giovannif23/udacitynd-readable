import React from 'react';
import { Link } from 'react-router-dom';
import * as API from '../utils/api';
import { capitalize } from '../utils/helpers';
import PageTemplate from '../templates/PageTemplate';
import Header from '../organisms/Header';
import { Alert, Card, Icon, Tag, Row, Col } from 'antd';

class PostsByCategory extends React.Component {
  state = {
    category: '',
    posts: [],
  };

  componentDidMount() {
    const category = this.props.match.params.category;
    
    API.getPostsByCategory(category)
      .then((res) => {
        this.setState({
          category,
          posts: res,
        });
      });
  }

  render() {
    const { category, posts } = this.state;

    return (
      <PageTemplate
        header={<Header/>}>
        <Row>
          <Col span={12} offset={6}>
            <Link to="/">
              <Icon type="arrow-left" />Back to Home
            </Link>

            <h2 style={{ marginBottom: 30, marginTop: 20 }}>Showing all Tagged: <strong>{category && capitalize(category)}</strong></h2>
          </Col>

          <br />
          <br />
          
          {!posts.length && 
            <Col span={12} offset={6}>
              <Alert 
                message="Shucks..." 
                description="There are no posts with the category" 
                type="warning" 
              />
            </Col>
          }
          <Col span={12} offset={6}>
          {posts.map((post, index) => (
              <Card title={post.title} style={{ marginBottom: 20, width: '100%' }} key={index}>
                <p>{post.body}</p>
                
                <br />
                
                <Tag>
                  <Icon type="tag" /> {capitalize(post.category)}
                </Tag>
              </Card>
            ))}
          </Col>
        </Row>
      </PageTemplate>
    );
  }
}

export default PostsByCategory;