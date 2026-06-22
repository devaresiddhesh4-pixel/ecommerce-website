const form = document.getElementById("transactionForm");
const transactionList = document.getElementById("transactionList");
const balance = document.getElementById("balance");

let transactions =
JSON.parse(localStorage.getItem("transactions")) || [];

function updateUI(){

    transactionList.innerHTML = "";

    let total = 0;

    transactions.forEach((transaction,index)=>{

        total += transaction.type === "income"
            ? transaction.amount
            : -transaction.amount;

        const li = document.createElement("li");

        li.classList.add(transaction.type);

        li.innerHTML = `
            <span>
                ${transaction.description}
                - ₹${transaction.amount}
            </span>

            <button class="delete-btn"
            onclick="deleteTransaction(${index})">
                Delete
            </button>
        `;

        transactionList.appendChild(li);
    });

    balance.textContent = `₹${total}`;

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );
}

form.addEventListener("submit",function(e){

    e.preventDefault();

    const description =
    document.getElementById("description").value;

    const amount =
    Number(document.getElementById("amount").value);

    const type =
    document.getElementById("type").value;

    transactions.push({
        description,
        amount,
        type
    });

    form.reset();

    updateUI();
});

function deleteTransaction(index){

    transactions.splice(index,1);

    updateUI();
}

updateUI();