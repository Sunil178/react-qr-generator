import React, { Component } from "react";
import { createGlobalStyle } from "styled-components";
import Content from "../components-styled/Content";
import ContentCenter from "../components-styled/ContentCenter";
import Input from "../components-styled/Input";
import InputContainer from "../components-styled/InputContainer";
import QRCode from '@devmehq/react-qr-code';

const GlobalStyle = createGlobalStyle`
body{margin:0;padding:0;font-family:Fira Sans,Helvetica Neue,Apple SD Gothic Neo,Malgun Gothic,Segoe UI,sans-serif;font-weight:200;}
`;

class App extends Component {
  state = {
    value: "",
  };

  onImageCownload = () => {
    const svg = document.getElementById("QRCode");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = "QRCode";
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  onValueChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const { value } = this.state;
    return (
      <div>
        <GlobalStyle />
        <Content>
          <ContentCenter>
            <div>
              <QRCode id="QRCode" title="Custom Title" value={value} />
            </div>
            <div style={{ height: "auto", margin: "0 auto", maxWidth: 64, width: "100%" }}>
              <QRCode
                id="QRCodeScaled"
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                title="Custom Title"
                value={value}
                viewBox={`0 0 256 256`}
              />
            </div>
            <InputContainer>
              <input type="button" value="Download QR" onClick={this.onImageCownload} />
              <Input type="text" value={value} onChange={this.onValueChange} />
            </InputContainer>
          </ContentCenter>
        </Content>
      </div>
    );
  }
}

export default App;
