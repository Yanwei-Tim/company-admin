import React, { Component } from 'react';
import { Modal, Form, Input,Select,Switch  } from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;

class AuthorizeModel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }
  showModelHandler = (e) => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true,
    });
  };

  hideModelHandler = () => {
    this.props.form.resetFields();
    this.setState({
      visible: false,
    });
  };

  okHandler = () => {
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onOk(values);
        this.hideModelHandler();
      }
    });
  };
  render() {
    const { children,title } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { code, name,flag,disable} = this.props.record;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <span>
        <span onClick={this.showModelHandler}>
          { children }
        </span>
        <Modal
          title={title}
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Form horizontal onSubmit={this.okHandler}>
            <FormItem
              {...formItemLayout}
              label="权限编号"
            >
              {
                getFieldDecorator('code', {
                  rules:[
                    {
                      required:true,
                      message:'请填写编号'
                    }
                  ],
                  initialValue: code,
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="权限名称"
            >
              {
                getFieldDecorator('name', {
                  rules:[
                    {
                      required:true,
                      message:'请填写名称'
                    }
                  ],
                  initialValue: name,
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="权限类别"
            >
              {
                getFieldDecorator('flag', {
                  rules:[
                    {
                      required:true,
                      message:'请选择类别'
                    }
                  ],
                  initialValue: flag?flag.toString():'',
                })(
                  <Select>
                    <Option value="1">企业权限</Option>
                    <Option value="2">社区权限</Option>
                    <Option value="3" >运营后台</Option>
                  </Select>
                )
              }
            </FormItem>
           {/* <FormItem
              {...formItemLayout}
              label="权限状态">
              {
                getFieldDecorator('disable', {
                  initialValue: !disable,
                  valuePropName: 'checked'
                })(<Switch checkedChildren={'启用'} unCheckedChildren={'禁用'} />)
              }
            </FormItem>*/}
          </Form>
        </Modal>
      </span>
    );
  }
}
export default Form.create()(AuthorizeModel);
