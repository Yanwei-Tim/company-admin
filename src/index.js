import dva from 'dva';
import {message} from 'antd'
import './index.html';
import './index.css';
import { createHashHistory } from 'history';
import { useRouterHistory } from 'dva/router';
import  createLoading from 'dva-loading'
import createLogger from 'dva-logger'
// 1. Initialize
const app = dva({
    history: useRouterHistory(createHashHistory)(),
    onError(err){
          message.info(err.message)
    }
});
app.model(require("./models/users"));

app.model(require("./models/room"));

app.model(require("./models/accredit"));

app.model(require("./models/role"));

app.model(require("./models/authorize"));

app.model(require("./models/organization"));

app.model(require("./models/building"));

app.model(require("./models/application"));

app.model(require("./models/community"));

app.model(require("./models/company"));

app.model(require("./models/login"));

app.model(require("./models/app"));

// 2. Plugins
app.use(createLoading({
  effects:{
    company:false
  }
}));
//app.use(createLogger());

// 3. Model
// app.model(require('./models/example'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
