import React, { useEffect } from 'react'

function ProgressionBar({ total, current }: { total: number, current: number }) {
    let ratio = Math.floor(current / total * 100)
    console.log(ratio);
    // useEffect(() => {
    //     ratio = Math.floor(current / total * 100)
    // }, [total, current])
    return (
        <div className="w-90">
            <h3 style={{marginInlineStart: ratio+'%'}} className={` w-fit duration-500 translate-x-[-50%] text-left font-semibold w-25 text-green-400`}>
                {`${ratio}%`}
            </h3>
            <div  className="w-90 bg-gray-300 rounded-xl overflow-hidden">
                <div style={{width: ratio+'%'}} className={`duration-500 p-1 bg-green-400`}>

                </div>
            </div>
        </div>)
}

export default ProgressionBar