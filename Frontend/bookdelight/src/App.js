import React, {useEffect} from 'react';
import axios from "axios";


function App() {
    useEffect(() => {
        axios.get(`http://localhost:${process.env.BACKEND_PORT}/`, {
            headers: {
                'Cache-Control': 'no-cache',
            }
        })
            .then(response => {
                console.log('Api is working');
            })
            .catch(error => {
                console.error('Api is NOT working');
                console.error(error);
            });
    }, []);
  return (
      <div>
          <h1>Hello World</h1>
      </div>
  );
}

export default App;
