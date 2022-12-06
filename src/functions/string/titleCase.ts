export default (title: string) =>
    title
        .toLowerCase()
        .replace(/( |_)+/g, " ")
        .replace(/([a-z]|')+/gi, (str) => str.charAt(0).toUpperCase() + str.slice(1))
        .trim()
