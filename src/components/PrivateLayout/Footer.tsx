import React from "react";
import {
  FacebookOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import styled from "styled-components";

const StyleFooter = styled.div`
  display: flex;
  max-width: 60vw;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 auto;
  height: 150px;
`

const StyleIcon = {
  fontSize: "50px",
  marginRight: "15px"
}

export default function Footer() {
  return (
    <StyleFooter>
      <div>
        <h1>INFORMATIONEN</h1>
        <ul>
          <li>Warum NachDenkSeiten</li>
          <li>Wer steckt dahinter</li>
          <li>Tipps zur Nutzung der</li>
        </ul>
      </div>
      <div>
        <h1>SOCIALMEDIA</h1>
        <FacebookOutlined style={StyleIcon} />
        <TwitterOutlined style={StyleIcon} />
        <YoutubeOutlined style={StyleIcon} />
      </div>
    </StyleFooter>
  );
}
