import React from 'react';
import { Link } from 'react-router-dom';
import * as API from '../utils/api';
import { capitalize } from '../utils/helpers';
import PageTemplate from '../templates/PageTemplate';
import Header from '../organisms/Header';
import { Card, Input, Select, Tag, Row, Col } from 'antd';

const Option = Select.Option;

class Index extends React.Component {
  state = {
    categories: [],
    posts: [],
  };

  componentDidMount() {
    API.getCategories()
      .then((res) => {
        this.setState({
          categories: res.categories,
        });
      });
    API.getPosts()
      .then((res) => {
        this.setState({
          posts: res,
        });
      });
  }

  render() {
    const { categories, posts } = this.state;

    return (
      <PageTemplate
        header={<Header/>}>
        <Row style={{marginBottom: 20}}>
          <Col span={12}>
            <Select style={{marginRight: 10}} size="small" defaultValue="Vote Count">
              <Option value="vote">Vote Count</Option>
              <Option value="timetamp">Timestamp</Option>
            </Select>

            {categories.map((category, index) => (
              <Link key={index} to={`/${category.path}/posts`}>
                <Tag color="blue">{capitalize(category.name)}</Tag>
              </Link>
            ))}
          </Col>
        </Row>

        <Row gutter={16}>
          {posts.map((post, index) => (
            <Col className="gutter-row" span={6} key={index}>
              <Card title={post.title} style={{ width: 300 }}>
                <p>{post.body}</p>
                <Link key={index} to={`/${post.category}/posts`}>
                  <Tag color="blue">{capitalize(post.category)}</Tag>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </PageTemplate>
    );
  }
}

export default Index;