import React from "react";
import DateInterval from "../../components/Date/DateInterval";
import Interval from "../../components/Date/Interval";
import OrbitCharts from "../../components/Orbit/OrbitCharts";
import SignatureComp from "../../components/Orbit/SignatureComp";
import Loading from "../../components/Patterns/Loading";
import Modals from "../../components/Patterns/Modals";
import Footer from "../../components/Structure/Footer";
import Header from "../../components/Structure/Header";
import * as S from './styled';

const OrbitDrift: React.FC = () => {
  // Display the Orbit Drift Interface

  return (
    <S.AppLayout>
      <Loading/>
      <Modals/>
      <Header>
        <S.VerticalWrapper>
            <S.HorizontalWrapper>
              <Interval />
            </S.HorizontalWrapper>
            <S.HorizontalWrapper>
              <DateInterval/>
            </S.HorizontalWrapper>
          </S.VerticalWrapper>
      </Header>
      <S.GridWrapper>
        <OrbitCharts />
        <SignatureComp />
      </S.GridWrapper>
      <Footer />
    </S.AppLayout>
  );
};
export default OrbitDrift;
