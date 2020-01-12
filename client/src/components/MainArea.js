import React,{ useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { quick_sort }  from '../sorts/quicksort.js'

export const MainArea = () => {

    const [barCount, setBarCount] = useState(10)
    const [mapTest, setMapTest] = useState([])
    const [switchIndexes, updateIndexes] = useState([1, 5])
    const [array_to_sort, updateSort] = useState([])
    const count = useSelector(state => state.navState.amount)
    const stopped = useSelector(state => state.navState.stopped)
    const delay = useSelector(state => state.navState.delay)
    const [info, updateInfo] = useState([])

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
        {
        console.log(info[0].new_array)
        swap(info[0].pair)
        let test = JSON.parse(JSON.stringify(info))
        test.splice(0,1)
        updateInfo(test)
        }
        else
            return
    }, [mapTest, info])

    useEffect(() => {
        console.log("STOPPED: ", stopped)
        if (stopped === false)
            do_sort()
        else
        {
            console.log("HEYNOW")
            updateInfo()
        }
    },[stopped])

    const swap = async (value_array) => {
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

    const updateMapBars = async (num) => {
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
    }
    const do_sort = async () => 
    {
        let infor = quick_sort(array_to_sort, 0, array_to_sort.length - 1)
        updateInfo(infor)
        /*info.forEach(async (item, index) => {
            await delaySet(delay).then(() => {
                swap(info[index].pair)
                console.log(info[index].new_array, info[index].pair)
                
            })
        })
        await swap(info[0].pair)
        await swap(info[1].pair)
        await swap(info[2].pair)
        await swap(info[3].pair)*/
        swap(infor[0].pair)

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
                    <div key={index} style={{margin: 2, backgroundColor: (switchIndexes.includes(index) ?"green" : "red"), 
                    maxHeight: 400,height: item.height, maxWidth: 100, width: ((window.innerWidth - 150) / mapTest.length)}}>
                    </div>
                )
            })}
            </div>
        </div>
    )
} 