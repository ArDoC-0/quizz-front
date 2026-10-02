import { FileIcon } from 'lucide-react'
import React from 'react'
import CorrectionPage from './Components/CorrectionPage'

function Results() {
    return (
        <div className='rounded-2xl bg-white'>
            <h2 className="text-slate-800 text-xl p-4 font-semibold">
                Evaluation 1
            </h2>
            <div className="mx- p-4 bg-gray-50 ">
                <div className="w-[80%]">

                    <p className="text-left text-gray-900 text-md font-semibold mb-1">
                        Question 1
                    </p>

                    <p className="text-gray-800  mb-4 font-medium shadow-gray-400 shadow-">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo odit dolor officia quis, dolore laboriosam!
                    </p>

                    <div className="min-h-[250px] text-white p-2 bg-gray-900 mb-4">

                    </div>

                    <div className="flex">
                        <div className="flex p-2 hover:bg-gray-100 cursor-pointer items-start gap-2 shadow rounded-md">
                            <div className="icon">
                                <FileIcon className='text-gray-800' />
                            </div>
                            <div className="">

                                <p className="text-gray-800 font-medium">
                                    File.png
                                </p>
                                <p className='text-xs text-gray-500'>
                                    (Download)
                                </p>

                            </div>

                        </div>
                    </div>
                    <div className="mt-4 mx-auto">
                        <div className='py-2 overflow-x-visible px-8 w-full'>

                            <div className='answer overflow-visible'>

                                <div className=" rounded-sm relative m-auto py-[10px] pe-4 ps-[4rem] flex justify-between">
                                    <div className="selected absolute top-0 left-0 p-[1px] h-full"></div>
                                    <div className="">
                                        La reponse est ...
                                    </div>
                                </div>

                            </div>

                        </div>
                        <div className="redaction-zone">
                            <textarea className='w-full rounded-2xl min-h-[450px] mb-2 shadow-xl p-4' placeholder='Composer ici ...' name="redaction" id=""></textarea>
                        </div>
                    </div>

                    <CorrectionPage/>
                </div>
            </div>
        </div>
    )
}

export default Results