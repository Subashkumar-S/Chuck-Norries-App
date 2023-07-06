import React from 'react';
import Cards from "./Component/Cards";

function App() {

  return (
    <div className="App w-full min-h-screen text-center bg-gradient-to-r from-blue-500 to-gray-800">
        <div className='h-fit w-full flex flex-col items-center'>
            <Cards />
        </div>
    </div>
  );
}

export default App;
