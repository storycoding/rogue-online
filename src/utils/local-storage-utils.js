const getItem = (id) => {
    const item = localStorage.getItem(id);
    return JSON.parse(item);
}

const setItem = (id, item) => {
    localStorage.setItem(id, JSON.stringify(item));
}

const removeItem = (id) => {
    localStorage.removeItem(id);
}

module.exports = {
    getItem,
    setItem,
    removeItem
}
