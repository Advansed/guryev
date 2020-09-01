import React, { useState } from "react"
import { getData } from "../pages/Store"
import { IonLoading, IonRow, IonText, IonList, IonItem, IonLabel, IonInput, IonButton, IonAlert } from "@ionic/react"
import MaskedInput from "../mask/reactTextMask"
import './Registration.css'
import { useHistory } from "react-router-dom"

let regData = {
    Куратор:  "",
    ФИО:      "",
    Телефон:  "",
    Пароль:   "",
    Пароль1:  "",
}

export function     Registration():JSX.Element {
    const [load, setLoad] = useState(false)
    const [state, setState] = useState(0)
    const [mess, setMess] = useState("")

    const hist = useHistory();

    async function Reg(){

        if(regData.Пароль === regData.Пароль1){
            setLoad(true)

            let res = await getData("Регистрация", regData)

            setMess( res.Описание )
            setState( res.Код )

            setLoad(false)
            
        } else {
            setMess("Пароли не совпадают")
            setState(200)
        }
    }

    let elem = <>
      <IonLoading isOpen={ load }  message={'Подождите...'}/>
      <div className="rgDiv">
        <IonRow>
          <IonText class="rgText1">
              Регистрация
          </IonText>
        </IonRow>
        <IonRow>
          <IonText class="rgText3">
            Пожалуйста введите ваши данные
          </IonText>
        </IonRow>
      </div>
      <IonList class="rgList1">
        <IonItem>
            <IonLabel position="stacked">Куратор</IonLabel>
            <IonInput placeholder="Введите реф. номер или л/с" 
                value={ regData.Куратор }
                onIonChange={(e)=>{
                    regData.Куратор = e.detail.value as string;
                }}
            />
         </IonItem>
        <IonItem>
            <IonLabel position="stacked">ФИО</IonLabel>
            <IonInput placeholder="Иван Иванович И." 
                value={ regData.ФИО }
                onIonChange={(e)=>{
                    regData.ФИО = e.detail.value  as string
                }}
            />
        </IonItem>
        <IonItem>
            <IonLabel position="stacked">Телефон</IonLabel>
            <MaskedInput
                    mask={['+', ' ', /[1-9]/, '(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                    className="m-input"
                    id='1'
                    value={ regData.Телефон }
                    placeholder = "+7 (914) 222-22-22"
                    type='text'
                    onChange={(e) => {
                        regData.Телефон = e.target.value as string
                    }}
                />
        </IonItem>
        <IonItem>
            <IonLabel position="stacked">Пароль</IonLabel>
            <IonInput placeholder="******" type="password" value={regData.Пароль}
                onIonChange={(e)=>{
                    regData.Пароль = e.detail.value  as string
                }}
            />
        </IonItem>
        <IonItem>
            <IonLabel position="stacked">Подтверждение пароля</IonLabel>
            <IonInput placeholder="******" type="password" value={regData.Пароль1}
                onIonChange={(e)=>{
                    regData.Пароль1 = e.detail.value  as string
                }}
            />
        </IonItem>
        <IonButton
          class = "mt-2"
          expand="block"
          onClick={()=>{
              Reg()
          }}
        > Зарегистрироваться 
        </IonButton>
      </IonList>
      <IonAlert
          isOpen={ state === 100 }
          onDidDismiss={() => setState( 0 )}
          cssClass='my-custom-class'
          header={'Успех'}
          message={ mess }
          buttons={[
            {
              text: 'Ok',
              handler: () => {
                hist.push("/page/tab1")
              }
            }
          ]}
        />
      <IonAlert
          isOpen={ state === 200 }
          onDidDismiss={() => setState( 0 )}
          cssClass='my-custom-class'
          header={'Ошибка'}
          message={ mess }
          buttons={['Ok']}
        />

    </>
    return elem
}
