export const getSeconds = (date: string | number | Date) => Math.round(new Date(date).valueOf() / 1000)
export const getDynamicTime = (
    date: string | number | Date,
    style:
        | "SHORT_TIME"
        | "LONG_TIME"
        | "SHORT_DATE"
        | "LONG_DATE"
        | "TIME_AND_DATE"
        | "LONG_TIME_AND_DATE"
        | "RELATIVE",
) => {
    let type: string

    switch (style) {
        case "SHORT_TIME":
            type = "t"
            break
        case "LONG_TIME":
            type = "T"
            break
        case "SHORT_DATE":
            type = "d"
            break
        case "LONG_DATE":
            type = "D"
            break
        case "TIME_AND_DATE":
            type = "f"
            break
        case "LONG_TIME_AND_DATE":
            type = "F"
            break
        case "RELATIVE":
            type = "R"
            break
        default:
            break
    }

    return `<t:${getSeconds(date)}:${type}>`
}
