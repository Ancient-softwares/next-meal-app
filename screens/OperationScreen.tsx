// import React from 'react';
import React, { useState } from 'react';
import { View } from '../components/Themed';
import styles from '../styles/OperationScreen.style';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000'

const OperationScreen = () => {
  const [n1, setN1] = useState(0)
  const [n2, setN2] = useState(0)

  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    
    await axios({
      method: 'post',
      url: `${API_URL}/api/soma`,
      headers: {
        'Accept':   'application/json',
        'Content-Type':   'application/json'
      },
      data: JSON.stringify({
        n1: n1,
        n2: n2
      })
    })
      .then(
        response => console.log('Soma: ' + JSON.stringify(response.data))
      )
      .catch(error => console.log("ERROR:: " + error.response.data))
  }
  
  return (
    <View style={styles.container}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="first"
          name="first"
          value={n1}
          onChange={event => setN1(event.target.value)}
          required
        />
        <input
          type="text"
          id="second"
          name="second"
          value={n2}
          onChange={event => setN2(event.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </View>
  );
}

export default OperationScreen


