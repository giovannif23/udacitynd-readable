import React from 'react';
import PageTemplate from '../templates/PageTemplate';
import Header from '../organisms/Header';
import { Button, Col, Form, Icon, Input, Tag, Row, Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

class PostCreate extends React.Component {
  render() {
    return (
      <PageTemplate
        header={<Header/>}>
        <Row>
          <Col span={12} offset={6}>
            <h1>Create Post</h1>

            <br />

            <Form style={{ width: '100%' }} layout="vertical" onSubmit={this.handleSubmit}>
              <FormItem label="Title">
                <Input
                  style={{ width: '100%' }}
                  value="" />
              </FormItem>

              <FormItem label="Body">
                <TextArea
                  rows={4}
                  style={{ width: '100%' }}
                  value="" />
              </FormItem>

              <FormItem label="Author">
                <Input
                  style={{ width: '100%' }}
                  value="" />
              </FormItem>

              <FormItem label="Category">
                <Select
                  style={{ width: '100%' }}
                  defaultValue="">
                  <Option value="react">React</Option>
                  <Option value="redux">Redux</Option>
                  <Option value="udacity">Udacity</Option>
                </Select>
              </FormItem>

              <Button type="primary" size="large">Save</Button>
            </Form>
          </Col>
        </Row>
      </PageTemplate>
    );
  }
}

export default PostCreate;