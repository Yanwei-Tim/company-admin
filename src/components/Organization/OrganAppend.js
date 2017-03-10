import React, { Component } from 'react';
import { Modal, Form, Input,Select,Button } from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;

class OrganModel extends Component {

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
  okHandler=()=> {
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let result=Object.assign({},values,{nodeName:values.node_Name});
        delete result.node_Name;
        onOk(result);
        this.hideModelHandler();
      }
    });
  };
  render() {
    const {children,title }=this.props;
    const {getFieldDecorator}=this.props.form;
    const {nodeName,id,nodeFlag,eid,company}=this.props.record;
    const node_Name=nodeName;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 16},
    };
    const tailFormItemLayout = {
      wrapperCol: {
        span: 8,
        offset: 4,
      },
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
             <Form horizontal onSubmit={this.okHandler.bind(this)}>
               <FormItem {...formItemLayout} label='所属企业' style={{'display':'none'}}>
                {getFieldDecorator('eid',{
                  initialValue:eid,
                  rules:[
                    {
                      required: true,
                      message: '请选择企业'
                    }
                  ]
                })(
                  <span className="ant-form-text"></span>
                )}
              </FormItem>
               <FormItem {...formItemLayout} label='上级机构'>
                {getFieldDecorator('parentId',{
                  initialValue:id,
                  rules:[
                    {
                      required: true,
                      message: '请选择上级机构'
                    }
                  ]
                })(
                  <span className="ant-form-text">{node_Name}</span>
                )}
              </FormItem>
               <FormItem {...formItemLayout} label='机构名称'>
                {getFieldDecorator('node_Name',{
                  initialValue:'',
                  rules:[
                    {
                      required: true,
                      message: '请填写机构名称'
                    }
                  ]
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label='机构标志'>
                {getFieldDecorator('nodeFlag',{
                  initialValue:(nodeFlag+1).toString(),
                  rules:[
                    {
                      required: true,
                      message: '机构标识'
                    }
                  ]
                })(
                  <Select>
                    <Option value="0">总部</Option>
                    <Option value="1">大区公司</Option>
                    <Option value="2">省级公司</Option>
                    <Option value="3">市级公司</Option>
                    <Option value="4">县级公司</Option>
                    <Option value="9">部门</Option>
                    <Option value="10">岗位</Option>
                  </Select>
                )}
              </FormItem>
              </Form>
        </Modal>
      </span>
    );
  }
}
export default Form.create()(OrganModel);
