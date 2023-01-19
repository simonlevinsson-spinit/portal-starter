import { InvoiceModule } from "invoice";
import React from "react";
import { RentalModule } from "rental";
import { AppShell } from "shell";
function App() {
	return <div className="p-4"  > <AppShell moduleDefinitions={[InvoiceModule, RentalModule]} /></div>;
}

export default App;
