"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import { Text } from "@/components/providers/preferences-provider";

export function ChatRoom() {
    const [messages, setMessages] = useState<{ user: string, text: string }[]>([]);
    const [input, setInput] = useState("");

    const sendMessage = () => {
        if (!input.trim()) return;
        setMessages([...messages, { user: "Você", text: input }]);
        setInput("");
    };

    return (
        <div className="flex flex-col h-[400px] border rounded-lg bg-white dark:bg-slate-900 shadow-sm">
            <div className="p-3 border-b bg-muted/20 font-bold flex justify-between">
                <span>Chat da Sala #123</span>
                <span className="text-green-500 text-xs flex items-center gap-1">● 2 Online</span>
            </div>

            <ScrollArea className="flex-1 p-4">
                {messages.length === 0 && (
                    <p className="text-center text-muted-foreground text-sm italic mt-10">
                        <Text pt="A sala está quieta..." en="Room is quiet..." es="La sala está tranquila..." />
                    </p>
                )}
                {messages.map((m, i) => (
                    <div key={i} className={`mb-2 flex ${m.user === 'Você' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`px-3 py-2 rounded-lg text-sm max-w-[80%] ${m.user === 'Você'
                            ? 'bg-rose-500 text-white rounded-br-none'
                            : 'bg-slate-100 dark:bg-slate-800 rounded-bl-none'
                            }`}>
                            <span className="text-xs opacity-70 block mb-1">{m.user}</span>
                            {m.text}
                        </div>
                    </div>
                ))}
            </ScrollArea>

            <div className="p-3 border-t flex gap-2">
                <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Digite algo picante..."
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                />
                <Button size="icon" onClick={sendMessage} className="bg-rose-600">
                    <Send className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
}