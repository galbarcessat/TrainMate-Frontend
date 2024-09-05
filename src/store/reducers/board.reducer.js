export const SET_BOARDS = 'SET_BOARDS'
export const UPDATE_BOARDS = 'UPDATE_BOARDS'
export const REMOVE_BOARD = 'REMOVE_BOARD'
export const ADD_BOARD = 'ADD_BOARD'

export const SET_IS_LOADING = 'SET_IS_LOADING'

const initialState = {
    boards: [],
    isLoading: false
}

export function boardReducer(state = initialState, action) {
    let newBoards
    switch (action.type) {
        case SET_BOARDS:
            return { ...state, boards: action.boards }
      
        case REMOVE_BOARD:
            newBoards = state.boards.filter(board => board._id !== action.boardId)
            return { ...state, boards: newBoards }

        case ADD_BOARD:
            newBoards = [...state.boards, action.board]
            return { ...state, boards: newBoards }

        case UPDATE_BOARDS:
            newBoards = state.boards.map(board => (board._id === action.board._id ? action.board : board))
            return { ...state, boards: newBoards }

        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading }

        default:
            return { ...state }

    }
}
