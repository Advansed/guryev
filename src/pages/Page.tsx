import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonButton, IonIcon } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import './Page.css';
import { Registration } from '../components/Registration';
import { Login } from '../components/Login';
import { Tab1, Applications, Market } from '../components/Functions';
import { Store } from './Store';
import { cartOutline } from 'ionicons/icons';


const jarr = [
  {name: "tab1",    title: "Главная",     JSX: function(): JSX.Element { return <Tab1 />}},
  {name: "tab2",    title: "Услуги",      JSX: function(): JSX.Element { 
    if(Store.getState().auth) return <Applications />; else return <></>
  }},
  {name: "tab3",    title: "Магазин",   JSX: function():JSX.Element { return <Market />}},
  // {name: "tab4",    title: "О программе", JSX: function():JSX.Element { return Store.getState().auth ? <></> : <></>}},
  {name: "reg",     title: "Регистрация", JSX: function():JSX.Element { return <Registration />}},
  {name: "log",     title: "Авторизация", JSX: function():JSX.Element { return <Login />}},
]

const Page: React.FC = () => {
  const [title, setTitle] = useState("Главная")

  const { name } = useParams<{ name: string; }>();

  useEffect(()=>{
    var commentIndex = jarr.findIndex(function(b) { 
        return b.name === name; 
    });
    if(commentIndex >= 0){
      setTitle(jarr[commentIndex].title)  
    }
  }, [name])



  function Content(props:{info}):JSX.Element {

    var commentIndex = jarr.findIndex(function(b) { 
        return b.name === props.info; 
    });
    if(commentIndex >= 0){
      return jarr[commentIndex].JSX()
    }
    return <></>
  }

  function Basket():JSX.Element {
    let elem = <></>
    if(title === "Магазин") 
      elem = (
        <IonButton slot="end" fill="clear">
          <IonIcon slot="icon-only" icon={ cartOutline }></IonIcon>
        </IonButton>
      )
    return elem;
  }

  return (
    <IonPage onLoad={(e)=>{
    }}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{ title }</IonTitle>
          <Basket />
        </IonToolbar>
      </IonHeader>

      <IonContent onLoad={(e)=>{
      }}>
        <Content info={ name } />
      </IonContent>
    </IonPage>
  );
};

export default Page;
