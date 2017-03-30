import React,{Component} from 'react';
import {Form, Input,Cascader,Row,Col,message,Button,Spin  } from 'antd';
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
  okHandler(id){
    const { onOk } = this.props;
    const {resetFields}=this.props.form;
    this.props.form.validateFields((err, values) => {
      const {lng,lat}=point;
      if (!err) {
        let organizationId=values.parents[values.parents.length-1];
        delete values.parents;
        onOk(Object.assign({},values,{gpsLongitude:lng,gpsLatitude:lat,id,organizationId}));
      }
    });
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const {id, name,address,gpsLatitude,gpsLongitude} = this.props.record;
    const { nodes,parents=[]} = this.props;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span:18},
    };
      const tailFormItemLayout = {
          wrapperCol: {
              span: 18,
              offset: 1,
          }
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
    const options = {
      value: nodes.id,
      label: nodes.nodeName,
      children: [],
    };
    const loop=(data=[],children)=>{
      data.map((item)=>{
        let obj={
          label:item.nodeName,
          value:item.id
        };
        children.push(obj);
        if(item.organizationList.length){
          obj.children=[];
          loop(item.organizationList,obj["children"])
        }
      })
    };
    loop(nodes.organizationList,options.children);
    return (
      <div style={{marginTop:50}}>
        <Spin spinning={this.props.loading}>
          <Form>
            <Row>
              <Col span={11}>
                <FormItem {...formItemLayout}
                          label="上级机构">
                    {
                        getFieldDecorator('parents', {
                            initialValue: parents.length===1?[nodes.id,parents[0]]:parents,
                            rules: [
                                {
                                    required: true,
                                    message: '请选择上级'
                                }
                            ]
                        })(<Cascader options={[options]}  changeOnSelect={true} placeholder=""/>)
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
                  <Button type="primary" onClick={this.okHandler.bind(this,id)} size="large">提交</Button>
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
