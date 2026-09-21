import { TimerIcon } from 'lucide-react'

function Timer({remainingTime}: {remainingTime: number}) {
  const minutes = Math.floor((remainingTime / 60))
  const seconds = remainingTime - (60 * minutes)
  return (
    <div className="flex items-center gap-4 w-50">
      <p className="me-0.5 timer rounded-full bg-gray-200 p-1">
        <TimerIcon size={28} className='timer-icon' />
      </p>
      <div className="">

        <p className="text-gray-700 font-semibold text-xl">
          {`${minutes< 10? '0'+minutes:minutes} : ${seconds < 10? '0'+seconds:seconds} Min`}
        </p>
        <p className='ms-auto text-xs text-right text-gray-700'>
          Restant
        </p>
      </div>
    </div>
  )
}

export default Timer

// State Questions [{id}, {id}]
//   state signletimer (question_id, time)

