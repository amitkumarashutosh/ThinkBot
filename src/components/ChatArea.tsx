import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, User, Bot } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatAreaProps {
  activeChat: string;
}

const dummyMessages: Record<string, Message[]> = {
  'chat-1': [
    {
      id: '1',
      content: 'What are some React best practices for 2024?',
      role: 'user',
      timestamp: new Date('2024-01-15T10:00:00'),
    },
    {
      id: '2',
      content: 'Here are some key React best practices for 2024:\n\n1. **Use Functional Components**: Prefer functional components with hooks over class components.\n\n2. **Embrace React Server Components**: Use RSCs for better performance and SEO.\n\n3. **Optimize with useMemo and useCallback**: Prevent unnecessary re-renders.\n\n4. **Implement proper error boundaries**: Handle errors gracefully.\n\n5. **Use TypeScript**: Add type safety to your React applications.\n\n6. **Follow the single responsibility principle**: Keep components focused and small.\n\n7. **Use proper state management**: Choose between useState, useReducer, Context, or external libraries like Zustand.',
      role: 'assistant',
      timestamp: new Date('2024-01-15T10:00:30'),
    },
    {
      id: '3',
      content: 'Can you explain more about React Server Components?',
      role: 'user',
      timestamp: new Date('2024-01-15T10:02:00'),
    },
    {
      id: '4',
      content: 'React Server Components (RSCs) are a new feature that allows components to render on the server:\n\n**Benefits:**\n- Reduced bundle size\n- Direct access to server-side resources\n- Better SEO and initial load performance\n- Automatic code splitting\n\n**Key Features:**\n- Zero client-side JavaScript for server components\n- Can directly access databases, file systems, etc.\n- Seamlessly compose with client components\n\n**Usage:**\n```jsx\n// Server Component (default)\nexport default function ServerComponent() {\n  const data = await fetch(\'api/data\');\n  return <div>{data.title}</div>;\n}\n\n// Client Component (with "use client")\n\'use client\';\nexport default function ClientComponent() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(count + 1)}>{count}</button>;\n}\n```',
      role: 'assistant',
      timestamp: new Date('2024-01-15T10:02:45'),
    },
  ],
  'new-chat': [],
};

export default function ChatArea({ activeChat }: ChatAreaProps) {
  const [messages, setMessages] = useState<Message[]>(dummyMessages[activeChat] || []);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setMessages(dummyMessages[activeChat] || []);
  }, [activeChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'I\'m a demo AI assistant. In a real application, this would be connected to an actual AI service like OpenAI\'s GPT-4. Your message was: "' + userMessage.content + '"',
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 transition-colors duration-200">
      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <Bot className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Start a new conversation
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Ask me anything and I'll do my best to help!
                </p>
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`flex max-w-[80%] ${
                    message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      message.role === 'user'
                        ? 'bg-green-500 dark:bg-green-600 ml-3'
                        : 'bg-gray-700 dark:bg-gray-600 mr-3'
                    }`}
                  >
                    {message.role === 'user' ? (
                      <User className="h-4 w-4 text-white" />
                    ) : (
                      <Bot className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <div
                    className={`rounded-lg px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-green-500 dark:bg-green-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}
                  >
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {message.content}
                    </div>
                    <div
                      className={`text-xs mt-2 ${
                        message.role === 'user'
                          ? 'text-green-100 dark:text-green-200'
                          : 'text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex flex-row">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-700 dark:bg-gray-600 mr-3 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800 transition-colors duration-200">
        <div className="max-w-3xl mx-auto">
          <div className="relative flex items-end space-x-2">
            <div className="flex-1 relative">
              <Textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here..."
                className="min-h-[44px] max-h-32 resize-none pr-12 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                disabled={isLoading}
              />
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              size="sm"
              className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white px-3 py-2 transition-colors"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
            Press Enter to send, Shift + Enter for new line
          </div>
        </div>
      </div>
    </div>
  );
}