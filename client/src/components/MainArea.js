import React,{ useState, useEffect } from 'react';

export const MainArea = () => {

    const [height, setHeight] = useState("20em")

    function handler_1800 () {
      setHeight("150em")
    }
    function handler_2000 () {
      setHeight("137em")
    }
  
    //window.matchMedia("(min-height: 1800px)").addListener(handler_1800)
    window.matchMedia("(min-height: 2000px)").addListener(handler_2000)
    return (
        <div style={{marginLeft: 90, marginTop: 80, backgroundColor: "yellow", height: height, width: "88%"}}>
            <h>Hello</h>
        </div>
    )
} 