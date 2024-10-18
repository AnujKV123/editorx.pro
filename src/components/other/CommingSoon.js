import React from 'react'
import { Linkedin } from 'lucide-react'
import { Github } from 'lucide-react'
import { Instagram } from 'lucide-react'
import { Link } from 'react-router-dom'

const CommingSoon = () => {
  return (
    <div className='flex mt-32 justify-center items-center '>
    <div class="bg-opacity-75 bg-white p-8 md:p-20 rounded-lg shadow-lg text-center">
        <h1 class="text-3xl md:text-5xl font-semibold mb-4">Coming Soon!</h1>
        <p class="text-lg md:text-xl mb-8">We're working on something amazing. Stay tuned!</p>
        <div class="flex justify-center mt-4">
            <Link target='_blank' to={"https://www.linkedin.com/in/anujverma11/"} class="w-10 h-10 bg-blue-500 p-1 rounded-full mr-2 flex items-center justify-center">
                <Linkedin />
            </Link>
            <Link target='_blank' to={"https://github.com/anujkv123"}  class="w-10 h-10 bg-gray-500 rounded-full mr-2 flex items-center justify-center">
                <Github />
            </Link>
            <Link target='_blank' to={"https://www.instagram.com/anuj.verma.__/"} class="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                <Instagram />
            </Link>
        </div>
    </div>
    </div>
  )
}

export default CommingSoon