import React from "react";
import control from "../../../controllers/Modals";
import { modalInfo } from "../../../assets/constants/patterns";
import { iconList } from "../../../assets/constants/icons";
import { alert_messages } from "../../../assets/constants/text";
import * as S from './styled';


const Message: React.FC = () => {

  // Handle error message
  function chartUpdateText(): string {
    if(control.getModalId() !== "Err_Server"){
      return "and the chart is being updated!"
    }
    return ""
  }

  return(
    <S.TextWrapper>
      {alert_messages[control.getModalId()]}
      <br/>
      {chartUpdateText()}
      <br/>
      Action:
        <S.Icon
          icon={
            iconList[
              modalInfo[control.getModalId()].icon]}/>
    </S.TextWrapper>
  );
};

export default Message;
