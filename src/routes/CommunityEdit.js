import React from 'react';
import { connect } from 'dva';
import {Row,Col} from 'antd';
import {routerRedux} from 'dva/router';
import CommunityComponent from '../components/Community/Community'
import TreeComponent from '../components/Community/Tree'
function Community({dispatch,location,company,nodes,orgId,organ}) {
    function editHandler(values) {
        dispatch({
            type: 'community/patch',
            payload:{id:location.query.id,...values} ,
        });
        dispatch(routerRedux.push({
            pathname: 'community',
            query:{orgId:location.state.community.organizationId} ,
        }));
    }
    function loadData(node){
        const {eventKey,isOrgan,title}=node.props;
        if(isOrgan){
            dispatch({
                type: 'community/fetchByOrgan',
                payload: {orgId:eventKey}
            });
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
                type:"community/organ",
                payload:{
                    organ:{
                        id:eventKey,
                        eid,
                        title
                    }
                }
            });
        }
    }
    return (
        <Row>
            <Col span={6}>
                <TreeComponent rootData={company} nodesData={nodes} loadData={loadData} selectHandler={selectHandler} orgId={orgId}/>
            </Col>
            <Col span={18}>
                <CommunityComponent onOk={editHandler} record={location.state.community} organ={organ} loading={false} />
            </Col>
        </Row>
    );
}

function mapStateToProps(state) {
    const {orgId,organ}=state.community;
    const {data,page}=state.company;
    const {nodes} =state.organization;
    return {
        loading: state.loading.models.community,
        company:data,
        page,
        nodes,
        orgId,
        organ

    };
}

export default connect(mapStateToProps)(Community);
