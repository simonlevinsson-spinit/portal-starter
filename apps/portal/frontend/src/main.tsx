import React from 'react'
import ReactDOM from 'react-dom/client'
import { authService } from 'shell';
import App from './App'

const createReactRoot = () => {
		ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
			<React.StrictMode>
				<App />
			</React.StrictMode>,
		);
	}

authService.init().then((createApp) => {
  if (createApp) {
      createReactRoot();
  }
});
