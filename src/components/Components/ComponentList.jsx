import React from "react";
import { useComponents } from "../../contexts/ComponentsContext";

export default function ComponentList({ shipId }) {
  const { components, deleteComponent } = useComponents();
  const list = components.filter((c) => c.shipId === shipId);

  return (
    <div className="card">
      <h4>Components</h4>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Serial</th>
            <th>Installed</th>
            <th>Last Maint.</th>
            <th />
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
  );
}