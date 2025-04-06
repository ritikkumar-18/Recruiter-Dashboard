 import React from 'react'
 import Settingpage1 from './Settingpage1'
 import { User } from 'lucide-react'

 const Profile = () => {
   return (
     < Settingpage1 icon={User} title={"Profile"}>
         <div className='flex flex-col items-center sm:flex-row mb-6 '>
          <img src='https://t3.ftcdn.net/jpg/10/06/36/08/240_F_1006360868_NGeKlYvbt39P8rOOZvIkotMiET9KOg5U.jpg'alt='profile' className='rounded-full w-20 h-20 object-cover mr-4'/>
             <div className=' xs:text-center'>
                 <h3 className='text-lg font-semibold text-gray-100'>XYZ</h3>
                 <p className='text-gray-400 '>XYZ@gmail.com</p>
             </div>

         </div>
         <button className='bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 w-auto sm:mx-auto sm:w-auto'>Edit Profile</button>
     </Settingpage1>
   )
 }

 export default Profile