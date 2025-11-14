
const SmallCard = (props) => {

    return (
        <div className="col-xl-3 col-md-6 mb-4">
            <div className={`card border-left-${props.color} shadow h-100 py-2`}>
                <div className="card-body">
                    <a href={props.onClick ? "jav:": null} onClick={props.onClick}>
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className={`text-xs font-weight-bold text-${props.color} text-uppercase mb-1`}>
                                    {props.title} </div>
                                <div id={props.title} className="h5 mb-0 font-weight-bold text-gray-800">{props.value}</div>
                            </div>
                            <div className="col-auto">
                                <i className={`fas fa-${props.icon} fa-2x text-gray-300`}></i>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default SmallCard


