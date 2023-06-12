import React, { useState } from 'react';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { TabView, TabPanel } from 'primereact/tabview';
import { Image } from 'primereact/image';
import { Card } from 'primereact/card';
import { InputSwitch } from 'primereact/inputswitch';
import { InputTextarea } from 'primereact/inputtextarea';

const NotificationSettingsComponent = () => {
  const [isThemeSelected, setThemeSelected] = useState(false);
  const [areNotificationsOff, setNotificationsOff] = useState(false);

  const handleThemeSwitchChange = (e) => {
      setThemeSelected(e.value);
  };

  const handleNotificationSwitchChange = (e) => {
      setNotificationsOff(e.value);
  };

  return (
      <div>
          <h2 style={{fontWeight: 'bold'}}>Notification Settings</h2>
          <p>Select notification you want to receive</p>

          <div style={{marginTop: '30px'}}>
              <h3 style={{fontWeight: 'bold'}}>Theme</h3>
              <Card>
                  <h4>Select Theme</h4>
                  <InputSwitch checked={isThemeSelected} onChange={handleThemeSwitchChange} />
              </Card>
          </div>

          <div style={{marginTop: '30px'}}>
              <h3 style={{fontWeight: 'bold'}}>Notifications</h3>
              <Card>
                  <h4>Turn off notifications</h4>
                  <InputSwitch checked={areNotificationsOff} onChange={handleNotificationSwitchChange} />
              </Card>
          </div>
      </div>
  );
};
const ProfileComponent = () => {
  const [avatar, setAvatar] = useState('https://example.com/default-avatar.jpg');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAvatarChange = () => {
      // Implement your logic for changing the avatar here
      // For example, you can open a file picker or display a dialog for selecting a new avatar image
  };

  const handleSaveChanges = () => {
      // Implement your logic for saving the changes here
      // You can access the updated values of firstName, lastName, email, and password
  };

  return (
      <div>
          <div className="p-d-flex p-ai-center">
              <Image src="https://i.natgeofe.com/k/95d61645-a0c7-470f-b198-74a399dd5dfb/singapore-city_2x3.jpg" alt="Image" width="250" height='250' preview />
              <Button label="Zmień awatar" onClick={handleAvatarChange} style={{marginLeft: '50px'}}/>
          </div>

          <div className="p-grid p-mt-4" style={{marginTop: '40px', width: '100%'}}>
              <div className="p-col-12 p-md-6" style={{width: '100%'}}>
                  <InputText id="firstName" placeholder="Imię" value={firstName} onChange={(e) => setFirstName(e.target.value)} style={{width: '49%', marginRight: '2%'}} />
                  <InputText id="lastName" placeholder="Nazwisko" value={lastName} onChange={(e) => setLastName(e.target.value)} style={{width: '49%'}}/>
              </div>
              <div className="p-col-12 p-md-6" style={{marginTop: '2%'}}>
                  <InputText id="lastName" placeholder="Email" value={lastName} onChange={(e) => setLastName(e.target.value)} style={{width: '49%', marginRight: '2%'}}/>
                  <InputText id="Address" placeholder="Address" value={lastName} onChange={(e) => setLastName(e.target.value)} style={{width: '49%'}}/>
              </div>
              <div className="p-col-12 p-md-6" style={{marginTop: '2%', marginBottom: '40px'}}>
                  <InputText id="Phone" placeholder="Phone" value={lastName} onChange={(e) => setLastName(e.target.value)} style={{width: '49%', marginRight: '2%'}}/>
                  <InputText id="password" type="password" placeholder="Hasło" value={password} onChange={(e) => setPassword(e.target.value)} style={{width: '49%'}}/>
              </div>
          </div>
          <InputTextarea style={{marginTop: '2%', marginBottom: '40px'}} rows={5} cols={121} />
          <div className="p-d-flex p-jc-end p-mt-4">
              <Button label="Zapisz zmiany" onClick={handleSaveChanges} />
          </div>
      </div>
  );
};

const Settings = () => {

return (
  <TabView>
      <TabPanel header="Profil">
          <ProfileComponent/>
      </TabPanel>
      <TabPanel header="Settings">
          <NotificationSettingsComponent/>
      </TabPanel>
  </TabView>
  )
}

export default Settings