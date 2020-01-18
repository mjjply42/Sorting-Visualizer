function merge(arr, start, middle, end, swapInfo)
{
    let temp = [end - start + 1]
    let arr2 = JSON.parse(JSON.stringify(arr))
    let i = start
    let j = middle + 1
    let k = 0
    let switches = []

    while (i <= middle && j <= end)
    {
        if (arr[i] < arr[j])
        {
            temp[k] = arr[i]
            swapInfo.push({new_array: arr2, pair: [i, j]})
            switches.push(i)
            k++
            i++
        }
        else
        {
            temp[k] = arr[j]
            swapInfo.push({new_array: arr2, pair: [i, j]})
            switches.push(j)
            k++
            j++
        }
    }
    
    while (i <= middle)
    {
        temp[k] = arr[i]
        swapInfo.push({new_array: arr2, pair: [k, i]})
        switches.push(i)
        k++
        i++
    }
    while (j <= end)
    {
        temp[k] = arr[j]
        swapInfo.push({new_array: arr2, pair: [k, j]})
        switches.push(i)
        k++
        j++
    }
    i = start
    while (i <= end)
    {
        arr[i] = temp[i - start]
        i++
    }
    console.log(switches, "ARR: ", arr)
}

export function mergeSort(arr, start, end, infor)
{
    if (start < end)
    {
        let middle = parseInt((start + end) / 2)
        mergeSort(arr, start, middle, infor)
        mergeSort(arr, middle + 1, end, infor)
        merge(arr, start, middle, end, infor)
    }
}