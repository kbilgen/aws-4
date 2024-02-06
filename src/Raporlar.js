import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Raporlar = () => {
  const [raporlar, setRaporlar] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://5ygl1p232h.execute-api.eu-west-3.amazonaws.com/kisi_sayisi/Fon_kisi_sayisi');
        setRaporlar(response.data);
      } catch (error) {
        console.error('Veri çekme hatası:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Raporlar Sayfası</h1>
      <p>Bu sayfada raporlarınızı görüntüleyebilirsiniz.</p>
      <table>
        <thead>
          <tr>
            <th>Fon Adı</th>
            <th>Değişim</th>
          </tr>
        </thead>
        <tbody>
          {raporlar.map((rapor, index) => (
            <tr key={index}>
              <td>{rapor['Fon Adı']}</td>
              <td>{rapor['Değişim']}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Raporlar;
