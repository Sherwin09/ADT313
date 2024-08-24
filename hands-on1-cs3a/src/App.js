import logo from './logo.svg';
import './App.css';
import Name from './Components/Name.jsx';
import Section from './Components/Section';
import Description from './Components/Description';
import { useState } from 'react';

function App() {
  const [UserInformation, setUserInformation] = useState({
    firsName: 'Sherwin',
    middleInitial: 'M.',
    lastName: 'Bernardo',
    section: 'Bernardo',
    description: 'kyut',
  });
  function updateName(){
    UserInformation.firsName = 'Win';
    setUserInformation({...UserInformation})
    return UserInformation;
  };

  
  return (
    <div className='App'>
      <div className='App'>
        <Name
          firstName={UserInformation.firsName}
          middleName={UserInformation.middleInitial}
          lastName={UserInformation.section}
          description={UserInformation.description}
        />
        <Section
          section={UserInformation.section} />
        <Description
          description={UserInformation.description} />
        <div className='moon'></div>
        <button
          type='button' onClick={updateName}>
          Update Name
        </button>
       
        <div className='moon1'>


          </div>
      </div>
    </div>

  )
}

export default App;
