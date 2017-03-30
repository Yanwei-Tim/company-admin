import React, { Component } from 'react';
import { Modal, Table } from 'antd';
import FilterModel from '../../components/Filter/Filter'
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
  };
  pageHandle=()=>{

  }
  render() {
    const { children,list ,loading} = this.props;
    const columns = [
      {
        title: '社区名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '地址',
        dataIndex: 'address',
        key: 'address'
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status'
      },
      {
        title: '操作',
        key: 'operation',
        render:(record)=>{

          return (<div className={styles['antd-operation-link']}>
            <Popconfirm title="确定开通?" onConfirm={okHandler}>
              <a href="javascript:void(0)">开通</a>
            </Popconfirm>
          </div>)
        }
      }
    ];
    const pagination={
      total:list.count,
      showTotal:(total)=> `共 ${total} 条数据`,
      pageSize:10,
      onChange:this.pageHandle,
    }
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
          title="社区应用"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Table
            columns={columns}
            dataSource={list.data}
            rowKey={record => record.id}
            pagination={pagination}
            loading={loading}
            size="small"
          />
        </Modal>
      </span>
    );
  }
}

export default AppModel;
