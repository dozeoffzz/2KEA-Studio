import React, { useState } from "react";
import SignUpModal from "../components/modals/SignUpModal";

export default function SignUpPage() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Sign Up</button>
      <SignUpModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
