import React,{Component} from 'react';
import { Modal, Form, Input,Cascader,Row,Col,message,Button,Spin  } from 'antd';
import MapComponent from '../../components/Map/Map';
const FormItem = Form.Item;
const Search = Input.Search;

let point={};
class Community extends Component{
  constructor(props){
    super(props);
    this.state={
      city:null,
      lng:null,
      lat:null
    }
  }
  onSelect(p){
      point=p;
  }
  onSearch(value){
     this.setState({
        address:value
      });
  }
  okHandler(){
    const { onOk } = this.props;
    const {resetFields}=this.props.form;
    this.props.form.validateFields((err, values) => {
      const {lng,lat}=point;
      if (!err) {
        onOk(Object.assign({},values,{gpsLongitude:lng,gpsLatitude:lat}));
      }
    });
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const { name,address,gpsLatitude,gpsLongitude,organizationId,orgTitle} = this.props.record;
    const { title,id} = this.props.organ;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span:19},
    };
      const tailFormItemLayout = {
          wrapperCol: {
              span: 12,
              offset: 1,
          },
      };
    const mapProps={
      city:null,
      lng:gpsLongitude,
      lat:gpsLatitude,
      onSelect:this.onSelect.bind(this),
      onMessage:(err)=>{
         message.info(err)
      },
      style:{
        height:"420px",
        width:"100%"
      }
    }

    return (
      <div>
        <Spin spinning={this.props.loading}>
          <Form>
            <Row>
              <Col span={11}>
                <FormItem {...formItemLayout}
                          label="组织机构">
                    {
                        getFieldDecorator('organizationId', {
                            initialValue: id||organizationId,
                            rules: [
                                {
                                    required: true,
                                    message: '请选择组织机构'
                                }
                            ]
                        })(<span className="ant-form-text">{title||orgTitle}</span>)
                    }
                </FormItem>
              </Col>
              <Col span={8}></Col>
            </Row>
            <Row>
              <Col span={11}>
                <FormItem
                    {...formItemLayout}
                    label="社区名称"
                >
                    {
                        getFieldDecorator('name', {
                            initialValue: name,
                            rules: [
                                {
                                    required: true,
                                    message: '请填写社区名称'
                                }
                            ]
                        })(<Input />)
                    }
                </FormItem>
              </Col>
              <Col span={8}></Col>
            </Row>
            <Row>
              <Col span={11} >

                <FormItem
                    {...formItemLayout}
                    label="详细地址"
                >
                    {
                        getFieldDecorator('address', {
                            initialValue: address,
                            rules: [
                                {
                                    required: true,
                                    message: '请填写详细地址'
                                }
                            ],
                        })(<Search
                            placeholder=""
                            onSearch={this.onSearch.bind(this)}
                        />)
                    }
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem {...tailFormItemLayout} >
                  <Button type="primary" onClick={this.okHandler.bind(this)} size="large">提交</Button>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <FormItem {...tailFormItemLayout} >
                <MapComponent {...mapProps} city={this.state.city} address={this.state.address}/>
              </FormItem>
            </Row>

          </Form>
        </Spin>
      </div>
    )
  }
}
export default Form.create()(Community);
