export const dateFormatter = (date: string) => {
    const splitted = date.split("-");
    const formattedDate = [];
    formattedDate[0] = splitted[1];
    formattedDate[1] = splitted[2];
    formattedDate[2] = splitted[0];
    return formattedDate.join("/");
}

export const ISOFormatter = (date: string) => {
    return date.split("-").reverse().join("-");
}

export const getClienteDataNascimento = (date: string) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1)

    return newDate;
}