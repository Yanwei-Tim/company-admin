import React, { Component } from 'react';
import { Modal, Form, Input,Switch } from 'antd';

const FormItem = Form.Item;

class AppModel extends Component {

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
    this.setState({
      visible: false,
    });
  };

  okHandler = () => {
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onOk(Object.assign({},values,{status:Number(values.status)}));
        this.hideModelHandler();
      }
    });
  };
  render() {
    const { children,title } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { thirdName, status,appUrl,iconUrl,manageUrl
    } = this.props.record;
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
              label="应用名称"
            >
              {
                getFieldDecorator('thirdName', {
                  initialValue: thirdName,
                  rules:[{
                    required:true,
                    message:'输入应用名称'
                  }]
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="业主端页面URL"
            >
              {
                getFieldDecorator('appUrl', {
                  initialValue: appUrl,
                  rules:[{
                    required:true,
                    message:'输入业主端页面'
                  }]
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="图标URL"
            >
              {
                getFieldDecorator('iconUrl', {
                  initialValue: iconUrl,
                  rules:[{
                    required:true,
                    message:'输入图标URL'
                  }]
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="物业端页面URL"
            >
              {
                getFieldDecorator('manageUrl', {
                  initialValue: manageUrl,
                  rules:[{
                    required:true,
                    message:'输入物业端页面'
                  }]
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="应用状态"
            >
              {
                getFieldDecorator('status', {
                  initialValue: Boolean(status),
                  valuePropName: 'checked'
                })(<Switch checkedChildren={'启用'} unCheckedChildren={'禁用'} />)
              }
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(AppModel);
