import { Link, Navigate } from "react-router-dom"
import Button from "./Components/Button"
import '../Student/Components/scss/_button.scss'
import { useState } from "react"
import { evaluationService } from "./services/evaluationService"
import { setQuestionSet } from "./questionsSlice"
import { questions } from "../../shared/constants/constants"
import { useAppDispatch } from "../../shared/hooks/hooks"
import { setUser } from "../auth/authSlice"

function Dashboard() {
  const [status, setStatus] = useState('idle')
  const dispatch = useAppDispatch()
  const attempt = async () => {
    setStatus('loading')
    const {success, message} = await evaluationService.attempt()
    if(success){
      dispatch(setQuestionSet(questions))

      console.log(
        questions
      );
      return <Navigate to='/evaluation' replace/>
    }
    if(!success){
      return setStatus('failed')
    }
  }
  return (
    <div>
      <div className="px-2 mb-4 py-5 bg-white flex justify-center flex-col">

            <button onClick={attempt} className={`pointer block mx-auto mb-2 p-2 bg-green-500 font-semibold text-white m-auto hover:bg-green-600 transition-all ${(status == 'loading')?'disable':''}`}>Commencer une Evaluation</button>

            {/* <button onClick={attempt} className={`pointer block mx-auto mb-2 p-2 bg-green-500 font-semibold text-white m-auto hover:bg-green-600 transition-all ${(status == 'loading')?'disable':''}`}>Commencer une Evaluation</button> */}
        
        <p className={`${status == 'failed'? 'text-red-500':''} text-center text-gray-500`}>
          { status== "failed"?"L'évaluation n'est pas encore disponible":"L\'évaluation est disponible sur ordre de l\'admin"}
        </p>
      </div>

      <div className="pt-4 rounded-3xl bg-white">
        <p className="text-center text-gray-700 mb-2">
          Historique des évaluations
        </p>
        <div className="border-t-1 border-gray-300">
          <div className="flex bg-red-100 items-center justify-between px-4 py-4 shadow">
            <p className="font-semibold text-gray-700">
              Evaluation 1
            </p>
            <p className="text-sm text-gray-700">
              <span>Date: </span>02/05/2026
            </p>
            <div className="text-sm text-gray-700">
              Questions: <span className="text-red-600"> 10/20</span>
            </div>
            <div className="text-sm text-gray-700">
              Réussite: <span className="text-red-600"> 50%</span>
            </div>
            <div className="text-sm text-gray-700">
              <span>Résultat: </span> <span className="text-red-600 font-bold">X</span>
            </div>
            <p className="font-seminold">
              <Link to={'/'}>
                <Button>
                  Voir
                </Button>
              </Link>
            </p>
          </div>

          <div className="flex bg-red-100 items-center justify-between px-4 py-4 shadow">
            <p className="text-gray-700 font-semibold">
              Evaluation 1
            </p>
            <p className="text-sm text-gray-700">
              <span>Date: </span>02/05/2026
            </p>
            <div className="text-sm text-gray-700">
              Questions: <span className="text-red-600"> 10/20</span>
            </div>
            <div className="text-sm text-gray-700">
              Réussite: <span className="text-red-600"> 50%</span>
            </div>
            <div className="text-sm text-gray-700">
              <span>Résultat: </span> <span className="text-red-600 font-bold">X</span>
            </div>
            <p className="font-seminold">
              <Link to={'/'}>
                <Button>
                  Voir
                </Button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard