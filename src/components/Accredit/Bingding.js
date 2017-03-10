import React,{Component} from 'react';
import {Transfer,Spin,Button,Pagination} from 'antd';
class Bingding extends Component{
  constructor(props){
    super(props);
    this.state={
      targetKeys:[]
    };
  }
  handleChange=(targetKeys)=>{
    this.setState({targetKeys});
  };
  handleSubmit(){
    const {onOk}=this.props;
    onOk(this.state.targetKeys)
  };
  componentWillReceiveProps(nextProps){
    this.setState({
      targetKeys:nextProps.targetKeys
    })
  };
  render(){
    const {dataSource,loading} =this.props;
    let data = [];
    dataSource.data&&dataSource.data.map((item)=>{
      data.push({
        key: item.id,
        title: item.name,
        description: item.name,
        disabled: item.disable
      });
    });
    const footerRender=(props)=>{
      const pageProps={
        total:dataSource.count,
        simple:true,
        pageSize:20
      };
      if(props.titleText=='全部'){

      }else if(props.titleText=='授权'){
        return (
          <div style={{"margin":"10px auto","textAlign":"right","paddingRight":"10px"}}>
            <Button type="primary" onClick={this.handleSubmit.bind(this)}>提交</Button>
          </div>)
      }
    };
    const transferProps={
      titles:['全部', '授权'],
      searchPlaceholder:'搜索',
      notFoundContent:'列表为空',
      listStyle:{
        width:300,
        height:450
      },
      operations:['添加', '删除'],
      render:(item)=>item.title,
      onChange:this.handleChange,
      footer:footerRender
    };
    return (
      <Spin spinning={loading}>
          <Transfer
            targetKeys={this.state.targetKeys}
            dataSource={data}
            {...transferProps}
          />
      </Spin>
    );
  }
}
export default Bingding;
