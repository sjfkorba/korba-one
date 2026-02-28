import { redirect } from "next/navigation";

export default function ChatsPage() {
  redirect("/dashboard");
  return null;
}