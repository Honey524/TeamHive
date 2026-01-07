import { AudioWaveform } from "lucide-react";
import { Link } from "react-router-dom";

const Logo = (props: { url?: string; className?: string }) => {
  const { url = "/", className = "" } = props;
  return (
    <Link to={url} className={`flex items-center justify-center sm:justify-start ${className}`}>
      <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
        <AudioWaveform className="size-4" />
      </div>
    </Link>
  );
};

export default Logo;
