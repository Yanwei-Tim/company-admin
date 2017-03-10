import React ,{Component}from 'react';
import { Form, Row, Col, Input, Button, Icon } from 'antd';
const FormItem = Form.Item;

class Search extends Component{
  constructor(props){
    super(props);
  }
  submitHandler(){
    const {onSearch}=this.props;
    this.props.form.validateFields((err,values)=>{
        if(!err){
          onSearch(values)
        }
    })
  }
  render(){
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: { span:0 },
      wrapperCol: { span: 20},
    };
    return (
      <div>
        <Form horizontal onSubmit={this.submitHandler.bind(this)}>
          <Row>
            <Col span="6">
              <FormItem {...formItemLayout} label=''>
                {getFieldDecorator(`number`)(
                  <Input placeholder="房间编号"/>
                )}
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem {...formItemLayout} label=''>
                {getFieldDecorator(`houseNumber`)(
                  <Input placeholder="房间号"/>
                )}
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem {...formItemLayout} label=''>
                {getFieldDecorator(`ownerName`)(
                  <Input placeholder="业主"/>
                )}
              </FormItem>
            </Col>
            <Col span="6">
              <Button type="primary" htmlType="submit" >搜索</Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default Form.create()(Search);
