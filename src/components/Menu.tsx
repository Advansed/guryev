import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonCardTitle,
  IonButton,
} from '@ionic/react';

import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { archiveOutline, archiveSharp, bookmarkOutline, heartOutline, heartSharp, mailOutline, mailSharp, 
  paperPlaneOutline, paperPlaneSharp, trashOutline, trashSharp } from 'ionicons/icons';
import './Menu.css';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Главная',
    url: '/page/tab1',
    iosIcon: mailOutline,
    mdIcon: mailSharp
  },
  {
    title: 'Услуги',
    url: '/page/tab2',
    iosIcon: paperPlaneOutline,
    mdIcon: paperPlaneSharp
  },
  {
    title: 'Товары',
    url: '/page/tab3',
    iosIcon: heartOutline,
    mdIcon: heartSharp
  },
  {
    title: 'Новости',
    url: '/page/Archived',
    iosIcon: archiveOutline,
    mdIcon: archiveSharp
  },
  {
    title: 'О нас',
    url: '/page/Trash',
    iosIcon: trashOutline,
    mdIcon: trashSharp
  },
];

const labels = ['Акции', 'Бренды', 'Туры', 'Массаж'];

const Menu: React.FC = () => {
  const location = useLocation();

  const history = useHistory();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonItem lines="none">
            <IonListHeader class="a-center">МФУ24</IonListHeader>
              <img width="100" slot="end" src="assets/mfu24.png" alt="" />
          </IonItem>
          <IonItem lines="none">
            <IonCardTitle class="a-center">Управляй одним счетом</IonCardTitle>
            <IonMenuToggle>
              <IonButton onClick={()=>{ history.push("/page/log")}}> Войти </IonButton>
            </IonMenuToggle>
          </IonItem>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>

        <IonList id="labels-list">
          <IonListHeader>Возможности</IonListHeader>
          {labels.map((label, index) => (
            <IonItem lines="none" key={index}>
              <IonIcon slot="start" icon={bookmarkOutline} />
              <IonLabel>{label}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
