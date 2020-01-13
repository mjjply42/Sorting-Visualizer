//let swap_info = []

function swap(array, val1, val2)
{
    let temp = array[val1]
    array[val1] = array[val2]
    array[val2] = temp
}

function partition(arr, pivot, left, right, swap_info)
{
    let search_values = []
    var pivotValue = arr[pivot],
        partitionIndex = left

    for(var i = left; i < right; i++){
        if(arr[i] < pivotValue)
        {
            swap(arr, i, partitionIndex)
            swap_info.push({new_array: arr, searched: search_values, pair: [i, partitionIndex]})
            partitionIndex++
        }
        search_values.push([i, partitionIndex])
    }
    swap(arr, right, partitionIndex)
    swap_info.push({new_array: arr, searched: search_values, pair: [right, partitionIndex]})
    return partitionIndex
}

export function is_sorted(arr)
{
    let i = 0
    while (i < arr.length)
    {
        if (arr[i - 1] > arr[i])
            return false
        if (arr[i + 1] < arr[i])
            return false
        i++
    }
    return true
}

export function quick_sort(arr, left, right, swap_info)
{
    var len = arr.length, 
    pivot,
    partitionIndex

    if(left < right && !is_sorted(arr)){
    pivot = right
    partitionIndex = partition(arr, pivot, left, right, swap_info)

    quick_sort(arr, left, partitionIndex - 1, swap_info)
    quick_sort(arr, partitionIndex + 1, right, swap_info)
    }
    //let swap_tmp = JSON.parse(JSON.stringify(swap_info))
    //swap_info = []
    //return swap_tmp;
}