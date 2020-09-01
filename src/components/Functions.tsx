import React, { useState, useEffect } from "react"
import { Store, getData } from "../pages/Store";
import { IonCard, IonCardContent, IonList, IonItem, IonLabel, IonText, IonCardHeader
    , IonCol, IonRow, IonAvatar, IonIcon, IonGrid, IonToolbar, IonCardSubtitle
    , IonTextarea, IonButton, IonCardTitle, IonLoading } from "@ionic/react";
import { personOutline, folderOutline, linkOutline, folderOpenOutline, walletOutline, ribbonOutline, createOutline, arrowBackOutline } from "ionicons/icons";
import './Functions.css'
import MaskedInput from "../mask/reactTextMask";
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';


import { IPAY, ipayCheckout } from './sber'


export function Tab1():JSX.Element{
    let auth = Store.getState().auth;
    let login = Store.getState().login;
    let elem = <></>
    const [biznes,  setBiznes] = useState<Array<any>>([])
    const [scores,  setScores] = useState<Array<any>>([])
    const [bonus,   setBonuses]  = useState<any>({})

    Store.subscribe({num: 1, type: "biznes", func: ()=>{ setBiznes(Store.getState().biznes)}})
    Store.subscribe({num: 2, type: "scores", func: ()=>{ setScores(Store.getState().scores)}})
    Store.subscribe({num: 3, type: "bonuses", func: ()=>{ setBonuses(Store.getState().bonuses)}})

    useEffect(()=>{
        setBiznes(Store.getState().biznes)
        setScores(Store.getState().scores)
        setBonuses(Store.getState().bonuses)
    }, [])

    if(auth){
        elem = <>
            <IonCard>
                <IonCardHeader>Личные данные</IonCardHeader>
                <IonCardContent>
                    <IonList>
                        <IonItem>
                            <IonAvatar slot="start">
                                <IonIcon class="kr-icon" icon={ personOutline } />
                            </IonAvatar>
                            <IonLabel position="stacked"> Куратор </IonLabel>
                            <IonRow class="w-100"><IonCol class="a-right">
                                <IonText > { login.Куратор === "" ? "Без куратора" : login.Куратор } </IonText>
                            </IonCol></IonRow>
                        </IonItem>
                    </IonList>
                    <IonList>
                        <IonItem>
                            <IonAvatar slot="start">
                                <IonIcon class="kr-icon" icon={ folderOutline } />
                            </IonAvatar>
                            <IonLabel position="stacked"> Лицевой счет </IonLabel>
                            <IonRow class="w-100"><IonCol class="a-right">
                                <IonText class="a-right"> { login.ЛС } </IonText>
                            </IonCol></IonRow>
                        </IonItem>
                    </IonList>
                    <IonList>
                        <IonItem>
                            <IonAvatar slot="start">
                                <IonIcon class="kr-icon" icon={ linkOutline } />
                            </IonAvatar>
                            <IonLabel position="stacked"> Идентификатор </IonLabel>
                            <IonRow class="w-100"><IonCol class="a-right">
                                <IonText> { login.ИД } </IonText>
                            </IonCol></IonRow>
                        </IonItem>
                    </IonList>
                </IonCardContent>
            </IonCard>    
            <IonCard>
                <IonCardHeader> Бизнес </IonCardHeader>
                <IonCardContent>
                    <IonList>
                        { biznes.map((biz, num)=>{
                            return ( <>
                                <IonItem key={ num }>
                                    <IonAvatar slot="start">
                                        <IonIcon class="kr-icon" icon={ folderOpenOutline } />
                                    </IonAvatar>
                                    <IonLabel position="stacked"> Договор </IonLabel>
                                    <IonRow class="w-100"><IonCol class="a-right">
                                        <IonText > { biz.Договор } </IonText>
                                    </IonCol></IonRow>
                                </IonItem>
                                { biz.Массив.map((b, n)=>{
                                    return (
                                        <IonItem key={ num * 1000 + n }>
                                            <img slot="end" className="kr-avatar" src="assets/home/usd.png" alt="'" />
                                            <IonLabel position="stacked"> Сумма </IonLabel>
                                            <IonRow class="w-100"><IonCol class="a-right">
                                                <IonText > { b.Сумма } </IonText>
                                            </IonCol></IonRow>
                                        </IonItem>   
                                    )                                
                                })}
                                </>
                            )
                        })}
 
                    </IonList>
                </IonCardContent>
            </IonCard>
            <IonCard>
                <IonCardHeader>Счета</IonCardHeader>
                <IonCardContent>
                    <IonList>
                        { scores.map((sco, num) => {
                            return (
                                <>
                                    <IonItem key={ num }>
                                        <IonAvatar slot="start">
                                            <IonIcon class="kr-icon" icon={ walletOutline } />
                                        </IonAvatar>
                                        <IonLabel position="stacked"> { sco.Валюта } </IonLabel>
                                        <IonRow class="w-100"><IonCol class="a-right">
                                            <IonText > { sco.Сумма } </IonText>
                                        </IonCol></IonRow>
                                    </IonItem>                     
                                </>     
                            )
                        })}
                    </IonList>
                </IonCardContent>
            </IonCard>
            <IonCard>
                <IonCardHeader>
                    Бонусы
                </IonCardHeader>
                <IonCardContent>
                    <IonList>
                        <IonItem>
                            <IonAvatar slot="start">
                                <IonIcon class="kr-icon" icon={ ribbonOutline } />
                            </IonAvatar>
                            <IonLabel position="stacked"> { "Личные" } </IonLabel>
                            <IonRow class="w-100"><IonCol class="a-right">
                                <IonText > { bonus.Личные } </IonText>
                            </IonCol></IonRow>
                        </IonItem> 
                        <IonItem>
                            <IonAvatar slot="start">
                                <IonIcon class="kr-icon" icon={ ribbonOutline } />
                            </IonAvatar>
                            <IonLabel position="stacked"> { "Структурные" } </IonLabel>
                            <IonRow class="w-100"><IonCol class="a-right">
                                <IonText > { bonus.Структурные } </IonText>
                            </IonCol></IonRow>
                        </IonItem> 
                        <IonItem>
                            <IonAvatar slot="start">
                                <IonIcon class="kr-icon" icon={ ribbonOutline } />
                            </IonAvatar>
                            <IonLabel position="stacked"> { "Всего" } </IonLabel>
                            <IonRow class="w-100"><IonCol class="a-right">
                                <IonText > { bonus.Бонусы } </IonText>
                            </IonCol></IonRow>
                        </IonItem> 
                    </IonList>
                </IonCardContent>
            </IonCard>
        </>
    } else {
        elem = <>

        </>

    }

    return elem
}

