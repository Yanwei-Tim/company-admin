import React from 'react';
import { connect } from 'dva';
function NotFound({ location }) {
    return (
        <div>
            <h1>404 NotFound</h1>
        </div>
    );
}
NotFound.propTypes = {
};
export default connect()(NotFound);
