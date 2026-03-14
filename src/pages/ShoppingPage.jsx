import React, { useState } from "react";
import DeleteModal from "../components/modals/DeleteModal";

export default function ShoppingPage() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setIsOpen(true)}>삭제하기</button>
      <button onClick={() => setIsOpen(true)}>주문하기</button>
      <DeleteModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
