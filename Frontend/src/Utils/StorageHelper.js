const storage = window.localStorage

export function setItem(key, value) {
    storage.setItem(key, value)
}

export function getItem(key) {
    return storage.getItem(key)
}

export function removeItem(key) {
    storage.removeItem(key)
}

export function clear() {
    storage.clear()
}