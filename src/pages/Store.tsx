import { combineReducers  } from 'redux'
import axios from 'axios'
import { Reducer } from 'react';
import { stat } from 'fs';

var reducers: Array<Reducer<any, any>>;reducers = [];

interface t_goods {
    Группа:             "",
    Код:                "",
    Наименование:       "",
    Артикул:            "",
    КонтрольОстатков:   "",
    Вид:                "",
    Цена:               "",
    Картинка:           "",
}

const i_state = {
    auth:       false,
    login:      {
        ГУИД:       "",
        ФИО:        "",
        Телефон:    "",
        элПочта:    "",
        Пароль:     "",
        Куратор:    "",
        Договор:    "",
        ЛС:         "",
        ИД:         "",
    },
    biznes:     [],
    scores:     [],
    bonuses:    {
        Личные: "",
        Структурные: "",
        Бонусы:     "",
    },
    services:   [],
    docs:       [],
    pages:      [0],
    goods:      [],
}

export      async function getData(method : string, params){

    let user = "Администратор"
    let password = "123"

    let res = await axios.post(
        URL + method,
        params,
        {
            auth: {
                username: unescape(encodeURIComponent(user)),
                password: unescape(encodeURIComponent(password))
            }
        } 
        ).then(response => response.data)
        .then((data) => {
            if(data.Код === 200) console.log(data) 
            return data
        }).catch(error => {
          console.log(error)
          return {Код: 200}
        })
    return res

}

for(const [key, value] of Object.entries(i_state)){
    reducers.push(
        function (state = i_state[key], action) {
            switch(action.type){
                case key: {
                    if(typeof(value) === "object"){
                        if(Array.isArray(value)) {
                            return action[key]
                        } else {
                            let data: object; data = {};
                            for(const key1 of Object.keys(value)){ 
                                data[key1] = action[key1] === undefined ? state[key1] : action[key1]
                            }   
                            return data
                        }

                    } else return action[key]
                }
                default: return state;
            }       
        }

    )
}


function gdReducer(state = i_state.goods, action){
    switch(action.type) {
        case "goods": return [...state, ...action.goods]
        default: return state
    }
}

const       rootReducer = combineReducers({

    auth:       reducers[0],
    login:      reducers[1],
    biznes:     reducers[2],
    scores:     reducers[3],
    bonuses:    reducers[4],
    services:   reducers[5],
    docs:       reducers[6],
    pages:      reducers[7],
    goods:      gdReducer,

})

interface t_list {
    num: number, type: string, func: Function,
}

function    create_Store(reducer, initialState) {
    var currentReducer = reducer;
    var currentState = initialState;
    var listeners: Array<t_list>; listeners = []
    return {
        getState() {
            return currentState;
        },
        dispatch(action) {
            currentState = currentReducer(currentState, action);
            listeners.forEach((elem)=>{
                if(elem.type === action.type){
                    elem.func();
                }
            })
            return action;
        },
        subscribe(listen: t_list) {
            var ind = listeners.findIndex(function(b) { 
                return b.num === listen.num; 
            });
            if(ind >= 0){
                listeners[ind] = listen;
            }else{
                listeners = [...listeners, listen]
            }
 
        }
    };
}

export const Store = create_Store(rootReducer, i_state)
export const URL = "https://mfu24.ru/guryev/hs/MyAPI/V1/"

async function execs() {
    // let res = await getData("У_Услуги", {})
    // if(res.Код === 100) {
    //     Store.dispatch({type: "services", services: res.Данные})
    // }
}

export async function getDatas(){
    let res = await getData("Баланс", Store.getState().login)

    if(res.Код === 100){
        res.Данные.Бонусы.type = "bonuses"

        Store.dispatch({type: "biznes", biznes: res.Данные.Бизнес})

        Store.dispatch({type: "scores", scores: res.Данные.Остатки})

        Store.dispatch(res.Данные.Бонусы)

    } else console.log(res)

    let params = {
        Телефон: Store.getState().login.Телефон,
        ГУИД:   Store.getState().login.ГУИД
    }

    res = await getData("У_Услуги", params)
    if(res.Код === 100) {
        Store.dispatch({type: "services", services: res.Данные})
    }

    res = await getData("У_Заявки", params)
    if(res.Код === 100) {
        Store.dispatch({type: "docs", docs: res.Данные})
    }

    getGoods("")

}

async function getGoods(parent: string){

    let param = { Родитель: parent };
    let res = await getData("М_Товары", param)
    if(res.Код === 100) {
        Store.dispatch({type: "goods", goods: res.Данные})

        let jarr = res.Данные
        jarr.forEach(elem => {
            if(elem.ЭтоГруппа){
                getGoods(elem.Код)
            }
        });
    }
    console.log(Store.getState().goods);

}

execs();