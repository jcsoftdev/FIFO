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

// second kpi
const reducer = (accumulator, currentValue) => accumulator + currentValue;
document.getElementById("form-2").addEventListener("submit", (e) => {
  e.preventDefault();
  const elements = e.currentTarget.elements;
  const month = elements["month"].value;
  const cost = Number(elements["cost"].value);
  const neto = Number(elements["neto"].value);
  store.kpi2.month.push(month);
  store.kpi2.cost.push(cost);
  store.kpi2.neto = neto;
  elements['month'].value=''
  elements['cost'].value=''
  elements['neto'].value=''
  const $table2 = document.getElementById("table2");
  $table2.innerHTML = getTable2(store);
});
function getTable2(store = store) {
  let ths = ``;
  let tds = "";
  for (let i = 0; i < store.kpi2.month.length; i++) {
    ths += `<th>${store.kpi2.month[i]}</th>`;
    tds += `<td>${store.kpi2.cost[i]}</td>`;
  }
  const total = store.kpi2.cost.reduce(reducer) / store.kpi2.cost.length;
  const totalDays = store.kpi2.cost.length * 30;
  const result = (total * totalDays) / store.kpi2.neto;

  let alert = getBadge(result, 7, 15, 'Días')

  const template = `
  <table class="fl-table mb-3" >

  <thead>
  <tr>
  <th scope="col">#</th>
  ${ths}
  <th>Costo promedio del inventario</th>
  </tr>
  </thead>
  <tbody class='fl-table'>
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
function getBadge(result, expected, accepted, prefix, left=false) {
  let alert = "";
  if (result < expected) {
    alert += `
    <div class="col-md-12 alert alert-success" role="alert">
      ${left?prefix:''} ${result} ${!left?prefix:''}
    </div>`;
  } else if (result < accepted) {
    alert += `
    <div class="col-md-12 alert alert-warning" role="alert">
      ${left?prefix:''} ${result} ${!left?prefix:''}
    </div>`;
  } else {
    alert += `
    <div class="col-md-12 alert alert-danger" role="alert">
      ${left?prefix:''} ${result} ${!left?prefix:''}
    </div>`;
  }
  return alert;
}
