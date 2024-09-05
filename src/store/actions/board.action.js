import { store } from '../store'
import { ADD_BOARD, REMOVE_BOARD, SET_BOARDS, UPDATE_BOARDS, SET_BOARD, REMOVE_SELECTED_TASKS } from '../reducers/board.reducer'
import { boardService } from '../../services/board.service.local'


//General Board Actions
export async function loadBoards() {
    try {
        const boards = await boardService.query()
        console.log('Boards from DB:', boards)
        store.dispatch({ type: SET_BOARDS, boards })
    } catch (err) {
        console.log('Board Actions: err in Loading Boards', err)
        throw err
    }
}

export async function getBoardById(boardId, filterBy, sortBy) {
    try {
        const board = await boardService.getBoardById(boardId, filterBy, sortBy)
        store.dispatch({ type: SET_BOARD, board })
    } catch (err) {
        console.log('Board Actions: err in Getting Board', err)
        throw err
    }
}

export async function addBoard() {
    // const owner = loggedInUser
    //CHANGE LATER TO A STARTER BOARD - MAKE DEMO DATA FOR IT!
    const board = boardService.getNewBoard()

    try {
        const newBoard = await boardService.save(board)
        store.dispatch({ type: ADD_BOARD, board: newBoard })
        return newBoard._id
    } catch (err) {
        console.log('Board Actions: err in Adding Board', err)
        throw err
    }
}

export async function removeBoard(boardId, isCurrentBoard, boardTitle) {
    try {
        await boardService.remove(boardId)
        store.dispatch({ type: REMOVE_BOARD, boardId })
        if (isCurrentBoard) {
            store.dispatch({ type: SET_BOARD, board: boardTitle })
        }
    } catch (err) {
        console.log('Board Actions: err in Removing Board', err)
        throw err
    }
}

export async function updateBoard(type, boardId, groupId = null, taskId = null, { key, value }) {

    try {
        const currBoard = store.getState().boardModule.board
        const newBoard = await boardService.update(type, boardId, groupId, taskId, { key, value })
        if (boardId === currBoard._id) store.dispatch({ type: SET_BOARD, board: newBoard })
        store.dispatch({ type: UPDATE_BOARDS, board: newBoard })
    } catch (err) {
        console.log('Updating actions: err in updating', err)
        throw err
    }
}

export async function duplicateBoard(boardId) {
    try {
        const board = await boardService.getBoardById(boardId)
        let duplicatedBoard = await boardService.duplicateBoard(board)
        store.dispatch({ type: ADD_BOARD, board: duplicatedBoard })

        return duplicatedBoard
    } catch (err) {
        console.log('Board Actions: err in Board Duplicate', err)
        throw err
    }
}

export async function updateBoardOptimistic(type, boardId, groupId = null, taskId = null, { key, value }, board) {
    try {
        const currBoard = store.getState().boardModule.board
        if (boardId === currBoard._id) store.dispatch({ type: SET_BOARD, board })
        store.dispatch({ type: UPDATE_BOARDS, board })
        await boardService.update(type, boardId, groupId, taskId, { key, value })
    } catch (err) {
        //redo dispatch if error
        console.log('Updating actions: err in updating', err)
        throw err
    }
}
