"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Share2, Check, Copy, Linkedin, Twitter, Mail } from "lucide-react";

interface ShareButtonProps {
    title: string;
    text?: string;
}

export default function ShareButton({ title, text }: ShareButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [url, setUrl] = useState("");

    useEffect(() => {
        setUrl(window.location.href);
    }, []);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (error) {
            console.error("Failed to copy:", error);
        }
    };

    const shareLinks = [
        {
            name: "LinkedIn",
            icon: Linkedin,
            url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
            color: "hover:bg-[#0077b5] hover:text-white border-transparent",
            base: "bg-blue-50 text-[#0077b5]",
        },
        {
            name: "Twitter",
            icon: Twitter,
            url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
            color: "hover:bg-[#1DA1F2] hover:text-white border-transparent",
            base: "bg-sky-50 text-[#1DA1F2]",
        },
        {
            name: "WhatsApp",
            icon: ({ className }: { className?: string }) => (
                <svg
                    className={className}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
            ),
            url: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
            color: "hover:bg-[#25D366] hover:text-white border-transparent",
            base: "bg-green-50 text-[#25D366]",
        },
        {
            name: "Email",
            icon: Mail,
            url: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
            color: "hover:bg-gray-900 hover:text-white border-transparent",
            base: "bg-gray-100 text-gray-700",
        },
    ];

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full gap-2 border-gray-200 text-gray-600 hover:text-black hover:border-gray-300 transition-all">
                    <Share2 size={16} /> Share Job
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-white text-black">
                <DialogHeader>
                    <DialogTitle className="text-black">Share this Job</DialogTitle>
                    <DialogDescription className="text-gray-500">
                        Share this opportunity with your network or copy the link.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-4 gap-4 py-4">
                    {shareLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-gray-200 transition-all hover:scale-105 ${link.base} ${link.color}`}
                        >
                            <link.icon className="w-6 h-6 current-color" />
                            <span className="text-xs font-medium">{link.name}</span>
                        </a>
                    ))}
                </div>

                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                            Link
                        </Label>
                        <Input
                            id="link"
                            defaultValue={url}
                            readOnly
                            className="h-10 bg-gray-50 border-gray-200 text-gray-500"
                        />
                    </div>
                    <Button type="submit" size="sm" className="px-3 bg-black text-white hover:bg-gray-800" onClick={handleCopy}>
                        {isCopied ? (
                            <Check className="h-4 w-4" />
                        ) : (
                            <Copy className="h-4 w-4" />
                        )}
                        <span className="sr-only">Copy</span>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
