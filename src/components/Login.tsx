import React, { useState } from "react"
import { Store, getData, getDatas } from "../pages/Store"
import { IonLoading, IonRow, IonText, IonList, IonItem, IonLabel, IonInput, IonButton, IonToast, IonCol } from "@ionic/react"
import MaskedInput from "../mask/reactTextMask"
import './Login.css'
import { useHistory } from "react-router-dom"

export function     Login():JSX.Element {
    const [load, setLoad] = useState(false)
    const [toast, setToast] = useState(false);

    const history = useHistory();

    async function Auth(){
        let login = Store.getState().login

        if(login.Телефон === "" || login.Телефон.indexOf('_') > -1 ||(login.Пароль1 === "")) { 
            setToast(true)
        } else {
            let params = {
                Телефон: login.Телефон,
                Пароль:  login.Пароль,
            }
            setLoad(true)

            let res = await getData("Авторизация", params)
            if(res.Код === 100){
                setLoad(false)

                Store.dispatch({type: "auth", auth: true})
                res.Данные.type = "login"
                Store.dispatch(res.Данные);

                localStorage.setItem( "account-pro.phone", login.Телефон as string )
                localStorage.setItem( "account-pro.pass", login.Пароль1 as string )

                getDatas();

                history.push("/page/tab1");

            } else   setLoad(false)
          
        } 
    }

    let elem = <>
      <IonLoading isOpen={ load }  message={'Подождите...'}/>
      <IonToast 
            isOpen={toast}  
            onDidDismiss={() => setToast(false)}
            message="Заполните все поля"
            duration={1500}
            position="top"
      />
      <div className="lgDiv">
        <IonRow>
            <IonCol class="a-right mr-2">
                <IonText class="a-link"
                    onClick={()=>{
                        history.push("/page/reg")
                    }}
                >Регистрация</IonText>
            </IonCol>
        </IonRow>
        <IonRow>
          <IonText class="lgText1">
              Вход
          </IonText>
        </IonRow>
        <IonRow>
          <IonText class="lgText3">
            Пожалуйста введите ваши данные
          </IonText>
        </IonRow>
      </div>
      <IonList class="lgList1">
        <IonItem>
            <IonLabel position="stacked">Телефон</IonLabel>
            <MaskedInput
                    mask={['+', ' ', /[1-9]/, '(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                    className="m-input"
                    id='2'
                    value={ Store.getState().login.Телефон }
                    placeholder = "+7 (914) 222-22-22"
                    type='text'
                    onChange={(e) => {
                        Store.dispatch({type:"login", Телефон: (e.target.value as string)})
                    }}
                />
            {/* <IonInput placeholder="mail@poka.net"
                onIonChange={(e)=>{
                    Store.dispatch({type: "login", элПочта: e.detail.value})
                }}
            >
            </IonInput> */}
        </IonItem>
        <IonItem>
            <IonLabel position="stacked">Пароль</IonLabel>
            <IonInput placeholder="******"  type="password"
                onIonChange={(e)=>{
                    Store.dispatch({type: "login", Пароль: (e.detail.value)})
                }}
            />
        </IonItem>
        <IonButton
          class = "mt-2"
          expand="block"
          onClick={()=>{
              Auth()
          }}
        > Войти </IonButton>
      </IonList>
    </>
    return elem
}
