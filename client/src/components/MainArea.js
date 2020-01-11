import React,{ useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

export const MainArea = () => {

    const [barCount, setBarCount] = useState(10)
    const [mapTest, setMapTest] = useState([])
    const [switchIndexes, updateIndexes] = useState([1, 5])
    const count = useSelector(state => state.navState.amount)

    useEffect(() => {
        updateMapBars(count)
    }, [count])

    useEffect(() => {
    }, [mapTest])

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
        setMapTest(test)
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
    }
    useEffect(() => {
        //setTimeout(() => { updateIndexes([2, 12, 5])}, 2000)
        updateMapBars(count)
    },[])
    return (
        <div style={{marginLeft: 40, marginTop: 20, backgroundColor: "white", height: 600, width: "94%"}}>
            <div style={{display: "flex", alignContent: "center", flexGrow: 1, flexShrink: 1 ,flexBasis: "auto", justifyContent: "center"}}>
            {mapTest.map((item, index) => {
                return (
                    <div style={{margin: 2, backgroundColor: (switchIndexes.includes(index) ?"green" : "red"), 
                    maxHeight: 400,height: item.height, maxWidth: 100, width: ((window.innerWidth - 150) / mapTest.length)}}>
                    </div>
                )
            })}
            <button onClick={async ()=> {await swap(switchIndexes)}}>Click</button>
            </div>
        </div>
    )
} 