declare type Dictionary = {
    [key: string]: any;
  };

export function    Applications():JSX.Element {
    const [info, setInfo ]  = useState<any>([])
    const [page, setPage]  = useState(0)
    const [serv, setServ]   = useState<any>()
    const [upd, setUpd]     = useState(0)

    let phone = "", addr = "", descr = "";

    function setUpd_(){
        if(upd !== undefined){
            setUpd(upd + 1)
        }
    }
  
    let item : Dictionary = {"city": "Якутск"};  
    let  dict: Dictionary[] = []; dict.push(item);
  
    Store.subscribe({num: 3, type: "docs", func: ()=>{
        setUpd_()
    }})
  
    Store.subscribe({num: 11, type: "pages", func: ()=>{
      setPage(Store.getState().pages[0])
    }})

  
    useEffect(()=>{
        setInfo(Store.getState().docs)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [upd])
  
  
    function Page1():JSX.Element {
        let item = <></>
        let txt = <></>
        for(let i = 0; i < info.length; i++){
            if(info[i].Статус === "В ожидании")
                txt = <IonText class="srv-text-1">    { info[i].Статус }</IonText>
            if(info[i].Статус === "Оказана")
                txt = <IonText class="srv-text-2">   { info[i].Статус }</IonText>
            if(info[i].Статус === "Отменено")
                txt = <IonText class="srv-text-3">  { info[i].Статус }</IonText>
            item = <>
                { item }
                <IonItem class="srv-item" detail={ false } lines="none" onClick={()=> {
                    setServ(info[i]);
                    let pages = Store.getState().pages;
                    Store.dispatch({type: "pages", pages: [3, ...pages]})
                }}>
                    <img className="i4-icon" src= { info[i].Иконка } slot="start" alt="" /> 
                    <IonGrid>
                        <IonRow>
                            <IonText class="u-text">
                                { info[i].Услуга }
                            </IonText>
                        </IonRow>
                        <IonRow>
                            { txt }
                        </IonRow>
                        <IonRow>
                            <IonText class="u-text-2">
                                { info[i].Дата }
                            </IonText>
                        </IonRow>
                    </IonGrid>
                </IonItem>
            </>
        }
        let elem = <>
        <IonCard>
            <IonItem class="srv-item" detail={ true } lines="none" onClick={()=> {
                let pages = Store.getState().pages;
                Store.dispatch({type: "pages", pages: [1, ...pages]})
            }}>
                <IonIcon class="u-icon" icon= { createOutline } slot="start" />  
                <IonText class="u-text">
                    Закажите новую услугу
                </IonText>
            </IonItem>
        </IonCard>
        <IonText class="srv-text">МОИ ЗАЯВКИ</IonText>
        <IonCard>
            { item }
        </IonCard>
        </>
        return elem
    }
  
    function Page2():JSX.Element {
        let usl = Store.getState().services
    
        let item = <></>
        for(let i = 0;i < usl.length;i++){ 
            if(usl[i].Роль !== "Пользователь") continue
            item = <>
                { item }
                <IonItem class="srv-item" detail={ true } lines="none" onClick={()=>{
                        let pages = Store.getState().pages;
                        Store.dispatch({type: "pages", pages: [2, ...pages]})
                        setServ( usl[i] )
                    }}>
                        <img className="i4-icon" src={ usl[i].Иконка } slot="start" alt="" />
                        <IonText class="b-text">
                            { usl[i].Наименование }
                        </IonText>
                </IonItem>            
            </>    
        }
        let elem = <>
            <IonCard class="p-15">
                <IonList>
                    { item }
                </IonList>
            </IonCard>
        </>
        return elem;
    }
  
    function Page3():JSX.Element {
  
        phone = Store.getState().login.Телефон
  
      let elem = <>
        <IonCard>
            <IonCardHeader>
              <IonToolbar class="a-center">
                  <img className="i4-icon" src={ serv?.Иконка } slot="start" alt="" />   
                  <IonCardSubtitle>  { serv?.Наименование === undefined ? serv?.Услуга : serv?.Наименование } </IonCardSubtitle>
              </IonToolbar>
            </IonCardHeader>
          <IonList class="p-15">
  
              <IonItem class="srv-item">
                  <IonLabel position="stacked">Телефон</IonLabel>  
      
                  <MaskedInput
                        mask={['+', /[1-9]/, ' ','(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-',/\d/, /\d/]}
                        className="m-input"
                        autoComplete="off"
                        placeholder="+7 (914) 000-00-00"
                        id='1'
                        type='text'
                        value = { phone }
                        onChange={(e: any) => {
                          phone = e.target.value as string
                        }}
                  />
    
              </IonItem>
              <IonLabel class="ml-15" >Адрес</IonLabel>
                <AddressSuggestions 
                    token="23de02cd2b41dbb9951f8991a41b808f4398ec6e"
                    filterLocations ={ dict }
                    hintText = { "г. Якутск" }
                    onChange={(e)=>{
                      if(e !== undefined)
                        addr = e.value
                    }}
                
                /> 
              <IonItem class="srv-item">
                  <IonLabel position="floating">Примечание </IonLabel>  
                  <IonTextarea 
                    // value= {  }
                    placeholder="Примечания..."
    
                    onIonChange={(e)=>{
                       descr = e.detail.value as string
                  }}></IonTextarea>
              </IonItem>
                  <IonButton expand="block" onClick={()=>{
                        IPAY({api_token: 'YRF3C5RFICWISEWFR6GJ'});
                        ipayCheckout({
                          amount: serv.Тариф,
                          currency:'RUB',
                          order_number:'',
                          description: serv.Наименование + " " + addr},
                          function(order) { showSuccessfulPurchase(order) },
                          function(order) { showFailurefulPurchase(order) })
                    // createDoc();     
                  }}>
                      
                      Отправить
                  </IonButton>
          </IonList>
        </IonCard>
      </>;
      return elem;
    }
    
    function Page4(props:{info}):JSX.Element {
      let info = props.info
  
      Store.dispatch({type: "phone", phone: Store.getState().Логин.Телефон})
      Store.dispatch({type: "addr", addr: serv?.Адрес })
      Store.dispatch({type: "descr", descr: serv?.Описание })
  
    let elem = <>
      <IonCard>
          <IonCardHeader>
            <IonToolbar class="a-center">
                <img className="i4-icon" src={ info?.Иконка } slot="start" alt="" />   
                <IonCardTitle>  { info?.Услуга } </IonCardTitle>
            </IonToolbar>
          </IonCardHeader>
        <IonList class="p-15">
  
            <IonItem class="srv-item">
                <IonLabel position="stacked">Телефон</IonLabel>  
    
                <MaskedInput
                      mask={['+', /[1-9]/, ' ','(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-',/\d/, /\d/]}
                      className="m-input"
                      autoComplete="off"
                      placeholder="+7 (914) 000-00-00"
                      id='1'
                      type='text'
                      value = { Store.getState().phone }
                      onChange={(e: any) => {
                        Store.dispatch({type: "phone", phone:(e.target.value as string)})
                      }}
                />
  
            </IonItem>
              <IonLabel class="ml-15" >{ "Адрес" }</IonLabel>
              <AddressSuggestions 
                  token="23de02cd2b41dbb9951f8991a41b808f4398ec6e"
                  filterLocations ={ dict }
                  hintText = { "г. Якутск" }
                  defaultQuery = { info?.Адрес}
                  onChange={(e)=>{
                    if(e !== undefined)
                      Store.dispatch({type: "addr", addr: e.value})
                  }}
              
              /> 
            <IonItem class="srv-item">
                <IonLabel position="floating">Примечание </IonLabel>  
                <IonTextarea 
                  value= {  info?.Описание }
                  placeholder="Примечания..."
  
                  onIonChange={(e)=>{
                    Store.dispatch({type: "descr", descr:(e.detail.value as string)})
                }}></IonTextarea>
            </IonItem>
                <IonButton expand="block" onClick={()=>{
                    updateDoc();
                    let pages = Store.getState().pages; pages.pop();  
                    Store.dispatch({type: "pages", pages: pages})  
                }}>
                    
                    Записать
                </IonButton>
        </IonList>
      </IonCard>
    </>;
    return elem;
    }
  
  
function        showSuccessfulPurchase(order){
    createDoc()
    Store.dispatch({type: "pages", pages: [0]})
  }
  
  function        showFailurefulPurchase(order){

  }

  async function  createDoc(){

      
        if(phone === "" || addr === ""){
          return
        }
      
        let params = { 
            Пользователь:   Store.getState().login.ГУИД,
            Телефон:        phone,
            Адрес:          addr,
            Услуга:         serv.ГУИД,
            Тариф:          serv.Тариф,
            Описание:       descr
        }
        let res = await getData("У_Заявка", params)
      
        if(res.Код === 100){
            let docs = Store.getState().docs;
          Store.dispatch({type: "docs", docs: [...docs, res.Данные]})
        } 
        if(res.Код === 101){
            let docs = Store.getState().docs;
            let jarr = docs.map((todo : any) => { 
                if (todo.ГУИД === res.Данные.ГУИД) {
                    return { ...todo, 
                        Статус:     res.Данные.Статус, 
                        Телефон:    res.Данные.Телефон,
                        Описание:   res.Данные.Описание, 
                        Адрес:      res.Данные.Адрес
                    }
                }
                return todo
            }) 
          Store.dispatch({type: "docs", docs: jarr})
       
        } 
    
  }
  
  async function  updateDoc(){
    
      let GUID = serv?.ГУИД
    
      let params = { 
          ГУИД:           GUID,
          Адрес:          addr,
          Описание:       descr
      }
      let res = await getData("У_Заявка", params)
    
      if(res.Код === 100){
        let docs = Store.getState().docs
        Store.dispatch({type: "docs", docs: [...docs, res.Данные]})
      } 
      if(res.Код === 101){
        let docs = Store.getState().docs;
        let jarr = docs.map((todo : any) => { 
            if (todo.ГУИД === res.Данные.ГУИД) {
                return { ...todo, 
                    Статус:     res.Данные.Статус, 
                    Телефон:    res.Данные.Телефон,
                    Описание:   res.Данные.Описание, 
                    Адрес:      res.Данные.Адрес
                }
            }
            return todo
        }) 
        Store.dispatch({type: "docs", docs: jarr})
     
      } 
  
  }
     
    switch( page ) {
        case 0: return <Page1 />
        case 1: return <Page2 />
        case 2: return <Page3 />
        case 3: return <Page4 info={ serv }/>
        default: return <></>
    }
  
  }

export function    Market(): JSX.Element{
    const [info, setInfo] = useState<Array<any>>([])
    const [group, setGroup] = useState([""])
    const [load, setLoad] = useState(false)
    const [upd, setUpd] = useState(0);

    useEffect(()=>{

        let goods = Store.getState().goods
        let jarr: Array<any> = []
        goods.forEach(elem => {
            if(elem.Группа === group[0]) 
                jarr = [...jarr, elem]
        });
        console.log("jarr")
        console.log(jarr)
        if(jarr === undefined) jarr = []
        setInfo(jarr)
        console.log(info)
    }, [group, upd])

    function Item(props:{info}):JSX.Element {
        let el = props.info
        let elem = <></>
        if(el.ЭтоГруппа) {
            elem = <>
                <IonCard class="m-card" onClick={()=>{
                    setGroup([el.Код, ...group])
                }}>
                <IonCardHeader>{ el.Наименование }</IonCardHeader>   
                <IonCardContent>
                        <img className= "m-img" src={ el.Картинка } alt = "" />     
                </IonCardContent>
                </IonCard>
            </>
        } else {
            elem = <>
                <IonCard class="m-card">
                    <IonCardHeader>{ el.Артикул }</IonCardHeader>   
                    <IonCardContent>
                        <img className= "m-img" src={ el.Картинка } alt = "" /> 
                        <IonCardSubtitle>
                            { el.Наименование }
                        </IonCardSubtitle>  
                        <IonCardTitle>
                            { el.Цена } руб.
                        </IonCardTitle>           
                    </IonCardContent>
                </IonCard>      
            </>     
        }

        return elem;
    }

    function Items(props:{info}):JSX.Element {
        let info = props.info;
        let elem = <></>
        for(let i = 0;i < info.length;i++){
            elem = <>
                { elem }
                <Item info= { info[i] } />
            </>
        }
        return elem;
    }

    function Backbutton():JSX.Element {
        let elem = <></>
        if(group.length > 1){
            elem = 
                <IonButton onClick={()=>{
                   let jarr = group; jarr.shift();
                    setGroup(jarr);
                    setUpd(upd + 1);
                }}>
                    <IonIcon icon={ arrowBackOutline }/>
                </IonButton>
        }
        return elem
    }

    let elem = <>
        <Backbutton />
        <div id="m-home">
            <IonLoading isOpen={ load } message="Подождите"/>
            <Items info = { info} />
        </div>    
    </>


    return elem
}
