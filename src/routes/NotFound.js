import React from 'react';
import { connect } from 'dva';
import HeaderComponent from '../components/OutSide/Header';
import FooterComponent from '../components/OutSide/Footer';
import NotFoundComponent from '../components/NotFound/404';
function NotFound({ location }) {
    return (
        <div>
          <HeaderComponent/>
          <NotFoundComponent/>
          <FooterComponent/>
        </div>
    );
}
NotFound.propTypes = {
};
export default connect()(NotFound);
