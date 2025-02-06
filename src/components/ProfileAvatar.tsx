
import { UserRound } from "lucide-react";

const ProfileAvatar = () => {
  return (
    <div className="relative">
      <div className="w-24 h-24 rounded-lg bg-[#333333] animate-float flex items-center justify-center overflow-hidden border border-[#444444] shadow-lg">
        <UserRound className="w-16 h-16 text-primary" />
      </div>
      <div className="absolute -bottom-1 -right-1 w-24 h-24 bg-primary/20 rounded-lg -z-10" />
    </div>
  );
};

export default ProfileAvatar;
