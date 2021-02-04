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
    neto: 0
  },
  kpi3: {}
};
document.getElementById("form-1").addEventListener("submit", (e) => {
  e.preventDefault();
  const elements = e.currentTarget.elements;
  const request = Number(elements["request"].value);
  const completed = Number(elements["completed"].value);
  store.kpi1.request.push(request);
  store.kpi1.completed.push(completed);
  const $table1 = document.getElementById("table1");

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
  return alert
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
  
  const alert = getAlert(result, 80, 40)

  const template = `
  <table class="table table-dark table-bordered border-primary" >

  <thead>
  <tr>
  <th scope="col">Nro Periodos</th>
  ${ths}
  <th>Total</th>
  </tr>
  </thead>
  <tbody>
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

// second kpi 

document.getElementById("form-2").addEventListener("submit", (e) => {
  e.preventDefault();
  const elements = e.currentTarget.elements;
  const month = (elements["month"].value);
  const cost = Number(elements["cost"].value);
  const neto = Number(elements["neto"].value);
  store.kpi2.month.push(month);
  store.kpi2.cost.push(cost);
  store.kpi2.neto = (neto);

  const $table2 = document.getElementById("table2");
  $table2.innerHTML = getTable2(store);
})
function getTable2(store = store) {
  let ths = ``;
  let tds = "";
  for (let i = 0; i < store.kpi2.month.length; i++) {
    ths += `<th>${store.kpi2.month[i]}</th>`;
    tds += `<td>${store.kpi2.cost[i]}</td>`;
  }
  const total = store.kpi2.cost.reduce(reducer)/store.kpi2.cost.length;
  const totalDays = store.kpi2.cost.length * 30 
  const result = (total * totalDays / store.kpi2.neto )

  let alert = "";
  if (result <= 7 && result>0) {
    alert += `
    <div class="alert alert-success" role="alert">
      Esperado : ${result} %
    </div>`;
  } else if (result<=15 && result > 7) {
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

  const template = `
  <table class="table table-dark table-bordered border-primary" >

  <thead>
  <tr>
  <th scope="col">#</th>
  ${ths}
  <th>Total</th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <th>
  Costo de inventario
  </th>
  ${tds}
  <td>${total}</td>
  </tr>
  </tbody>
  </table>
  ${alert}
  `;
  return template;
}
// third kpi 
document.getElementById('form-3').addEventListener('submit',(e)=>{
  e.preventDefault()
  e.preventDefault();
  const elements = e.currentTarget.elements;
  const sales = Number(elements["sales"].value);
  const cost = Number(elements["cost"].value);
  const unit = Number(elements["unit"].value);
  store.kpi3.sales = (sales);
  store.kpi3.cost = (cost);
  store.kpi3.unit = (unit);

  const res1 = cost/sales 
  const res2 = cost/unit

  const badges = `
    ${getBadge(res1, 15, 40 )}
    ${getBadge(res1, 2000, 3000 )}
  `

  document.getElementById('alert').innerHTML = badges
})

function getBadge(result, expected, accepted) {
  let alert = "";
  if (result < expected) {
    alert += `
    <div class="col-md-6 alert alert-success" role="alert">
      ${result} 
    </div>`;
  } else if (result < accepted) {
    alert += `
    <div class="col-md-6 alert alert-warning" role="alert">
      ${result} 
    </div>`;
  } else {
    alert += `
    <div class="col-md-6 alert alert-danger" role="alert">
      ${result} 
    </div>`;
  }
  return alert
}