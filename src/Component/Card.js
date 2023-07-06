import React from 'react';
const Card = ({title , handleClick}) =>{


    return (
        <div onClick={handleClick} className='capitalize bg-white  sm:w-[68px] sm:h-[26px] h-[160px] w-[240px] rounded-lg flex flex-col items-center justify-center hover:cursor-pointer hover:border-solid hover:border-[1px] hover:border-black m-1'>
            <h4 className='sm:text-sm text-2xl text-blue-900 font-bold'>{title}</h4>
            <p className='sm:hidden text-purple-800 text-base'>Unlimited jokes on {title}</p>
        </div>
    )
}
export default Card;