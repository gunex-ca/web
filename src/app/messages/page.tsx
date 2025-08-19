"use client";

import {
  ExternalLinkIcon,
  Flag,
  List,
  MoreVertical,
  Shield,
  User,
} from "lucide-react";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Textarea } from "~/components/ui/textarea";

interface MessageBubbleProps {
  message: string;
  timestamp: string;
  isSent: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  timestamp,
  isSent,
}) => {
  return (
    <div className={`flex ${isSent ? "justify-end" : "justify-start"}`}>
      <div
        className={`space-y-2 ${isSent ? "max-w-[400px]" : "max-w-[500px]"}`}
      >
        <div className="rounded-lg bg-primary/10 p-4">{message}</div>
        <div
          className={`text-muted-foreground text-xs ${
            isSent ? "w-full text-right" : ""
          }`}
        >
          {timestamp}
        </div>
      </div>
    </div>
  );
};

export default function MessagesPage() {
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [newMessage, setNewMessage] = useState("");

  // Mock messages data - in real app this would come from state/props
  const [messages, setMessages] = useState([
    {
      id: 1,
      message:
        "I know how important this file is to you. You can trust me ;) I know how important this file is to you. You can trust me ;) know how important this file is to you. You can trust me ;)",
      timestamp: "10:00 AM",
      isSent: false,
    },
    {
      id: 2,
      message: "My Message",
      timestamp: "10:01 AM",
      isSent: true,
    },
    {
      id: 3,
      message: "Are you sure you can deliver it by tomorrow?",
      timestamp: "10:02 AM",
      isSent: false,
    },
    {
      id: 4,
      message: "Yes, I'll send it over as soon as possible.",
      timestamp: "10:03 AM",
      isSent: true,
    },
    {
      id: 5,
      message: "Thank you! Let me know if you need anything else.",
      timestamp: "10:04 AM",
      isSent: false,
    },
    {
      id: 6,
      message: "Will do. Have a great day!",
      timestamp: "10:05 AM",
      isSent: true,
    },
  ]);

  // Ref callback to scroll to bottom immediately when element is created/updated
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const setMessagesEndRef = (element: HTMLDivElement | null) => {
    messagesEndRef.current = element;
    if (element) element.scrollIntoView({ behavior: "instant" });
  };

  // Additional effect to handle scroll when messages change
  // biome-ignore lint/correctness/useExhaustiveDependencies: Need to trigger on messages.length change
  useLayoutEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "instant" });
    }
  }, [messages.length]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newMsg = {
      id: messages.length + 1,
      message: newMessage,
      timestamp: currentTime,
      isSent: true,
    };

    setMessages((prev) => [...prev, newMsg]);
    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="container mx-auto max-w-7xl space-y-8 px-4 py-14">
      <div className="flex gap-10">
        <div className="w-[300px] flex-shrink-0">
          <Tabs defaultValue="buying">
            <TabsList>
              <TabsTrigger value="buying">Buying</TabsTrigger>
              <TabsTrigger value="selling">Selling</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="mt-4 h-[calc(100vh-280px)] rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                item
              </div>
            </div>
          </div>
        </div>
        <div className="flex h-[calc(100vh-230px)] flex-grow flex-col">
          <div className="flex items-center justify-between px-4 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="message"
                className="h-13 w-16 rounded-lg object-cover"
              />
              <div>
                <div className="font-medium text-lg">Remgintong 700</div>
                <div className="text-muted-foreground text-sm">
                  usernameofperson
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <ExternalLinkIcon className="mr-2 h-4 w-4" />
                Link to listing
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center gap-2">
                      <User className="mr-2 h-4 w-4" />
                      View profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <List className="mr-2 h-4 w-4" />
                    View other listings
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Flag className="mr-2 h-4 w-4" />
                    Report user
                  </DropdownMenuItem>
                  <DropdownMenuItem variant="destructive">
                    <Shield className="mr-2 h-4 w-4" />
                    Block user
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div
            ref={messagesContainerRef}
            className="flex-1 space-y-6 overflow-y-auto p-4"
            style={{ scrollBehavior: "auto" }}
          >
            {messages.map((msg) => (
              <MessageBubble
                key={msg.id}
                message={msg.message}
                timestamp={msg.timestamp}
                isSent={msg.isSent}
              />
            ))}
            {/* Invisible element to scroll to - using ref callback for immediate positioning */}
            <div ref={setMessagesEndRef} />
          </div>

          <div className="bg-background backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="relative">
              <Textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="resize-none pr-16"
                placeholder="Type your message (Enter to send, Shift+Enter for new line)"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="-translate-y-1/2 absolute top-1/2 right-2 h-8 px-3"
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
