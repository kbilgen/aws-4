import React, { useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Gerekli Chart.js bileşenlerini ve ölçek türlerini kaydet
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Grafik = () => {
  const [fonKodu, setFonKodu] = useState('');
  const [kisiSayisiData, setKisiSayisiData] = useState({});
  const [fiyatData, setFiyatData] = useState({});
  const [toplamDegerData, setToplamDegerData] = useState({});
  const [paySayisiData, setPaySayisiData] = useState({});
  const [fundName, setFundName] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://5ygl1p232h.execute-api.eu-west-3.amazonaws.com/test/yatirimci?FonKodu=${fonKodu}`);
      const data = response.data;
  
      setFundName(data[0]["Fon Adı"]);
  
      setKisiSayisiData({
        labels: data.map(item => item.Tarih),
        datasets: [{
          label: 'Kişi Sayısı',
          data: data.map(item => item["Kişi Sayısı"]),
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      });
  
      setFiyatData({
        labels: data.map(item => item.Tarih),
        datasets: [{
          label: 'Fiyat',
          data: data.map(item => parseFloat(item["Fiyat"].replace(/\./g, '').replace(/,/g, '.'))),
          borderColor: 'rgb(255, 99, 132)',
          tension: 0.1
        }]
      });
  
      setToplamDegerData({
        labels: data.map(item => item.Tarih),
        datasets: [{
          label: 'Fon Toplam Değer',
          data: data.map(item => parseFloat(item["Fon Toplam Değer"].replace(/\./g, '').replace(/,/g, '.'))),
          borderColor: 'rgb(54, 162, 235)',
          tension: 0.1
        }]
      });
  
      setPaySayisiData({
        labels: data.map(item => item.Tarih),
        datasets: [{
          label: 'Tedavüldeki Pay Sayısı',
          data: data.map(item => parseFloat(item["Tedavüldeki Pay Sayısı"].replace(/\./g, '').replace(/,/g, '.'))),
          borderColor: 'rgb(255, 206, 86)',
          tension: 0.1
        }]
      });
  
    } catch (error) {
      console.error('Veri çekme hatası', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={fonKodu}
        onChange={(e) => setFonKodu(e.target.value.toUpperCase())}
        placeholder="Fon Kodu Girin"
      />
      <button onClick={fetchData}>Veriyi Çek</button>

      <div>
        {fundName && <h2>{fundName}</h2>}
        {kisiSayisiData.labels && <Line data={kisiSayisiData} />}
        {fiyatData.labels && <Line data={fiyatData} />}
        {toplamDegerData.labels && <Line data={toplamDegerData} />}
        {paySayisiData.labels && <Line data={paySayisiData} />}
      </div>
    </div>
  );
};

export default Grafik;
