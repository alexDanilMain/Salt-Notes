import { getCookie } from "../services/Cookies/Cookies"


const URL_Base = "http://localhost:5010/api/Notes"


export type Note = {
    noteContent: string,
    mobName: string,
    yourMob : string
}


export const getDayNotes = async(day:number): Promise<Note[]> => {
    const headers = {
        'Content-type': "application/json; charset=UTF-8",
        'Authorization': 'Bearer ' + getCookie("saltnote_key"),
    }

    const json_result = await fetch(`${URL_Base}/${day}`, {headers}).then(res =>  res.json())
    return json_result.$values as Note[]
}
