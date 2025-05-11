import React from "react";
import { useComponents } from "../../contexts/ComponentsContext";

export default function ComponentList({ shipId }) {
  const { components, deleteComponent } = useComponents();
  const list = components.filter((c) => c.shipId === shipId);

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

          .component-list {
            font-family: 'Poppins', sans-serif;
            max-width: 800px;
            margin: 2rem auto;
            padding: 2rem;
            border: 1px solid #eee;
            border-radius: 8px;
            background-color: #fff;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          }

          .component-list h4 {
            font-size: 1.25rem;
            margin-bottom: 1.5rem;
            font-weight: 600;
            color: #333;
          }

          .component-list table {
            width: 100%;
            border-collapse: collapse;
          }

          .component-list th,
          .component-list td {
            text-align: left;
            padding: 0.75rem;
            border-bottom: 1px solid #eee;
            font-size: 0.95rem;
          }

          .component-list th {
            background-color: #f9f9f9;
            font-weight: 500;
            color: #444;
          }

          .component-list button {
            background: none;
            border: none;
            font-size: 1rem;
            color: #e53935;
            cursor: pointer;
          }

          .component-list button:hover {
            color: #c62828;
          }
        `}
      </style>

      <div className="component-list">
        <h4>Components</h4>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Serial</th>
              <th>Installed</th>
              <th>Last Maint.</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {list.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.serialNumber}</td>
                <td>{c.installDate}</td>
                <td>{c.lastMaintenanceDate}</td>
                <td>
                  <button onClick={() => deleteComponent(c.id)}>🗑</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
