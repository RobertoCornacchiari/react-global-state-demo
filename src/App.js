import React, { useContext, useReducer } from "react"
import {inserisci, calcola, cancella, cancellaTutto} from "./algoritmo"

const AppContext = React.createContext(null);


export default function App(){

    return <Calcolatrice/>;
}

function Reducer(state, action){
    let newState = {...state};
    switch (action.type){
        case "inserisci":
            newState.espressione = inserisci(state.espressione, action.payload.tasto);
            break;
        case "elimina":
            newState.espressione = cancella(state.espressione);
            break;
        case "pulisci":
            newState.espressione = cancellaTutto(state.espressione);
            break;
        case "calcola":
            newState.espressione = calcola(state.espressione);
            break;
    }
    return newState;
}

export function Calcolatrice(){
    const [state, dispatch] = useReducer(Reducer, {
        espressione:"",
        tasti: ["(", ")", "C", "CE", "%", "^", "/", "*", "7", "8", "9", "-", "4", "5", "6", "+", "1", "2", "3", ".", "0", "="],
    });

    const tastiJSX = state.tasti.map((valore) => (<Tasto value={valore} key={valore}/>));

    return(
        
        <div className="calcolatrice">
            
            <AppContext.Provider value = {{state, dispatch}}>
                <Display/>
                {tastiJSX}
            </AppContext.Provider>

        </div>
    )
}

export function Display(){

    const {state, dispatch} = useContext(AppContext);

    return (
        <div className="content">
            <div type="text" name="display" id="Display" readOnly="readonly" className="display">{state.espressione}</div>
        </div>
    )
}

function Tasto(props){

    const {state, dispatch} = useContext(AppContext);

    let valore = props.value;
    let proprieta = "tasto";

    if (valore == "0" || valore == "=")
        proprieta += " lungo";    

    let azione;
    switch (valore){
        case "=":
            azione = "calcola";
            break;
        case "CE":
            azione = "elimina";
            break;
        case "C":
            azione = "pulisci";
            break;
        default:
            azione = "inserisci";
            break;
    }

    function esegui(){
        dispatch({
            type:azione,
            payload: {tasto:valore}
        });
    }
    
    return (
        <a className={proprieta} onClick = {() => esegui()}>
            {valore}
        </a>
    )
}
