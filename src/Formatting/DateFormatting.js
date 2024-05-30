import dayjs from "dayjs"
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('America/Sao_Paulo')

dayjs.extend(customParseFormat)

const validFormats = ["YYYY", "MM/YYYY", "DD/MM/YYYY"]

export function NormalDate(rawDate) {
    return dayjs(rawDate).format("DD/MM/YYYY")
}
export function NormalDateAndHour(rawDate) {
    return dayjs(rawDate).format("DD/MM/YYYY HH:mm")
}
export function NormalHour(rawDate) {
    return dayjs(rawDate).format("HH:mm")
}
export function isValidDate(date) {
    for (const format of validFormats) {
        if (dayjs(date, format, true).isValid()) {
            return true
        }
    }
    return false
}