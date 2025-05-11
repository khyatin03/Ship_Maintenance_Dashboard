import React from "react";
import ShipDetail from "../components/Ships/ShipDetail";
import ComponentList from "../components/Components/ComponentList";
import ComponentForm from "../components/Components/ComponentForm";
import { useParams } from "react-router-dom";

export default function ShipDetailPage() {
  const { id } = useParams();
  return (
    <main>
      <ShipDetail />
      <ComponentList shipId={id} />
      <ComponentForm shipId={id} />
    </main>
  );
}
