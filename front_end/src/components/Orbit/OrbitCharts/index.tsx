import React, { createRef, useEffect } from "react";
import { connect } from "react-redux";
import { Chart, registerables } from 'chart.js';
import { StoreInterface } from "../../../redux/storage/store";
import BaseChart from "../../Patterns/Chart";
import control from "../../../controllers/Chart";
import { optionsOrbit } from "./config";
import { fetchSignatureOrbit } from "../../../controllers/simulation";
import { buildDatasetOrbit } from "../../../controllers/Chart/functions";
import { BaseMagnet } from "../../../controllers/Orbit/interfaces";
import { BaseDateInterface } from "../../../controllers/Time/interfaces";
import { OrbitDispatcher } from "../../../redux/dispatcher";
import * as S from './styled';

function mapStateToProps(state: StoreInterface){
  const {start_date, end_date, change_time} = state.time;
  const {change_orbit, signatures} = state.orbit;

  return {
    changeTime: change_time,
    start: new Date(start_date),
    end: new Date(end_date),
    sign_list: JSON.parse(signatures),
    changeOrbit: change_orbit
  }
}

const OrbitCharts: React.FC<BaseDateInterface& {sign_list: BaseMagnet, changeOrbit: boolean, changeTime: boolean}> = (props) => {
  Chart.register(...registerables);
  const chartXRef = createRef();
  const chartYRef = createRef();

  useEffect(() => {
    updateChartOrbit();
  }, [props.changeOrbit, props.changeTime])

  async function updateChartOrbit() {
    control.setOptions(1, optionsOrbit);
    control.setOptions(2, optionsOrbit);
    const datasetList = await buildChartOrbit();
    await control.buildChartDatasets(datasetList[0], 1);
    await control.buildChartDatasets(datasetList[1], 2);
    OrbitDispatcher.setChangeOrbit(false);
  }

  function saveDataset(name: string, sign_orbit: Array<number>, datasetList: any){
    const datasetTemp = {
      data: buildDatasetOrbit(sign_orbit),
      xID: 'x',
      label: name
    }
    datasetList.push(datasetTemp);
    return datasetList;
  }

  function dictToList(sign_list: BaseMagnet){
    let signatures: any = [];
    Object.entries(sign_list).map(([name, elem_info]: any) => {
      signatures.push(elem_info);
    })
    return signatures
  }

  async function buildChartOrbit(){
    let datasetListX: any = []
    let datasetListY: any = []
    const dictSign = await fetchSignatureOrbit(
      dictToList(props.sign_list), props.start, props.end);
    await Promise.all(
      Object.entries(dictSign).map(async ([name, sign_orbit]: any) => {
        if(name!='cod_rebuilt'){
          const last_char = name.length-1
          name = name.substring(0, last_char) +
            '-Kick '+name.slice(-1)
        }
        datasetListX = saveDataset(
          name, sign_orbit[0], datasetListX);
        datasetListY = saveDataset(
          name, sign_orbit[1], datasetListY);
      })
    );
    return [datasetListX, datasetListY];
  };


  return(
    <S.ChartWrapper>
      COD X
      <BaseChart
        id={1}
        options={optionsOrbit}
        reference={chartXRef}/>
      COD Y
      <BaseChart
        id={2}
        options={optionsOrbit}
        reference={chartYRef}/>
    </S.ChartWrapper>
  );
};

export default connect(mapStateToProps)(OrbitCharts);
