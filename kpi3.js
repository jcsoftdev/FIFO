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
// third kpi
document.getElementById("form-3").addEventListener("submit", (e) => {
  e.preventDefault();
  e.preventDefault();
  const elements = e.currentTarget.elements;
  const sales = Number(elements["sales"].value);
  const cost = Number(elements["cost"].value);
  const unit = Number(elements["unit"].value);
  store.kpi3.sales = sales;
  store.kpi3.cost = cost;
  store.kpi3.unit = unit;

  const res1 = (cost / sales) * 100;
  const res2 = cost / unit;

  const badges = `
    ${getBadge(res1, 15, 40, '%')}
    ${getBadge(res2, 2000, 3000,'S/',true)}
  `;

  document.getElementById("alert").innerHTML = badges;
});

function getBadge(result, expected, accepted, prefix, left=false) {
  let alert = "";
  if (result < expected) {
    alert += `
    <div class="col-md-6 alert alert-success" role="alert">
      ${left?prefix:''} ${result} ${!left?prefix:''}
    </div>`;
  } else if (result < accepted) {
    alert += `
    <div class="col-md-6 alert alert-warning" role="alert">
      ${left?prefix:''} ${result} ${!left?prefix:''}
    </div>`;
  } else {
    alert += `
    <div class="col-md-6 alert alert-danger" role="alert">
      ${left?prefix:''} ${result} ${!left?prefix:''}
    </div>`;
  }
  return alert;
}
