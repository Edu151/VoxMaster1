const url = 'https://www.abibliadigital.com.br/api/verses/nvi/sl/23';
const options = {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHIiOiJXZ…zIyfQ.OqSvdgJBLrLZdp0S0ktRufgGYi8BBTeV5jgMxiQZRic'
  }
};

fetch(url, options)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
