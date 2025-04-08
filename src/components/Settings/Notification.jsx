import React from 'react'
import { useState } from 'react'
import Settingpage1 from './Settingpage1'
import { Bell } from 'lucide-react'
import ToggleSwitch from './ToggleSwitch'

const Notification = () => {
    const[notifications,setNotifications]=useState({
        push:true,
        email:false,
        sms:true,

    })
    
  return (
      <Settingpage1 icon={Bell} title={"Notifications"}>
        <ToggleSwitch label ={"Push Notifications"}
        isOn={notifications.push}
        onToggle={() => setNotifications({ ...notifications, push: !notifications.push })}/>
        <ToggleSwitch label ={"Email Notifications"}
        isOn={notifications.email}
        onToggle={() => setNotifications({ ...notifications, email: !notifications.email})}/>
        

    
      </Settingpage1>
  )
}

export default Notification