import React,{ useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { quick_sort, is_sorted }  from '../sorts/quicksort.js'

export const MainArea = () => {

    const dispatch = useDispatch()
    const [barCount, setBarCount] = useState(10)
    const [mapTest, setMapTest] = useState([])
    const [array_to_sort, updateSort] = useState([])
    const count = useSelector(state => state.navState.amount)
    const stopped = useSelector(state => state.navState.stopped)
    const delay = useSelector(state => state.navState.delay)
    const refresh = useSelector(state => state.navState.refresh)
    const [info, updateInfo] = useState([])

    async function test()
    {
        console.log("TLOOOL")
        await delaySet(delay)
        swap(info[0].pair)
        let test = JSON.parse(JSON.stringify(info))
        test.splice(0,1)
        updateInfo(test)
    }

    async function delaySet(time) {
        return new Promise(function(resolve) {
            setTimeout(resolve, time)
        });
    }

    useEffect(() => {
        updateMapBars(count)
    }, [count])

    useEffect(() => {
        if (!stopped && info.length > 0)
            test()
        else if (!stopped && info.length < 1)
        {
            dispatch({type: 'update-stoppage'})
            dispatch({type: 'update-sorting-status', data: false})
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

    const swap = async (value_array, status) => {
        if (status === "pusher")
            return
        let mapTmp = JSON.parse(JSON.stringify(mapTest))
        let tmp = {number: 0, height: 0}
        let test = mapTmp.map((item, index) => {
            tmp = JSON.parse(JSON.stringify(mapTmp[value_array[0]]))
            if (index === value_array[0])
                item = mapTmp[value_array[1]]
            else if (index === value_array[1])
                item = tmp
            return item
        })
        await setMapTest(test)
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
            let new_bar = {number: 0, height: 0}
            let result = Math.floor((Math.random() * value_array.length - 1) + 1)
            result = value_array.splice(result, 1)
            new_bar.number = result[0]
            new_bar.height = 400/(num - result[0])
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
        let infor = []
        quick_sort(array_to_sort, 0, array_to_sort.length - 1, infor)
        console.log(array_to_sort, infor)
        updateInfo(infor)
        swap(infor[0].pair, "pusher")
    }

    useEffect(() => {
        updateMapBars(count)
    },[])

    useEffect(() => {
        console.log(array_to_sort)
    },[array_to_sort])
    
    return (
        <div style={{marginLeft: 40, marginTop: 20, backgroundColor: "white", height: 600, width: "94%"}}>
            <div style={{display: "flex", alignContent: "center", flexGrow: 1, flexShrink: 1 ,flexBasis: "auto", justifyContent: "center"}}>
            {mapTest.map((item, index) => {
                return (
                    <div key={index} style={{margin: 2, backgroundColor: (info ?(info.length > 0 && info[0].pair.includes(index) ? "green" : "red"):"red"), 
                    maxHeight: 400,height: item.height, maxWidth: 100, width: ((window.innerWidth - 150) / mapTest.length)}}>
                    </div>
                )
            })}
            </div>
        </div>
    )
} 