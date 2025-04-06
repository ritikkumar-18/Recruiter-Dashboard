import React from 'react'
import Header from '../components/Common/Header'
import Notification from '../components/Settings/Notification'
import Security from '../components/Settings/Security'
import Changepassword from '../components/Settings/Changepassword'

const Settings = () => {
  return (
    <div className='flex-1 overflow-auto relative z-10 scroll-hidden'>
    <Header title='Settings' />
    <main className='max-w-4xl mx-auto py-6 px-4 lg:px-8'>
     
         <Notification/>
         <Security/> 
         <Changepassword/> 
        
      
        </main>
    </div>

  )
}

export default Settings