import React from 'react';
import { Router, Route,IndexRoute } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Users from "./routes/Users.js";
import App from "./routes/App.js";
import Login from "./routes/Login"
import Company from "./routes/Company.js";
import Community from "./routes/Community.js";
import Community_Append from "./routes/CommunityAppend.js";
import Application from "./routes/Application.js";
import ApplicationAppend from "./routes/ApplicationAppend.js";
import ApplicationEdit from "./routes/ApplicationEdit.js";
import Building from "./routes/Building.js";
import BuildingAppend from "./routes/BuildingAppend.js";
import Organization from "./routes/Organization.js";
import Authorize from "./routes/Authorize.js";
import Role from "./routes/Role.js";
import Accredit from "./routes/Accredit.js";
import AccreditCompany from "./routes/AccreditCompany.js";
import AccreditCommunity from "./routes/AccreditCommunity.js";
import Room from "./routes/Room.js";
import UsersAppend from "./routes/UsersAppend.js";
import AccreditUsers from "./routes/AccreditUsers.js";
import CommunityEdit from "./routes/CommunityEdit.js";
import Register from "./routes/Register.js";
function RouterConfig({ history}) {
  function requireAuth(props) {
  }
  return (
    <Router history={history} onUpdate={requireAuth}>
      <Route  component={App} >
        <Route path="/home" component={IndexPage} breadcrumbName="首页"   />
        <Route path="/users" component={Users} breadcrumbName="员工管理" />
         <Route path="/users"  breadcrumbName="员工管理">
             <Route path="/users/append" component={UsersAppend} breadcrumbName="新增员工"/>
             <Route path="/accredit/users" component={AccreditUsers} breadcrumbName="授权"/>
         </Route>
        <Route path="/company" component={Company} breadcrumbName="企业管理"/>
        <Route path="/community" component={Community} breadcrumbName="社区管理" />
        <Route path="/community" breadcrumbName="社区管理">
             <Route path="/community/append" component={Community_Append} breadcrumbName="新增社区"/>
             <Route path="/community/edit" component={CommunityEdit} breadcrumbName="编辑社区"/>
             <Route path="/accredit/community" component={AccreditCommunity} breadcrumbName="社区授权"/>
        </Route>
        <Route path="/application" component={Application} breadcrumbName="应用管理"/>
        <Route path="/application/append" component={ApplicationAppend} breadcrumbName="应用接入"/>
        <Route path="/application/conf" component={ApplicationEdit} breadcrumbName="应用配置"/>
        <Route path="/building" component={Building} breadcrumbName="楼宇管理" />
        <Route path="/building/append" component={BuildingAppend} breadcrumbName="新增楼宇" />
        <Route path="/organization" component={Organization} breadcrumbName="组织机构" />
        <Route path="/authorize" component={Authorize} breadcrumbName="权限管理"/>
        <Route path="/role" component={Role} breadcrumbName="角色管理"/>
        <Route path="/accredit" component={Accredit} breadcrumbName="绑定权限"/>
        <Route path="/accredit/company" component={AccreditCompany} breadcrumbName="企业授权"/>
        <Route path="/room" component={Room} breadcrumbName="房间管理"/>
      </Route>
      <Route path="/" >
        <IndexRoute component={Register}/>
      </Route>
      <Route path="/login" component={Login}/>
      <Route path="/register" component={Register} />
    </Router>
  );
}
export default RouterConfig;
