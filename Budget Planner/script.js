const balance = document.getElementById("balance");
const progress = document.getElementById("progress");
const addBtn = document.getElementById("addBtn");
const transactionList = document.getElementById("transactionList");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateUI() {
  let income = 0, expense = 0;

  transactionList.innerHTML = "";
  transactions.forEach((t, i) => {
    const li = document.createElement("li");
    li.classList.add(t.type);
    li.innerHTML = `
      ${t.description} <strong>₹${t.amount}</strong>
      <button onclick="removeTransaction(${i})">❌</button>
    `;
    transactionList.appendChild(li);

    if (t.type === "income") income += t.amount;
    else expense += t.amount;
  });

  const total = income - expense;
  balance.textContent = `₹${total}`;
  const spentPercent = income > 0 ? (expense / income) * 100 : 0;
  progress.style.width = `${Math.min(spentPercent, 100)}%`;

  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function removeTransaction(index) {
  transactions.splice(index, 1);
  updateUI();
}

addBtn.addEventListener("click", () => {
  const desc = document.getElementById("description").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const type = document.getElementById("type").value;

  if (!desc || isNaN(amount) || amount <= 0) return alert("Please enter valid details!");

  transactions.push({ description: desc, amount, type });
  document.getElementById("description").value = "";
  document.getElementById("amount").value = "";
  updateUI();
});

updateUI();
