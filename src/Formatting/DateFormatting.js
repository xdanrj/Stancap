import dayjs from "dayjs"

const validFormats = ["YYYY", "MM/YYYY", "DD/MM/YYYY"]

export function NormalDate(rawDate){
    return dayjs(rawDate).format("DD/MM/YYYY")
}

export function NormalDateAndHour(rawDate){
    return dayjs(rawDate).format("DD/MM/YYYY HH:MM")
}

export function NormalHour(rawDate){
    return dayjs(rawDate).format("HH:MM")
}

export function isValidDate(date){
    console.log(date)
    for(const format of validFormats){
        if(dayjs(date, format, true).isValid()) {
            return true
        } 
    }
    return false
}