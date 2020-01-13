export function bubbleSort(arr, swapInfo)
{
    let i = arr.length
    let j = 0
    let temp = 0

    while (i > 0)
    {
        j = 0
        while (j < arr.length)
        {
            if (arr[j] > arr[j + 1])
            {
                temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
                swapInfo.push({new_array: arr, pair: [j, j + 1]})
            }
            j++
        }
        i--
    }
}