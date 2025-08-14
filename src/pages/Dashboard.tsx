import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import ChatArea from "@/components/ChatArea";
import MobileHeader from "@/components/MobileHeader";
import { useSignOut } from "@nhost/react";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeChat, setActiveChat] = useState("chat-1");
  const { signOut } = useSignOut();

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Mobile Header */}
      <MobileHeader
        onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
        onSignOut={signOut}
      />

      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeChat={activeChat}
        onChatSelect={setActiveChat}
        onSignOut={signOut}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col pt-14 md:pt-0">
        <ChatArea activeChat={activeChat} />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
