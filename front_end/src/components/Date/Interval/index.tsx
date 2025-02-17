import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { changeInterval, getIntervalFromMilliseconds, getTimeMilliseconds } from "../../../controllers/time";
import { intervals } from "../../../assets/constants/date";
import { DateInfoInterface, IntervalBtnsInterface } from "../../../assets/interfaces/date";
import { StoreInterface } from "../../../redux/storage/store";
import * as S from './styled';

function mapStateToProps(state: StoreInterface){
  const {time_mode, interval_mil, start_date, end_date } = state.time;
  return {
    intervalMil: interval_mil,
    intervalMode: time_mode,
    start: new Date(start_date),
    end: new Date(end_date)
  }
}

const defaultProps: IntervalBtnsInterface = {
  intervalMode: 'End',
  start: new Date(),
  end: new Date(),
  intervalMil: getTimeMilliseconds("Hour")
};

const Interval: React.FC<IntervalBtnsInterface> = (props): React.ReactElement => {
  // Component that displays the buttons for the interval selection
  // Interval Selected
  const [selIntBtn, setIntBtn] = useState(
    getIntervalFromMilliseconds(props.intervalMil));

  // Detect change visualization of hte selected interval,
  // if date is based on the interval
  useEffect(() => {
    const timeArray = intervals[selIntBtn];
    if(timeArray){
      setInterval(parseFloat(timeArray[0]), timeArray[1], selIntBtn)
    }
  },[selIntBtn]);

  // Update dates on change selected interval
  function setInterval(time: number, unit: string, name: string): void{
    const dateInfo: DateInfoInterface = {
      start: props.start,
      end: props.end,
      refDate: new Date()
    }
    changeInterval(
      dateInfo, time, unit, props.intervalMode);
    setIntBtn(name);
  }

  // Displays all the interval buttons
  function timeInterval(): React.ReactElement[] | string{
    if(props.intervalMode !== 'None'){
      return Object.entries(intervals).reverse().map(([name, data]: [key: string, value: Array<string>]) => {
        let stateBtn: boolean = false;
        if(selIntBtn === name){
          stateBtn = true;
        }
        return(
          <S.IntervalBtn
            key={name}
            onClick={()=>setInterval(Number(data[0]), data[1], name)}
            state={stateBtn}>
              {name}
          </S.IntervalBtn>
        );
      });
    }
    return ''
  }

  return (
    <S.ItemWrapper>
      {timeInterval()}
    </S.ItemWrapper>
  );
};

Interval.defaultProps = defaultProps;
export default connect(mapStateToProps)(Interval);
