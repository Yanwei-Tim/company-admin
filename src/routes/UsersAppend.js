import React from 'react';
import { connect } from 'dva';
import { Table,Popconfirm,Row,Col} from 'antd';
import TreeComponent from '../components/Users/Tree';
    import UsersComponent from '../components/Users/Users'
import styles from './Company.less'
function Users({dispatch,loading,company,nodes,record}) {

    function createHandler(values) {
        dispatch({
            type: 'users/create',
            payload: values,
        });
    }

    function loadData(node){
        const {eventKey,isOrgan,title}=node.props;
        if(isOrgan){
          /*  dispatch({
                type: 'community/fetchByOrgan',
                payload: {orgId:eventKey}
            });*/
        }else {
            dispatch({
                type:"organization/fetchOnly",
                payload:{eid:eventKey}
            });
        }
    }
    function selectHandler({node}) {
       const {eventKey,eid,title,isOrgan}=node.props;
       if(isOrgan){
           dispatch({
               type:"users/record",
               payload:{
                   record:{
                       id:eventKey,
                       eid,
                       title
                   }
               }
           });
       }
    }
    function onPageChange(page) {
        dispatch({
            type:"company/fetch",
            payload:{page}
        });
    }
    return (
        <div>
            <Row>
                <Col span="6">
                    <TreeComponent rootData={company} nodesData={nodes} loadData={loadData} selectHandler={selectHandler}  onPageChange={onPageChange}/>
                </Col>
                <Col span="18">
                    <UsersComponent record={record} onOk={createHandler} loading={loading}/>
                </Col>
            </Row>
        </div>
    );
}
function  mapStateToProps(state) {
    const { record} = state.users;
    const {data}=state.company;
    const {nodes} =state.organization;
    return {
        loading: state.loading.models.users,
        company:data,
        nodes,
        record
    };
}
export default connect(mapStateToProps)(Users);