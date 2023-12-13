import "./bidstable.css";

// Example bid data (replace this with your actual data)
const bidData = [
  { name: "Bidder 1", time: "2023-01-01T12:00:00", amount: 100 },
  { name: "Bidder 2", time: "2023-01-01T12:15:00", amount: 150 },
  { name: "Bidder 3", time: "2023-01-01T12:30:00", amount: 120 },
  // Add more bid entries as needed
];

// Function to populate the table with bid data
const populateTable = () => {
  const tableBody = document.querySelector("#bidTable tbody");

  bidData.forEach((bid) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${bid.name}</td>
        <td>${new Date(bid.time).toLocaleString()}</td>
        <td>${bid.amount}</td>
      `;
    tableBody.appendChild(row);
  });

  return (
    <>
      <div className="">
        <table id="bidTable">
          <thead>
            <tr>
              <th>Bidder Name</th>
              <th>Time of Bid</th>
              <th>Bid Amount</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </>
  );
};

// Call the function to populate the table
populateTable();
