import React, { Component } from 'react';
import { Modal} from 'antd';
import {getToken} from '../../utils/index';
import constant from '../../utils/constant'
import AvatarEditor from '../../components/AvatarCropper/AvatarCropper';
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
  render() {
    const { children,onOk } = this.props;
    const { id,company} = this.props.record;
    return (
     <span>
        <span onClick={this.showModelHandler}>
          { children }
        </span>
        <Modal
          title="上传"
          visible={this.state.visible}
          onCancel={this.hideModelHandler}
          maskClosable={false}
          width={800}
          footer={null}
        >
          <AvatarEditor  token={getToken()} action={`/api/upload/uploadImg?appId=${constant.APP_ID}`}/>
        </Modal>
     </span>
    );
  }
}
export default CompanyModel;
