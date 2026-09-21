import React from 'react'

function SingleTimer({ remainingTime }: { remainingTime: number }) {
    const minutes = Math.floor((remainingTime / 60))
    const seconds = remainingTime - (60 * minutes)
    return (
        <span className='second-timer bg-white p-1'>
            {`${minutes < 10 ? '0' + minutes : minutes} : ${seconds < 10 ? '0' + seconds : seconds}`}
        </span>)
}

export default SingleTimer