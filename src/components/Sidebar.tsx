import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MessageCircle,
  Plus,
  MessageSquare,
  Settings,
  LogOut,
  Edit3,
  Trash2,
  Moon,
  Sun,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeChat: string;
  onChatSelect: (chatId: string) => void;
  onSignOut: () => void;
}

const dummyChats = [
  {
    id: "chat-1",
    title: "React Best Practices",
    timestamp: "2 hours ago",
  },
  {
    id: "chat-2",
    title: "JavaScript Async/Await",
    timestamp: "1 day ago",
  },
  {
    id: "chat-3",
    title: "CSS Grid vs Flexbox",
    timestamp: "3 days ago",
  },
  {
    id: "chat-4",
    title: "Node.js Performance Tips",
    timestamp: "1 week ago",
  },
  {
    id: "chat-5",
    title: "Database Design Patterns",
    timestamp: "2 weeks ago",
  },
  {
    id: "chat-6",
    title: "TypeScript Interfaces",
    timestamp: "1 month ago",
  },
];

export default function Sidebar({
  isOpen,
  onClose,
  activeChat,
  onChatSelect,
  onSignOut,
}: SidebarProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <div
        className={cn(
          "fixed md:relative inset-y-0 left-0 z-50 w-64 bg-gray-900 dark:bg-gray-900 transform transition-all duration-300 ease-in-out md:translate-x-0 flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <MessageCircle className="h-6 w-6 text-green-500" />
            <span className="text-lg font-semibold text-white">ThinkBot</span>
          </div>
        </div>

        {/* New Chat Button */}
        <div className="p-4">
          <Button
            className="w-full bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 transition-colors"
            onClick={() => onChatSelect("new-chat")}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Chat
          </Button>
        </div>

        {/* Chat History */}
        <ScrollArea className="flex-1 px-4">
          <div className="space-y-1">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Recent Chats
            </h3>
            {dummyChats.map((chat) => (
              <div
                key={chat.id}
                className={cn(
                  "group flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors",
                  activeChat === chat.id
                    ? "bg-gray-800 dark:bg-gray-800 text-white"
                    : "text-gray-300 hover:bg-gray-800 dark:hover:bg-gray-800 hover:text-white"
                )}
                onClick={() => {
                  onChatSelect(chat.id);
                  onClose();
                }}
              >
                <div className="flex items-center space-x-3 min-w-0 flex-1">
                  <MessageSquare className="h-4 w-4 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{chat.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 truncate">
                      {chat.timestamp}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0 text-gray-400 hover:text-white transition-colors"
                  >
                    <Edit3 className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0 text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700 dark:border-gray-700">
          <div className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800 dark:hover:bg-gray-800 transition-colors"
              onClick={toggleTheme}
            >
              {theme === "light" ? (
                <Moon className="h-4 w-4 mr-2" />
              ) : (
                <Sun className="h-4 w-4 mr-2" />
              )}
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800 dark:hover:bg-gray-800 transition-colors"
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800 dark:hover:bg-gray-800 transition-colors"
              onClick={onSignOut}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
