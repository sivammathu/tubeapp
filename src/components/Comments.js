import React from 'react';
import Channel from '../res/Channel.JPG';

const Comments = () => {
  return (
    <div className='mt-5'>
        <AddComment />
        <DisplayComment />
        <DisplayComment />
        <DisplayComment />
        <DisplayComment />
        <DisplayComment />
        <DisplayComment />
        <DisplayComment />
        <DisplayComment />
    </div>
  )
}

const AddComment = () => {
    return <div className='flex gap-3 items-end'>
        <img src={Channel} className="w-[50px] h-[50px] rounded-full flex-shrink-0"/>
        <input placeholder='Add a comment...' className='outline-none w-[100%] border-b h-max mb-2 pt-2 px-1' />
    </div>
}

const DisplayComment = () => {
    return <div className='flex gap-3 mt-10'>
        <img src={Channel} className="w-[50px] h-[50px] rounded-full flex-shrink-0"/>
        <div>
            <div className='flex text-sm items-center'>
                <h2 className='font-bold'>User name</h2>
                <span className='pl-3 text-gray-500 text-xs'>1 day ago</span>
            </div>
            <div>
                I am adding this comment to tell you how much i likes this video. Please continue good work adding more videos
            </div>
        </div>
    </div>
}

export default Comments