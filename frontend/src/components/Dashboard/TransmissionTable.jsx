import React from "react";

const TransmissionTable = () => (
  <div>
    <h4>New Transmissions</h4>
    {/* Table or data will go here */}
    <table border="1" width="100%">
      <thead>
        <tr>
          <th>Name</th>
          <th>Alerts</th>
          <th>Session Date</th>
          <th>Device Type</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {/* Data rows go here */}
        <tr>
          <td>Sample Patient</td>
          <td>Urgent</td>
          <td>2025-08-08</td>
          <td>ICD</td>
          <td>
            <button>Review</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default TransmissionTable;