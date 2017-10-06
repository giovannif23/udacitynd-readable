import React from 'react';
import { Link } from 'react-router-dom';
import * as API from '../utils/api';
import { capitalize } from '../utils/helpers';
import PageTemplate from '../templates/PageTemplate';
import Header from '../organisms/Header';
import { Alert, Card, Icon, Tag, Row, Col } from 'antd';

class PostsByCategory extends React.Component {
  state = {
    posts: [],
  };

  componentDidMount() {
    const category = this.props.match.params.category;
    
    API.getPostsByCategory(category)
      .then((res) => {
        this.setState({
          posts: res,
        });
      });
  }

  render() {
    const { posts } = this.state;

    return (
      <PageTemplate
        header={<Header/>}>
        <Row>
          <Col span={24} style={{ marginBottom: 20 }}>
            <Link to="/">
              <Icon type="arrow-left" />Back to Home
            </Link>
          </Col>
          
          {!posts.length && 
            <Col span={24}>
              <Alert 
                message="Shucks..." 
                description="There are no posts with the category" 
                type="warning" 
              />
            </Col>
          }
          {posts.map((post, index) => (
            <Col className="gutter-row" span={6} key={index}>
              <Card title={post.title} style={{ width: 300 }}>
                <p>{post.body}</p>
                <a href="#"><Tag color="blue">
                  <Icon type="tag" /> {capitalize(post.category)}
                </Tag></a>
              </Card>
            </Col>
          ))}
        </Row>
      </PageTemplate>
    );
  }
}

export default PostsByCategory;