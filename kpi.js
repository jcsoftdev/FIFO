const store = {
  kpi1: {
    request: [],
    completed: [],
    expected: 0,
    acceptable: 0,
  },
  kpi2: {
    month: [],
    cost: [],
    neto: 0,
  },
  kpi3: {},
};
document.getElementById("form-1").addEventListener("submit", (e) => {
  e.preventDefault();
  const elements = e.currentTarget.elements;
  const request = Number(elements["request"].value);
  const completed = Number(elements["completed"].value);
  store.kpi1.request.push(request);
  store.kpi1.completed.push(completed);
  const $table1 = document.getElementById("table1");
  elements['request'].value=''
  elements['completed'].value=''
  $table1.innerHTML = getTable(store);
});

const reducer = (accumulator, currentValue) => accumulator + currentValue;

function getAlert(result, expected, accepted) {
  let alert = "";
  if (result >= expected) {
    alert += `
    <div class="alert alert-success" role="alert">
      Esperado : ${result} %
    </div>`;
  } else if (result >= accepted) {
    alert += `
    <div class="alert alert-warning" role="alert">
      Aceptable : ${result} %
    </div>`;
  } else {
    alert += `
    <div class="alert alert-danger" role="alert">
      Mejorable : ${result} %
    </div>`;
  }
  return alert;
}

function getTable(store = store) {
  let ths = ``;
  let tds1 = "";
  let tds2 = "";
  for (let i = 0; i < store.kpi1.request.length; i++) {
    ths += `<th>${i + 1}</th>`;
    tds1 += `<td>${store.kpi1.request[i]}</td>`;
    tds2 += `<td>${store.kpi1.completed[i]}</td>`;
  }
  const total1 = store.kpi1.request.reduce(reducer);
  const total2 = store.kpi1.completed.reduce(reducer);
  const result = (total2 / total1) * 100;
  console.log(result, store);

  const alert = getAlert(result, 80, 40);

  const template = `
  <table class="fl-table mb-3" >

  <thead>
  <tr>
  <th scope="col">Nro Periodos</th>
  ${ths}
  <th>Total</th>
  </tr>
  </thead>
  <tbody class='fl-table'>
  <tr>
  <th>
  Cantidad de referencias Solicitada
  </th>
  ${tds1}
  <td>${total1}</td>
  </tr>
  <tr>
  <th>
  Cantidad de referencias Entregada Completas
  </th>
  ${tds2}
  <td>${total2}</td>
  </tr>
  </tbody>
  </table>
  ${alert}
  `;
  return template;
}
