import { CheckCircle, CheckCircle2, CheckCircle2Icon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'
import SecondaryButton from './SecondaryButton'

function Finish() {
    return (
        <div className='flex items-center h-dvh bg-gray-100'>
            <div className="m-auto h-fit bg-white rounded-2xl pt-10 p-8">
                <div className="text-center mt-[-2rem]">
                    <CheckCircle2Icon className='block text-green-400 mx-auto' size={'200px'} />
                    <p className='text-xl text text-gray-800 font-medium'>
                        Félicitation! Vous avez terminé l'évaluation.
                    </p>
                    <p className='mb-4 text-gray-500 '>
                        Trouvez le résultat dans la partie espace étudiant
                    </p>

                    <Link >
                        <SecondaryButton>
                            Voir les résultats
                        </SecondaryButton>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Finish