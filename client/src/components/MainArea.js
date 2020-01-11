import React,{ useState, useEffect } from 'react';

export const MainArea = () => {

    const [height, setHeight] = useState("20em")

    /*function handler_2200 () {
        setHeight("190em")
      }
    function handler_2000 () {
        setHeight("140em")
      }
    function handler_1800 () {
      setHeight("100em")
    }
    function handler_1000 () {
        setHeight("80em")
      }
      function handler_900 () {
        setHeight("40em")
      }
    window.matchMedia("(max-height: 900px)").addListener(handler_900)
    window.matchMedia("(max-height: 1000px)").addListener(handler_1000)
    window.matchMedia("(max-height: 1800px)").addListener(handler_1800)
    window.matchMedia("(max-height: 2000px)").addListener(handler_2000)
    window.matchMedia("(max-height: 2200px)").addListener(handler_2200)*/
    return (
        <div style={{marginLeft: 90, marginTop: 80, backgroundColor: "yellow", height: 600, width: "92%"}}>
            <h>Hello</h>
        </div>
    )
} 