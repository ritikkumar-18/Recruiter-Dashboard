import React, { useState } from 'react';
import Settingpage1 from './Settingpage1';
import { Lock } from 'lucide-react';
import ToggleSwitch from './ToggleSwitch';


const Security = () => {
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <Settingpage1 icon={Lock} title={"Security"}>
      <ToggleSwitch
        label={"Two Factor Authentication"}
        isOn={twoFactor}
        onToggle={() => setTwoFactor(!twoFactor)}/>
      
    </Settingpage1>
  );
};

export default Security;
