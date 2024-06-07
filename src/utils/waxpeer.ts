const deleteItemFromWaxpeer = async (id: number, apiKey: string) => {
    let myHeaders = new Headers()
    myHeaders.append("accept", "application/json")
    let requestOptions = {
        method: "GET",
        headers: myHeaders,
    }
    let url = `https://api.waxpeer.com/v1/remove-items?api=${apiKey}&id=${id}`
    const res = await fetch(url, requestOptions)
    if (res.status !== 200) {
        throw new Error("Failed to delete item from Waxpeer")
    }
    return await res.json()
}

const deleteAllFromWaxpeer = async (apiKey: string) => {
    let myHeaders = new Headers()
    myHeaders.append("accept", "application/json")
    let requestOptions = {
        method: "GET",
        headers: myHeaders,
    }
    const url = `https://api.waxpeer.com/v1/remove-all?api=${apiKey}`
    const res = await fetch(url, requestOptions)
    if (res.status !== 200) {
        throw new Error("Failed to delete all items from Waxpeer")
    }
    return await res.json()
}

export { deleteItemFromWaxpeer, deleteAllFromWaxpeer }
