export const SHOW_MSG = 'show-msg'

function createEventEmitter() {
    const listenersMap = {}
    return {
        on(evName, listener) {
            listenersMap[evName] = (listenersMap[evName]) ? [...listenersMap[evName], listener] : [listener]
            return () => {
                listenersMap[evName] = listenersMap[evName].filter(func => func !== listener)
            }
        },
        emit(evName, data) {
            if (!listenersMap[evName]) return
            listenersMap[evName].forEach(listener => listener(data))
        },
        removeEventListener(evName, listenerToRemove) {
            listenersMap[evName] = listenersMap[evName].filter(listener => listener !== listenerToRemove)
        }
    }
}

export const eventBus = createEventEmitter()

export function showUserMsg(msg) {
    eventBus.emit(SHOW_MSG, msg)
}

export function showSuccessMsg(txt) {
    showUserMsg({ txt, type: 'POSITIVE' })
}
export function showErrorMsg(txt) {
    showUserMsg({ txt, type: 'NEGATIVE' })
}

export function showNormalMsg(txt) {
    showUserMsg({ txt, type: 'NORMAL' })
}

window.showUserMsg = showUserMsg

