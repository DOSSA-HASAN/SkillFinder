import React from 'react'
import MissingField from './MissingField'

function ProfileField({ label, id, field, missingField }) {
    return (
        <div className='flex flex-col justify-starts items-start w-full text-ellipses p-3'>
            <label htmlFor={id} className='font-bold text-[20px] text-[#25324B]'>{label}</label>
            {
                field ?
                    <p id={id} className='break-words w-full text-gray-500 border-1 border-gray-400 rounded-md p-2 focus:outline-none hover:cursor-not-allowed'>{field}</p>
                    :
                    <MissingField missingField={missingField} />

            }
        </div>
    )
}

export default ProfileField
