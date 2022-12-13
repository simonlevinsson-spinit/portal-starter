import { InvoiceModule, RentalModule } from 'modules';
import React from 'react';
import {AppShell} from "shell";


function App() {

  return (
    <AppShell moduleDefinitions={[InvoiceModule, RentalModule]} />
  );
}

export default App
