let swap_info = []

function swap(array, val1, val2)
{
    let temp = array[val1]
    array[val1] = array[val2]
    array[val2] = temp
}

function partition(arr, pivot, left, right)
{
    var pivotValue = arr[pivot],
        partitionIndex = left

    for(var i = left; i < right; i++){
        if(arr[i] < pivotValue)
        {
            swap(arr, i, partitionIndex)
            swap_info.push({new_array: arr, pair: [i, partitionIndex]})
            partitionIndex++
        }
    }
    swap(arr, right, partitionIndex)
    swap_info.push({new_array: arr, pair: [right, partitionIndex]})
    return partitionIndex
}

function is_sorted(arr)
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

export function quick_sort(arr, left, right)
{
    var len = arr.length, 
    pivot,
    partitionIndex

    if(left < right && !is_sorted(arr)){
    pivot = right
    partitionIndex = partition(arr, pivot, left, right)

    quick_sort(arr, left, partitionIndex - 1)
    quick_sort(arr, partitionIndex + 1, right)
    }
    return swap_info;
}