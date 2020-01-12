const defaultState = {
    amount: 5,
    delay: 2000,
    stopped: true,
    sortTypes: ["QuickSort", "Bubble Sort", "Radix Sort", 
                "Merge Sort", "Selection Sort", "Insertion Sort", 
                "Heap Sort", "Counting Sort"]
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
        default:
            return state
    }
}

export default navState