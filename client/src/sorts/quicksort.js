let globalPartition = 0

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
            swap_info.push({new_array: arr, searched: search_values, pair: [i, partitionIndex, globalPartition]})
            search_values.push([i, partitionIndex])
            partitionIndex++
            continue
        }
        search_values.push([i, partitionIndex])
    }
    swap(arr, right, partitionIndex)
    swap_info.push({new_array: arr, searched: search_values, pair: [right, partitionIndex, globalPartition]})
    return partitionIndex
}

export function isSorted(arr)
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

export function quickSort(arr, left, right, swap_info)
{
    var len = arr.length, 
    pivot,
    partitionIndex

    if(left < right && !isSorted(arr)){
    pivot = right
    partitionIndex = partition(arr, pivot, left, right, swap_info)
    globalPartition = partitionIndex
    quickSort(arr, left, partitionIndex - 1, swap_info)
    globalPartition = partitionIndex - 1
    quickSort(arr, partitionIndex + 1, right, swap_info)
    globalPartition = partitionIndex + 1
    }
}