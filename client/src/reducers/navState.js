const defaultState = {
    amount: 5,
    delay: 45,
    stopped: true,
    sortTypes: ["Quick Sort", "Bubble Sort", "Merge Sort", 
                "Selection Sort", "Insertion Sort","Counting Sort",
                "Radix Sort", "Heap Sort"],
    setSort: "Quick Sort",
    refresh: true,
    sorting: false
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
                stopped: !state.stopped
            }
        case 'update-refresh-status':
            return {
                ...state,
                refresh: action.data
            }
        case 'update-sorting-status':
            return {
                ...state,
                sorting: action.data
            }
        case 'update-sortType-status':
            return {
                ...state,
                setSort: action.data
            }
        default:
            return state
    }
}

export default navState