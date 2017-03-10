import React,{Component} from 'react';
import { Menu,Icon,Button } from 'antd';
import { Link } from 'dva/router';
import styles from './main.less'
const SubMenu = Menu.SubMenu;

class Header extends Component{
  constructor(props){
    super(props)
  }
  componentWillReceiveProps(nextProps){
    const {isLogout,logoutSuccess}=nextProps;
    if(isLogout==-1){
      logoutSuccess();
    }
  }
  render(){
    const {user,logout}=this.props;
    return (
      <div className={styles.header}>
        <Menu className="header-menu" mode="horizontal" >
          <SubMenu style={{ float: 'right' }}
                   title={<span><Icon type="user" />{user}</span>}
          >
            <Menu.Item key="logout">
              <a href="javascript:void(0)" onClick={logout}>注销</a>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    );
  }


}

export default Header;
