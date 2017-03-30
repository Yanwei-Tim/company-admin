import React from 'react';
import { connect } from 'dva';
import { Table,Tag} from 'antd';

function Authorize({data,loading}) {
  const columns = [
    {
      title: '权限编号',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '权限名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '标记',
      dataIndex: 'flag',
      key: 'flag ',
      render:(text)=>{
        switch (text){
          case 1:
            return '企业权限';
            break;
          case 2:
            return '社区权限';
            break;
          case 3:
            return '运营后台';
            break;
        }
      }
    },
    {
      title: '状态',
      dataIndex: 'disable',
      key: 'disable',
      render:(text)=>{
        return(text?<span style={{color:"#ff5a60"}}>禁用</span>:<span style={{color:"#00a510"}}>启用</span>)
      }
    }
  ];
  const pagination={
    total:data.count,
    showTotal:(total)=> `共 ${total} 条记录`,
    pageSize:10,
  };
  return (
    <div>
      <Table
        columns={columns}
        dataSource={data.data}
        rowKey={record => record.id}
        pagination={pagination}
        loading={loading}
      />
    </div>
  );
}
function mapStateToProps(state) {
  const { data} = state.authorize;
  return {
    loading: state.loading.models.authorize,
    data
  }
}
export default connect(mapStateToProps)(Authorize);
