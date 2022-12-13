import { RentalModule } from 'modules';
import React from 'react';
import {AppShell} from "shell";


function App() {

  return (
    <AppShell withoutLogin={true} moduleDefinitions={[RentalModule]} />
  );
}

export default App
