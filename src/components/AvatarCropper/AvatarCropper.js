import React from 'react';
import {Row,Col,Slider,InputNumber,Button,Upload,Icon,Input} from 'antd';
import ReactAvatarEditor from 'react-avatar-editor'
const ButtonGroup = Button.Group;
class App extends React.Component {
  state = {
    position: { x: 0.5, y: 0.5 },
    scale: 1,
    rotate: 0,
    borderRadius: 0,
    width: 300,
    height:300,
    image:"data:image/jpeg;base64,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"
  }


  handleSave = (data) => {
    const img = this.editor.getImageScaledToCanvas().toDataURL();
    const rect = this.editor.getCroppingRect();
    console.log(img)
  }
  handleScale = (value) => {
    const scale = parseFloat(value);
    this.setState({ scale })
  }

  rotateLeft = (e) => {
    e.preventDefault()

    this.setState({
      rotate: this.state.rotate - 90
    })
  }

  rotateRight = (e) => {
    e.preventDefault()
    this.setState({
      rotate: this.state.rotate + 90
    })
  }

  handleBorderRadius = (value) => {
    const borderRadius = parseInt(value)
    this.setState({ borderRadius })
  }

  handleXPosition = (value) => {
    const x = parseFloat(value);
    this.setState({ position: { ...this.state.position, x } })
  }

  handleYPosition = (value) => {
    const y = parseFloat(value);
    this.setState({ position: { ...this.state.position, y } })
  }

  handleWidth = (value) => {
    const width = parseInt(value);
    this.setState({ width })
  }
  handleHeight = (value) => {
    const height = parseInt(value);
    this.setState({ height })
  }
  logCallback (e) {

  }
  setEditorRef = (editor) => {
    if (editor) this.editor = editor
  };
  handlePositionChange = position => {
    this.setState({ position })
  };
  handleFileChange=(e)=>{
    const  images=this.refs.file.files;
    if(images.length===0){return;}
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      if(reader.readyState===2){
        this.setState({
          image:reader.result
        })
      }
    });
    reader.readAsDataURL(images[0]);
  }
  render () {
    return (
      <div>
        <Row gutter={24}>
          <Col span={12}>
              <input type="file" onChange={this.handleFileChange} accept ref="file" style={{

              }}/>
              <ReactAvatarEditor
                ref={this.setEditorRef}
                scale={parseFloat(this.state.scale)}
                width={this.state.width}
                height={this.state.height}
                position={this.state.position}
                onPositionChange={this.handlePositionChange}
                rotate={parseFloat(this.state.rotate)}
                borderRadius={this.state.borderRadius}
                onSave={this.handleSave}
                onLoadFailure={this.logCallback.bind(this, 'onLoadFailed')}
                onLoadSuccess={this.logCallback.bind(this, 'onLoadSuccess')}
                onImageReady={this.logCallback.bind(this, 'onImageReady')}
                onImageLoad={this.logCallback.bind(this, 'onImageLoad')}
                onDropFile={this.logCallback.bind(this, 'onDropFile')}
                image={this.state.image}
              >
              </ReactAvatarEditor>
          </Col>
          <Col span={12}>
            缩放
            <Slider onChange={this.handleScale} defaultValue={1} step={0.01}/>
            圆角
            <Slider onChange={this.handleBorderRadius} defaultValue={0} step={1}/>
            宽度
            <InputNumber onChange={this.handleWidth}  min={50} max={400} value={this.state.width} style={{marginRight:20,marginLeft:10,marginBottom:10}}/>
            高度
            <InputNumber onChange={this.handleHeight}   min={50} max={400} value={this.state.height} style={{marginRight:20,marginLeft:10,marginBottom:10}}/>
            <br/>
            上下移动
            <Slider onChange={this.handleXPosition} defaultValue={0} step={0.01} value={this.state.position.x}  min={0}  max={1}/>
            左右移动
            <Slider onChange={this.handleYPosition} defaultValue={0} step={0.01} value={this.state.position.y}  min={0}  max={1}/>
            旋转
            <ButtonGroup style={{marginLeft:10}}>
               <Button onClick={this.rotateLeft}>左</Button>
               <Button onClick={this.rotateRight}>右</Button>
            </ButtonGroup>
          </Col>
        </Row>
        <Button onClick={this.handleSave}>提交</Button>
      </div>
    )
  }
}
export default  App;
