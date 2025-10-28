const issueForm = document.getElementById("issueForm");
const issuedTable = document.querySelector("#issuedTable tbody");
const returnedTable = document.querySelector("#returnedTable tbody");
const lateTable = document.querySelector("#lateTable tbody");

const finePerDay = 10; // change fine rate here

issueForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const studentName = document.getElementById("studentName").value;
  const bookTitle = document.getElementById("bookTitle").value;
  const issueDate = document.getElementById("issueDate").value;
  const returnDate = document.getElementById("returnDate").value;

  const row = issuedTable.insertRow();
  row.innerHTML = `
    <td>${studentName}</td>
    <td>${bookTitle}</td>
    <td>${issueDate}</td>
    <td>${returnDate}</td>
    <td><button class="return-btn">Return</button></td>
  `;

  row.querySelector(".return-btn").addEventListener("click", () => {
    const returnedOn = new Date().toISOString().split("T")[0];
    addReturnedBook(studentName, bookTitle, returnDate, returnedOn);
    issuedTable.deleteRow(row.rowIndex - 1);
  });

  issueForm.reset();
});

function addReturnedBook(studentName, bookTitle, dueDate, returnedOn) {
  const due = new Date(dueDate);
  const returned = new Date(returnedOn);
  const diffDays = Math.ceil((returned - due) / (1000 * 60 * 60 * 24));

  const row = returnedTable.insertRow();
  row.innerHTML = `
    <td>${studentName}</td>
    <td>${bookTitle}</td>
    <td>${returnedOn}</td>
  `;

  if (diffDays > 0) {
    const fine = diffDays * finePerDay;
    const lateRow = lateTable.insertRow();
    lateRow.innerHTML = `
      <td>${studentName}</td>
      <td>${bookTitle}</td>
      <td>${diffDays}</td>
      <td>${fine}</td>
    `;
  }
}
