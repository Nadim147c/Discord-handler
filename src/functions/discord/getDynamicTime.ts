export const getSeconds = (date: string | number | Date) =>
    Math.round(new Date(date).valueOf() / 1000)

type TimeStyle =
    | "SHORT_TIME"
    | "LONG_TIME"
    | "SHORT_DATE"
    | "LONG_DATE"
    | "TIME_AND_DATE"
    | "LONG_TIME_AND_DATE"
    | "RELATIVE"

export const getDynamicTime = (date: string | number | Date, style: TimeStyle) => {
    const typeMap = {
        SHORT_TIME: "t",
        LONG_TIME: "T",
        SHORT_DATE: "d",
        LONG_DATE: "D",
        TIME_AND_DATE: "f",
        LONG_TIME_AND_DATE: "F",
        RELATIVE: "R",
    }

    return `<t:${getSeconds(date)}:${typeMap[style]}>`
}
