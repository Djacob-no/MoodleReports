
import React, { useRef } from 'react';

const AreaChart = (props) => {

   
    const inputRef = useRef();
    const number_format = props.numfunc;
    console.log(inputRef);

    return (
        <div className="chart-area">
            <div className="chartjs-size-monitor">
                <div className="chartjs-size-monitor-expand">
                    <div className="">
                    </div>
                </div>
                <div className="chartjs-size-monitor-shrink">
                    <div className="">
                    </div>
                </div>
            </div>
            <canvas id="myAreaChart" ref={inputRef} style={{display: "block", width: "567px", width:"567", height:"320"}} className="chartjs-render-monitor"></canvas>
          
        </div>
    )
}

export default AreaChart
