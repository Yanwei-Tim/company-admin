import React from 'react';
import { connect } from 'dva';
import {Row,Col} from 'antd'
function IndexPage({ location }) {
  return (
       <div>
         <Row gutter={24}>
           <Col span={6}>

           </Col>
           <Col span={6}>

           </Col>
           <Col span={6}>

           </Col>
           <Col span={6}></Col>
         </Row>







       </div>
  );
}
IndexPage.propTypes = {
};
export default connect()(IndexPage);
