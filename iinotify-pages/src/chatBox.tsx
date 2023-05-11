import { PrimaryButton, TextField } from "@fluentui/react";

export function ChatBox() {
  return (
    <div>
      <TextField label="Enter your name" />
      <PrimaryButton>Submit</PrimaryButton>
    </div>
  );
}
