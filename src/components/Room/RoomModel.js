import React, { Component } from 'react';
import { Modal, Form, Input,Radio} from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
class RoomModel extends Component {

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
        const { id } = this.props.record;
        onOk(Object.assign({},values,{id}));
        this.hideModelHandler();
      }
    });
  };
  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { name, code,ownerName,ownerPhone,sex=1 } = this.props.record;
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
          title="编辑"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Form  onSubmit={this.okHandler}>
            <FormItem
              {...formItemLayout}
              label="编号"
            >
              {
                getFieldDecorator('code', {
                  initialValue: code,
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="房间号"
            >
              {
                getFieldDecorator('name', {
                  initialValue: name
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="业主"
            >
              {
                getFieldDecorator('ownerName', {
                  initialValue: ownerName
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="性别"
            >
              {
                getFieldDecorator('ownerSex', {
                  initialValue: sex
                })(
                  <RadioGroup >
                  <Radio value={1}>男</Radio>
                  <Radio value={0}>女</Radio>
                </RadioGroup>)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="业主手机"
            >
              {
                getFieldDecorator('ownerPhone', {
                  initialValue: ownerPhone
                })(<Input />)
              }
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}
export default Form.create()(RoomModel);
