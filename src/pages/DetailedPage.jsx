import React from "react";
import DeleteModal from "../components/modals/DeleteModal";
import { useParams } from "react-router-dom";
import { itemList } from "../services/Apiex";

export default function DetailedPage() {
  const { id } = useParams();

  const item = itemList.find((item) => item.id === Number(id));

  if (!item) {
    return <div>존재하지 않는 상품입니다.</div>;
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>{item.name}</h1>
      <p>번호: {item.num}</p>
      <p>재질: {item.material}</p>
      <p>{item.content}</p>
    </div>
  );
}
