import {
  IonText,
  IonButton,
} from "@ionic/react";
import React from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import 'swiper/css';
import OBXVacayPNG from "../assets/obx_vacay.png";
import "./Intro.css";

interface ContainerProps {
  onFinish: () => void;
}

const SwiperButtonNext = ({ children }: any) => {
  const swiper = useSwiper();
  return <IonButton onClick={() => swiper.slideNext()}>{children}</IonButton>;
};

const Intro: React.FC<ContainerProps> = (onFinish) => {
  return (
    <Swiper>
      <SwiperSlide>
        <img src={OBXVacayPNG} alt="OBX Vacay" />
        <IonText>
          <h3>Welcome to OBX Vacay!</h3>
        </IonText>
        <SwiperButtonNext>Next</SwiperButtonNext>
      </SwiperSlide>

      <SwiperSlide>
        <img src={OBXVacayPNG} alt="OBX Vacay" />
        <IonText>
          <h3>You're gonna love it here!</h3>
        </IonText>
        <SwiperButtonNext>Next</SwiperButtonNext>
      </SwiperSlide> 

      <SwiperSlide>
        <img src={OBXVacayPNG} alt="OBX Vacay" />
        <IonText>
          <h3>Press Finish to get started!</h3>
        </IonText>
        <IonButton onClick={() => onFinish}>Finish</IonButton>
      </SwiperSlide> 
    </Swiper>
  );
};

export default Intro;
