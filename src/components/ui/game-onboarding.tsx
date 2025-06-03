
"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";

interface GameOnboardingProps {
  children: React.ReactNode;
}

export function GameOnboarding({ children }: GameOnboardingProps) {
  const [step, setStep] = useState(1);

  const stepContent = [
    {
      title: "Welcome to Engine Arcade",
      description:
        "Create games with just a prompt. No coding required - turn your ideas into playable experiences instantly.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=200&fit=crop"
    },
    {
      title: "Describe Your Game",
      description:
        "Simply type what kind of game you want to create. Be as creative as you like - from RPG adventures to puzzle games.",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=200&fit=crop"
    },
    {
      title: "AI Does the Magic",
      description: "Our AI transforms your description into a fully functional game that you can play immediately.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=200&fit=crop"
    },
    {
      title: "Play & Share",
      description:
        "Your game is ready! Play it instantly, share with friends, or iterate on your design.",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=200&fit=crop"
    },
  ];

  const totalSteps = stepContent.length;

  const handleContinue = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  return (
    <Dialog
      onOpenChange={(open) => {
        if (open) setStep(1);
      }}
    >
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="gap-0 p-0 bg-arcade-terminal border-gray-700 [&>button:last-child]:text-white">
        <div className="p-2">
          <img
            className="w-full rounded-lg"
            src={stepContent[step - 1].image}
            width={382}
            height={216}
            alt="game creation step"
          />
        </div>
        <div className="space-y-6 px-6 pb-6 pt-3">
          <DialogHeader>
            <DialogTitle className="text-white">{stepContent[step - 1].title}</DialogTitle>
            <DialogDescription className="text-gray-300">{stepContent[step - 1].description}</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex justify-center space-x-1.5 max-sm:order-1">
              {[...Array(totalSteps)].map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    index + 1 === step ? "bg-emerald-400" : "bg-gray-600",
                  )}
                />
              ))}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-700">
                  Skip
                </Button>
              </DialogClose>
              {step < totalSteps ? (
                <Button 
                  className="group bg-emerald-400 hover:bg-emerald-300 text-arcade-dark" 
                  type="button" 
                  onClick={handleContinue}
                >
                  Next
                  <ArrowRight
                    className="-me-1 ms-2 opacity-60 transition-transform group-hover:translate-x-0.5"
                    size={16}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </Button>
              ) : (
                <DialogClose asChild>
                  <Button type="button" className="bg-emerald-400 hover:bg-emerald-300 text-arcade-dark">
                    <Sparkles size={16} className="mr-2" />
                    Start Creating
                  </Button>
                </DialogClose>
              )}
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
