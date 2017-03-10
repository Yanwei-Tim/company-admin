import React from 'react';
import { connect } from 'dva';
function IndexPage({ location }) {
  return (
       <div>
            <h1>欢迎来到智慧云-智慧社区!</h1>
       </div>
  );
}
IndexPage.propTypes = {
};
export default connect()(IndexPage);
