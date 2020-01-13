import React,{ useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { quick_sort, is_sorted }  from '../sorts/quicksort.js'

export const MainArea = () => {

    const sortColors = {
        unsorted: "red",
        sorted: "blue",
        searching: "yellow",
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
    const [switchValues, updateSwitchValues] = useState({
        SHOW_SEARCH: false
    })
    const [info, updateInfo] = useState([])


    async function setSearchIndex(info)
    {
        let mapTmp = JSON.parse(JSON.stringify(mapTest))
        let newMap = []
            newMap = mapTmp.map((item, index) => {
                if (item.color !== sortColors.unsorted && item.color !== sortColors.sorted 
                    && item.color !== sortColors.pivot)
                    item.color = sortColors.unsorted
                if (index === info[0].searched[0][0])
                    item.color = sortColors.searching
                else if (index === info[0].searched[0][1])
                    item.color = sortColors.searching
                return item
        })
        let newInfo = JSON.parse(JSON.stringify(info))
        newInfo[0].searched.splice(0,1)
        newMap = newMap.map((item, index) => {
            let result = isInSortedPosition(item.number, index)
            if (result && item.number !== sortColors.pivot)
                item.color = sortColors.sorted
            return item
        })
        setMapTest(newMap)
        updateInfo(newInfo)
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
        if (switchValues.SHOW_SEARCH && info[0].searched.length > 0 && !isEqualPair(info[0].searched[0], info[0].pair))
        {
            await setSearchIndex(info)
            return
        }
        swap(info[0].pair)
        let newInfo = JSON.parse(JSON.stringify(info))
        newInfo.splice(0,1)
        updateInfo(newInfo)
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
            else if (index === value_array[2])
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
            //console.log("RESULT ", result)
            new_bar.number = result
            new_bar.height = (result)
            mapTmp.push(new_bar)
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
        quick_sort(array_to_sort, 0, array_to_sort.length - 1, infor)
        updateSort(array_to_sort)
        updateInfo(infor)
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
        if (!stopped && info.length > 0)
            swap_pusher()
        else if (!stopped && info.length < 1)
        {
            dispatch({type: 'update-stoppage'})
            dispatch({type: 'update-sorting-status', data: false})
            let mapTmp = JSON.parse(JSON.stringify(mapTest))
            let newMap = mapTmp.map((item, index) => {
                if (item.color !== sortColors.unsorted)
                    item.color = sortColors.unsorted
                return item
            })
            setMapTest(newMap)
        }
        else
            return
    }, [info])

    useEffect(() => {
        if (stopped === false)
        {
            if (!is_sorted(array_to_sort))
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
    },[array_to_sort])
    
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