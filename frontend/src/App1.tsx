import React from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { ProgressBar } from 'primereact/progressbar';
import { ColorPicker } from 'primereact/colorpicker';
import { classNames } from 'primereact/utils';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import './App.css';

const themes = [
  'bootstrap4-light-blue',
  'bootstrap4-light-purple',
  'md-light-indigo',
  'md-light-deeppurple',
  'saga-blue',
  'saga-green',
  'saga-orange',
  'saga-purple',
  // add more themes here
];

const App = () => {
  const [theme, setTheme] = React.useState(themes[0]);
  const [backgroundColor, setBackgroundColor] = React.useState('#ffffff');
  const [fontColor, setFontColor] = React.useState('#000000');

  const changeTheme = (event) => {
    const theme = event.value;
    const themeLink = document.getElementById('theme-link');
    themeLink.href = `/primereact/resources/themes/${theme}/theme.css`;
    setTheme(theme);
  };

  const changeColors = (event) => {
    setBackgroundColor(event.value);
    setFontColor(event.value === '#000000' ? '#ffffff' : '#000000');
  };

  const getSearchIconClassName = () => {
    return classNames('pi', {
      'pi-search': fontColor === '#ffffff',
      'pi-search-minus': fontColor === '#000000'
    });
  };

  return (
    <div className={`p-grid p-dir-col p-ai-center ${theme}`}>
      <h2>PrimeReact Theme Switcher</h2>
      <Dropdown value={theme} options={themes} onChange={changeTheme} placeholder="Select a Theme" />
      <InputText value="Hello, world!" readOnly className="p-mt-3" style={{ backgroundColor, color: fontColor }} />
      <Button label="Click Me" className="p-mt-3" />
      <ProgressBar value={50} className="p-mt-3" />
      <div className="p-field p-mt-3">
        <label htmlFor="colorPicker">Choose a color:</label>
        <ColorPicker id="colorPicker" value={backgroundColor} onChange={changeColors} />
      </div>
      <i className={getSearchIconClassName()} style={{ fontSize: '2rem', color: fontColor }}></i>
    </div>
  );
};

export default App;
