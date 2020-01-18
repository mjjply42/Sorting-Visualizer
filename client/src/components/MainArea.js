import React,{ useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { quickSort, isSorted }  from '../sorts/quicksort.js'
import { bubbleSort } from '../sorts/bubblesort.js'
import { mergeSort } from '../sorts/mergesort.js'

export const MainArea = () => {

    const sortColors = {
        unsorted: "red",
        sorted: "blue",
        searching: "purple",
        swapped: "yellow",
        pivot: "green"
    }

    const dispatch = useDispatch()
    const [barCount, setBarCount] = useState(10)
    const [mapTest, setMapTest] = useState([])
    const [array_to_sort, updateSort] = useState([])
    const count = useSelector(state => state.navState.amount)
    const stopped = useSelector(state => state.navState.stopped)
    const delay = useSelector(state => state.navState.delay)
    const refresh = useSelector(state => state.navState.refresh)
    const setSort = useSelector(state => state.navState.setSort)
    const [switchValues, updateSwitchValues] = useState({
        SHOW_SEARCH: false
    })
    const [info, updateInfo] = useState([])
    const [info2, updateInfo2] = useState([])
    const [currentArray, updateCurrArr] = useState([])
    const [GLOBAL_CURR_INDEX, updateGlobal] = useState(0)


    async function setSearchIndex(infor)
    {
        let mapTmp = JSON.parse(JSON.stringify(mapTest))
        let newMap = []
            newMap = mapTmp.map((item, index) => {
                if (item.color !== sortColors.unsorted && item.color !== sortColors.sorted 
                    && item.color !== sortColors.pivot)
                    item.color = sortColors.unsorted
                if (index === currentArray[0].searched[0][0])
                    item.color = sortColors.searching
                else if (index === currentArray[0].searched[0][1])
                    item.color = sortColors.searching
                return item
        })
        newMap = newMap.map((item, index) => {
            let result = isInSortedPosition(item.number, index)
            if (result && item.number !== sortColors.pivot)
                item.color = sortColors.sorted
            return item
        })
        setMapTest(newMap)
        let newInfor2 = JSON.parse(JSON.stringify(currentArray))
        newInfor2[0].searched.splice(0,1)
        updateCurrArr(newInfor2)
    }

    function isEqualPair(arr1, arr2)
    {
        if (!arr2 || !arr1)
            return false
        if (arr1[0] !== arr2[0] || arr1[1] !== arr2[1])
            return false
        return true
    }

    async function swap_pusher()
    {
        await delaySet(delay)
        if (switchValues.SHOW_SEARCH && currentArray[0].searched.length > 0 
            && !isEqualPair(currentArray[0].searched[0], currentArray[0].pair))
        {
            await setSearchIndex(currentArray)
            return
        }
        let newInfor2 = JSON.parse(JSON.stringify(currentArray))
        swap(newInfor2[0].pair)
        newInfor2.splice(0,1)

        if (newInfor2.length < 1)
        {
            updateGlobal(GLOBAL_CURR_INDEX + 1)
            let test = []
            if (info2[GLOBAL_CURR_INDEX + 1])
                test = JSON.parse(JSON.stringify(info2[GLOBAL_CURR_INDEX + 1]))
            else
                test = []
            updateCurrArr(test)
        }
        else
            updateCurrArr(newInfor2)
    }

    async function delaySet(time)
    {
        return new Promise(function(resolve) {
            setTimeout(resolve, time)
        });
    }

    const isInSortedPosition = (item, index) => {
        if (array_to_sort[index] === item)
            return true
        return false
    }

    const swap = async (value_array, status) => {
        if (status === "pusher")
            return
        let mapTmp = JSON.parse(JSON.stringify(mapTest))
        let tmp = {number: 0, height: 0, color: sortColors.unsorted}
        let newMap = mapTmp.map((item, index) => {
            tmp = JSON.parse(JSON.stringify(mapTmp[value_array[0]]))
            if (item.color !== sortColors.unsorted && item.color !== sortColors.sorted)
                item.color = sortColors.unsorted
            if (index === value_array[0])
            {
                item = mapTmp[value_array[1]]
                item.color = sortColors.swapped
            }
            else if (index === value_array[1])
            {
                item = tmp
                item.color = sortColors.swapped
            }
            else if (setSort === "Quick Sort" && index === value_array[2])
                item.color = sortColors.pivot
            return item
        })
        newMap = newMap.map((item, index) => {
            let result = isInSortedPosition(item.number, index)
            if (result && item.color !== sortColors.pivot)
                item.color = sortColors.sorted
            return item
        })
        await setMapTest(newMap)
    }

    const updateMapBars = async (num, status) => {
        let i = 0
        let value_array = []
        let mapTmp = []
        while (i < num)
        {
            value_array.push(i)
            i++
        }
        while (value_array.length)
        {
            let new_bar = {number: 0, height: 0, color: sortColors.unsorted}
            let result = Math.floor((Math.random() * 500) + 1)
            let result2 = Math.floor((Math.random() * value_array.length - 1) + 1)
            value_array.splice(result2, 1)
            new_bar.number = result
            new_bar.height = (result)
            mapTmp.push(new_bar)
            let test = `${new_bar}`
        }
        setMapTest(mapTmp)
        updateSort(mapTmp.map((item, index) => {
            return item.number
        }))
        if (status === "refresh")
            dispatch({type: 'update-refresh-status', data: false})
    }
    const do_sort = async () => 
    {
        //infor = {new_array: array at time of push, searched: indexes currently being looked at, 
            //      pair: [the margin splitting highs and lows for current working array partition, index of the partition,
            //      pivot index]}
        let infor = []
        if (setSort === "Quick Sort")
            quickSort(array_to_sort, 0, array_to_sort.length - 1, infor)
        else if (setSort === "Bubble Sort")
            bubbleSort(array_to_sort, infor)
        /*else if (setSort === "Merge Sort")
        {
            console.log("BEFORE: ", array_to_sort)
            mergeSort(array_to_sort, 0, array_to_sort.length - 1, infor)
            console.log("AFTER: ", array_to_sort)
            console.log(infor)
        }*/
        updateSort(array_to_sort)
        let i = 0
        let j = 0
        let newInfor = []
        while (i < infor.length)
        {
            if ((i + 1) % 10 === 0)
            {
                newInfor.push([])
                newInfor[j].push(infor[i])
                j++
            }
            else
            {
                if (newInfor[j])
                    newInfor[j].push(infor[i])
                else
                {
                    newInfor.push([])
                    newInfor[j].push(infor[i])
                }
            }
            i++
        }
        updateInfo(infor)
        updateInfo2(newInfor)
        updateCurrArr(newInfor[GLOBAL_CURR_INDEX])
        swap(infor[0].pair, "pusher")
    }

    //useEffect Hooks
    useEffect(() => {
        updateMapBars(count)
    },[])

    useEffect(() => {
        updateMapBars(count)
    }, [count])

    useEffect(() => {
        if (!stopped && currentArray.length > 0)
            swap_pusher()
        else if (!stopped && currentArray.length < 1)
        {
            dispatch({type: 'update-stoppage'})
            dispatch({type: 'update-sorting-status', data: false})
            let mapTmp = JSON.parse(JSON.stringify(mapTest))
            let newMap = mapTmp.map((item, index) => {
                if (item.color !== sortColors.unsorted)
                    item.color = sortColors.unsorted
                return item
            })
            updateGlobal(0)
            setMapTest(newMap)
        }
        else
            return
    }, [currentArray])

    useEffect(() => {
        if (stopped === false)
        {
            if (!isSorted(array_to_sort))
                do_sort()
            else
                dispatch({type: 'update-stoppage'})
        }
    },[stopped])

    useEffect(() => {
        if (refresh)
            updateMapBars(count, "refresh")
    },[refresh])

    useEffect(() => {
    },[setSort])
    
    return (
        <div style={{marginLeft: 40, marginTop: 20, backgroundColor: "white", height: 600, width: "94%"}}>
            <div style={{display: "flex", alignContent: "center", flexGrow: 1, flexShrink: 1 ,flexBasis: "auto", justifyContent: "center"}}>
            {mapTest.map((item, index) => {
                return (
                    <div key={index} style={{margin: 2, backgroundColor: item.color, 
                    maxHeight: 500,height: item.height, maxWidth: 100, width: ((window.innerWidth - 150) / mapTest.length)}}>
                    </div>
                )
            })}
            </div>
        </div>
    )
} 