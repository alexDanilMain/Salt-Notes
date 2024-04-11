import { getCookie } from "../services/Cookies/Cookies"


const URL_Base = "http://localhost:5010/api/Notes"


export type Note = {
    
    mobName : string,
    noteContent : string


}

type ResponseNote = {
    yourNote : Note,
    otherMobNotes : {
        $values : Note[]
    } 
}

export const getDayNotes = async(day:number): Promise<ResponseNote> => {
    const headers = {
        'Content-type': "application/json; charset=UTF-8",
        'Authorization': 'Bearer ' + getCookie("saltnote_key"),
    }

    const json_result = await fetch(`${URL_Base}/${day}`, {headers}).then(res =>  res.json())
    return json_result as ResponseNote;
}

export const postDayNotes = async (content: string): Promise<Response> => {
    const headers = {
        'Content-type': "application/json; charset=UTF-8",
        'Authorization': 'Bearer ' + getCookie("saltnote_key"),
    }
    
    const body = JSON.stringify({
        noteContent: content
    })
    const method = "POST"
    const response = await fetch(URL_Base, {body, method, headers}).then(res => res.json());
    console.log("POST", response)
    return response

}
