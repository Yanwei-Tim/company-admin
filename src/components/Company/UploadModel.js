import React, { Component } from 'react';
import { Modal,Upload, Icon, message,Button,Spin } from 'antd';
import {getToken} from '../../utils/index'
class CompanyModel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      loading:false,
      tip:"后台数据正在执行导入"
    };
  }
  showModelHandler = (e) => {
    const {exec}=this.props;
    exec();
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
  okHandler=()=>{
    const { onOk } = this.props;
    onOk();
    this.hideModelHandler();
  }
  componentWillReceiveProps(nextProps){
    const {status}=nextProps;
    this.setState({
      loading: status&&status.isLoading,
      tip:"后台数据正在执行导入"
    });
  }
  render() {
    const { children,onOk } = this.props;
    const { id,company} = this.props.record;
    const that=this;
    const props = {
      name: 'file',
      action: `/api/enterprise/cloud/uploadExcel?eid=${id}`,
      headers: {
          token:getToken(),
          deviceTag:4
      },
      beforeUpload:(file) =>{
        let name=file.name;
        const isXlS = name.substr(name.lastIndexOf('.')+1).toLowerCase()==="xls";
        if (!isXlS) {
          message.error('请上传xls类型的文件');
        }
        return isXlS
      },
      onChange(info) {

        if (info.file.status !== 'uploading') {
          
        }
        if (info.file.status === 'done') {

        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 文件上传失败`);
          that.setState({
            visible:false,
            loading:false
          });
        }
      },
    };
    return (
     <span>
        <span onClick={this.showModelHandler}>
          { children }
        </span>
        <Modal
          title="数据导入"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
          maskClosable={false}
          okText="执行导入"
          confirmLoading={this.state.loading}
        >
          <Spin spinning={this.state.loading} tip={this.state.tip}>
              <h2>企业名称：{company}</h2>
              <br/>
             <Upload
               className="avatar-uploader"
               name="avatar"
               {...props}
             >
               <Button>
                  <Icon type="upload" /> 导入文件
              </Button>
            </Upload>
            </Spin>
        </Modal>
     </span>
    );
  }
}

export default CompanyModel;
