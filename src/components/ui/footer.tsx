import { cn } from "@/lib/utils";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={cn(
      "border-t border-gray-800 py-6 text-center text-sm text-gray-500",
      "bg-gray-950/50 backdrop-blur-sm"
    )}>
      <div className="container mx-auto px-4">
        <p>© {currentYear} Prompt2Game. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
