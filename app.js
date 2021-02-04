const store = {
  current: "",
  days: {
    // "2021-01-01": {
    //   purchases: [],
    //   sales: [],
    //   stocks: [{ price: 500, quantity: 512 }],
    // },
    // "2021-01-05": {
    //   purchases: [],
    //   sales: [{ quantity: 200, price: 500 }],
    //   stocks: [{ quantity: 312, price: 500 }],
    // },
    // "2021-02-21": {
    //   purchases: [{ price: 520, quantity: 100 }],
    //   sales: [],
    //   stocks: [
    //     { quantity: 312, price: 500 },
    //     { price: 520, quantity: 100 },
    //   ],
    // },
  },
};
const listItems = document.getElementById("list-values");
// switcher  value
listItems.addEventListener("click", (e) => {
  if (e.target.nodeName === "LI") {
    store.current = e.target.getAttribute("value");
    const elements = [...e.currentTarget.childNodes].filter(
      (value, indx) => indx % 2 !== 0
    );
    elements.forEach((e) => {
      if (store.current === e.getAttribute("value")) {
        return (e.className = "list-group-item active");
      }
      e.className = "list-group-item ";
    });
  }
});

// btn add

const $formAdd = document.querySelector("#form-add");

$formAdd.addEventListener("submit", (e) => {
  e.preventDefault();
  const elements = e.currentTarget.elements;
  // console.log(elements);
  const quantity = Number(elements["quantity"].value);
  const price = Number(elements["price"].value);
  const date = elements["date"].value;
  if (!store.days[date]) {
    store.days[date] = {
      purchases: [],
      sales: [],
      stocks: [],
    };
  }
  switch (store["current"]) {
    case "existencia":
      store.days[date].stocks.push({ price, quantity });
      break;
    case "compra":
      store.days[date].purchases.push({ price, quantity });
      const purchase = getSotckWithPurchase(store, date);
      store.days[date].stocks = purchase;
      break;
    case "venta":
      const { sales, nextStock } = getSotckWithSales(store, date, quantity);
      store.days[date].stocks = nextStock;
      store.days[date].sales = sales;
      // store.days[date].sales.push({ price, quantity });
      break;
    default:
      break;
  }
  elements["quantity"].value = "";
  elements["price"].value = "";
  elements["date"].value = "";
  // getTotal(store);
  document.getElementsByClassName("table-responsive")[0].className =
    "table-responsive mt-3 ";
  renderTable(store);
});

const getDays = (store) => Array.from(Object.keys(store.days));

const getSotckWithPurchase = (store, day) => {
  const days = getDays(store);
  console.log(days);
  const prevStock = [...store.days[days[days.length - 2]].stocks];
  const nextStock = [...prevStock, ...store.days[day].purchases];
  console.log(nextStock);
  return nextStock;
};

const getSotckWithSales = (store, day, salesQuantity) => {
  const days = getDays(store);
  const prevStock = [...store.days[days[days.length - 2]].stocks];

  const sum = prevStock
    .map((e) => e.quantity)
    .reduce((accumulator, currentValue) => accumulator + currentValue);
  if (salesQuantity > sum) {
    throw "Not enough stock";
  }
  let remaining = salesQuantity;
  const nextStock = [];
  const sales = [];
  for (let i = 0; i < prevStock.length; i++) {
    if (remaining <= prevStock[i].quantity) {
      quantity = prevStock[i].quantity - remaining;
      remaining > 0 &&
        sales.push({ quantity: remaining, price: prevStock[i].price });
      remaining = 0;
      nextStock.push({ quantity, price: prevStock[i].price });
    } else {
      remaining = remaining - prevStock[i].quantity;
      sales.push({
        quantity: prevStock[i].quantity,
        price: prevStock[i].price,
      });
      // nextStock.push({quantity: 0100, price: prevStock[0].price})
    }
  }
  return { sales, nextStock };
};

// tables

function renderTable(store, con) {
  const $tableContainer = document.getElementById("table-container");
  $tableContainer.innerHTML = "";
  const days = getDays(store);
  const trows = [];
  days.forEach((day) => {
    const length = Math.max(
      store.days[day].purchases.length,
      store.days[day].sales.length,
      store.days[day].stocks.length
    );
    const trDay = [];
    for (let indx = 0; indx < length; indx++) {
      const $tr = document.createElement("tr");
      if (indx === 0) {
        const $th = document.createElement("th");
        $th.textContent = day;
        $th.setAttribute("rowspan", length);
        $th.setAttribute("scope", "row");
        $tr.append($th);
      }
      // adding purchases
      for (let i = 0; i < 3; i++) {
        const $td = document.createElement("td");
        switch (i) {
          case 0:
            $td.textContent = store.days[day].purchases[indx]?.quantity;
            break;
          case 1:
            $td.textContent = store.days[day].purchases[indx]?.price;
            break;
          case 2:
            $td.textContent =
              store.days[day].purchases[indx]?.quantity *
                store.days[day].purchases[indx]?.price || "";
            break;
          default:
            break;
        }
        $tr.append($td);
      }
      // adding sales
      for (let i = 0; i < 3; i++) {
        const $td = document.createElement("td");
        switch (i) {
          case 0:
            $td.textContent = store.days[day].sales[indx]?.quantity;
            break;
          case 1:
            $td.textContent = store.days[day].sales[indx]?.price;
            break;
          case 2:
            $td.textContent =
              store.days[day].sales[indx]?.quantity *
                store.days[day].sales[indx]?.price || "";
            break;
          default:
            break;
        }
        $tr.append($td);
      }
      // adding stock
      for (let i = 0; i < 3; i++) {
        const $td = document.createElement("td");
        switch (i) {
          case 0:
            $td.textContent = store.days[day].stocks[indx]?.quantity;
            break;
          case 1:
            $td.textContent = store.days[day].stocks[indx]?.price;
            break;
          case 2:
            $td.textContent =
              store.days[day].stocks[indx]?.quantity *
                store.days[day].stocks[indx]?.price || "";
            break;
          default:
            break;
        }
        // $td.textContent = store.days[day].stocks[i];
        $tr.append($td);
      }
      console.log($tr);
      trDay.push($tr);
    }
    trows.push(...trDay);
    console.log(trDay);
    // console.log($tr)
  });
  $tableContainer.append(...trows);
}
renderTable(store)