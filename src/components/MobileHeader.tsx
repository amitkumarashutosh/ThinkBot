import { Button } from "@/components/ui/button";
import { MessageCircle, Menu, LogOut, Settings, Moon, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/contexts/ThemeContext";
import { useSignOut } from "@nhost/react";

interface MobileHeaderProps {
  onMenuClick: () => void;
  onSignOut: () => void;
}

export default function MobileHeader({
  onMenuClick,
  onSignOut,
}: MobileHeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="md:hidden fixed top-0 left-0 right-0 z-30 bg-gray-900 dark:bg-gray-900 border-b border-gray-700 dark:border-gray-700 px-4 py-3 transition-colors duration-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="text-white hover:bg-gray-800 dark:hover:bg-gray-800 transition-colors"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center space-x-2">
            <MessageCircle className="h-6 w-6 text-green-500" />
            <span className="text-lg font-semibold text-white">ThinkBot</span>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-gray-800 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="h-6 w-6 bg-green-500 rounded-full flex items-center justify-center text-xs font-medium text-white">
                U
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
          >
            <DropdownMenuItem
              onClick={toggleTheme}
              className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {theme === "light" ? (
                <Moon className="h-4 w-4 mr-2" />
              ) : (
                <Sun className="h-4 w-4 mr-2" />
              )}
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </DropdownMenuItem>
            <DropdownMenuItem className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-600" />
            <DropdownMenuItem onClick={() => useSignOut()}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
