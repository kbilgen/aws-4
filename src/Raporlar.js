import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  ThemeProvider,
  Theme,
} from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'table-theme',
  tokens: {
    components: {
      table: {
        row: {
          hover: {
            backgroundColor: { value: '{colors.blue.20}' },
          },
          striped: {
            backgroundColor: { value: '{colors.blue.10}' },
          },
        },
        header: {
          color: { value: '{colors.blue.80}' },
          fontSize: { value: '{fontSizes.xl}' },
        },
        data: {
          fontWeight: { value: '{fontWeights.semibold}' },
        },
      },
    },
  },
};

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
    <ThemeProvider theme={theme} colorMode="light">
      <h2>Son 30 Gün İçinde Kişi Sayısı En Fazla Değişen İlk 10 Fon</h2>
      <Table highlightOnHover variation="striped">
        <TableHead>
          <TableRow>
            <TableCell as="th">Fon Kodu</TableCell>
            <TableCell as="th">Fon Adı</TableCell>
            <TableCell as="th">Değişim</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {raporlar.map((rapor, index) => (
            <TableRow key={index}>
              <TableCell>{rapor['Fon Kodu']}</TableCell>
              <TableCell>{rapor['Fon Adı']}</TableCell>
              <TableCell>{rapor['Değişim']}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ThemeProvider>
  );
};

export default Raporlar;
