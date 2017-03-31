import React from 'react';
import {Menu,Button,Icon,Switch} from 'antd';
import {Link} from 'dva/router';
import styles  from './Sider.less';
import classnames from 'classnames';
const SubMenu = Menu.SubMenu;
class Sider extends React.Component{
  constructor(props){
    super(props)
  }
  componentDidUpdate(){
    this.props.setHeight(this.refs.sider.clientHeight)
  }
  render(){
    const {pathname,search,query}=this.props.location;
    const {list=[]}=this.props;
    const {tools,users,lock,vcard,popup,cog,bag,active,container,toolsActive,usersActive,lockActive,vcardActive,popupActive,cogActive,bagActive,role,roleActive}=styles;
    const linkStyle=(name,activeStyle,path)=>{
      const link=pathname+search;
      return classnames({
        [name]:true,
        [active]:link===path,
        [activeStyle]:link===path
      })
    };
    return (
      <div className={container} id="sider" ref="sider">
        <dl className={styles['menu-group']}>
          <dt>管理</dt>
          <dd className={linkStyle(tools,toolsActive,'/community'+search)}><Link to="community">社区管理</Link></dd>
          <dd className={linkStyle(users,usersActive,'/users'+search)}><Link to="users">员工管理</Link></dd>
          <dd className={linkStyle(lock,lockActive,'/authorize'+search)}><Link to="authorize">权限管理</Link></dd>
          <dd className={linkStyle(role,roleActive,'/role'+search)}><Link to="role">角色管理</Link></dd>
        </dl>
        <dl className={styles['menu-group']}>
          <dt>企业</dt>
          <dd className={linkStyle(vcard,vcardActive,'/company'+search)}><Link to="company">企业信息</Link></dd>
          <dd className={linkStyle(popup,popupActive,'/organization'+search)}><Link to="organization">组织机构</Link></dd>
        </dl>
        <dl className={styles['menu-group']}>
          <dt>应用</dt>
          {/*<dd className={linkStyle(cog,cogActive,'system')}><Link to="system">系统设置</Link></dd>*/}
          {
            list.map((item)=>{
              let image=item.iconUrl;
              let type=".jpg";
              if(image){
                type=image.substr(image.lastIndexOf('.'),image.length);
                image=image.substr(0,image.lastIndexOf('.'));
              }
              image+=image+"_menu"+type;
              let linkProps={
                pathname:item.groupFlag===0?`/application/info`:`/application/community`,
                query:{id:item.id,key:item.groupFlag},
                state:{record:item}
              };
              let style={
                backgroundImage:`url(${image})`
              };
              if(query.id===item.id){
                return (<dd key={item.id} className={[styles.appIcon,active].join(" ")} style={style} ><Link to={linkProps}>{item.name}</Link></dd>)
              }
              return (<dd key={item.id} className={styles.appIcon} style={style} ><Link to={linkProps}>{item.name}</Link></dd>)
            })
          }
          <dd >
            <div className={styles.appendApp}>
              <Link to="application">
                <Icon type="plus" /> 添加应用功能
              </Link>
            </div>
          </dd>
        </dl>
      </div>
    );
  }
}
export default Sider;