import Chat from "@/components/common/chat";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Messages",
};

export default function Page() {
  return <Chat />;
}
