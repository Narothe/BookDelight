import React, {useEffect} from 'react';
import axios from "axios";


function App() {
    useEffect(() => {
        axios.get('http://localhost:3000/', {
            headers: {
                'Cache-Control': 'no-cache',
            }
        })
            .then(response => {
                console.log('Api is working');
            })
            .catch(error => {
                console.log('Api is NOT working');
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
