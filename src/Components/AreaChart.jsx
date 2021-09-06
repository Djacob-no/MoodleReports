
const AreaChart = () => {
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
            <canvas id="myAreaChart" style={{"display": "block", "width": "567px", "height": "320px", "width":"567", "height":"320"}} className="chartjs-render-monitor"></canvas>
        </div>
    )
}

export default AreaChart
