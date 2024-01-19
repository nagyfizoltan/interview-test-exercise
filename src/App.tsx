import React from 'react'
import {ExampleForm, Props} from './Form';

function App() {
  function handleSubmit(formData: Props) {
    console.log(formData);
  }

  return (
    <div>
      <ExampleForm onSubmit={handleSubmit} />
    </div>
  );
}

export default App;