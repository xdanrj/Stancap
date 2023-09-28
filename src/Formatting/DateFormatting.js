import dayjs from "dayjs"

export function NormalDate(rawDate){
    return dayjs(rawDate).format("DD/MM/YYYY")
}

export function NormalDateAndHour(rawDate){
    return dayjs(rawDate).format("DD/MM/YYYY HH:MM")
}

export function NormalHour(rawDate){
    return dayjs(rawDate).format("HH:MM")
}