import React from 'react';
export default class CountDown extends React.Component {
    constructor(props) {
        super(props);
        const {times=60}=this.props;
        this.state = {
            countingDone:true,
            count:times,
            text:'获取验证码'
        }
    }
    componentDidMount(){
        const {auto=false}=this.props;
        if(auto){
            this._start();
        }

    }
    _start() {
        this._stop();
        const {intervalText=(sec)=>{sec + '秒重新获取'},times}=this.props;
        this.interval=setInterval(()=>{
           let count=this.state.count;
            count--;
           if(count===0){
                this._stop();
               this.setState({
                   count:times,
                   text:"获取验证码",
                   countingDone:true
               })
           }
           else {
               this.setState({
                   count,
                   text:intervalText(count)
               });

           }

        },1000)
    }
    _stop(){
        clearInterval(this.interval)
    }
    _sendVerifyCode(){
        const {setCode}=this.props;
       const valid=setCode();
       if(valid){
           this._start();
           this.setState({
               countingDone:false
           })
       }


    }
    render() {
        const styleObj = {
            color:"#fff",
            fontSize:16,
            fontWeight:"normal",
            textAlign:"center",
            margin:'0 auto',
            background:"#ee735c",
            width:120,
            height:40,
            lineHeight:'40px',
            marginTop:10,
            cursor:"pointer"
        };
        const {countType,auto,step,startText,endText,style}=this.props;
        return (
            <div>

                {
                    this.state.countingDone
                        ?<p style={{...styleObj,...style}} onClick={this._sendVerifyCode.bind(this)}>{this.state.text}</p>
                        : <div
                            style={{...styleObj,...style}}

                        >{this.state.text}</div>
                }
            </div>
        )
    }
}
