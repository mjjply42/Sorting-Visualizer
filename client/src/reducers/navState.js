const defaultState = {
    amount: 10,
    delay: 0,
    stopped: true,
    sortTypes: ["QuickSort", "Bubble Sort", "Radix Sort"]
}

const navState = (state = defaultState, action) => {
    switch (action.type) {
        case 'update-count':
            return {
                ...state,
                amount: action.data
            }
        case 'update-delay':
            return {
                ...state,
                delay: action.data
            }
        case 'update-stoppage':
            return {
                ...state,
                stopped: action.data
            }
        default:
            return state
    }
}

export default navState