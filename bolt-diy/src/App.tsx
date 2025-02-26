import React from 'react';
import { BoltDIY } from '@stackblitz/bolt-diy';

function App() {
  return (
    <div className="app-container">
      <header>
        <h1>Bolt DIY</h1>
      </header>
      <main>
        <BoltDIY />
      </main>
      <footer>
        <p>Powered by Bolt DIY</p>
      </footer>
    </div>
  );
}

export default App;