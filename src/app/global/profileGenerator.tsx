import { Lora } from 'next/font/google';
import React from 'react';


const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

interface ProfileStyle {
  letter: string;
  style: {
    backgroundColor: string;
    color: string;
    fontSize: string;
    fontWeight: string;
    width: string;
    height: string;
    display: string;
    alignItems: string;
    justifyContent: string;
    borderRadius: string;
    textTransform: string;
  };
}

interface ProfileElementProps {
  name: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const sizeMap = {
  small: {
    container: 'w-8 h-8',
    font: 'text-sm'
  },
  medium: {
    container: 'w-10 h-10',
    font: 'text-base'
  },
  large: {
    container: 'w-16 h-16',
    font: 'text-lg'
  }
};

export const generateProfilePic = (name: string = "User"): ProfileStyle => {
  const colorSchemes = [
    { range: /^[A-F]/i, bg: "#FF5733", text: "#FFFFFF" }, // Red
    { range: /^[G-L]/i, bg: "#33FF57", text: "#000000" }, // Green
    { range: /^[M-R]/i, bg: "#3357FF", text: "#FFFFFF" }, // Blue
    { range: /^[S-Z]/i, bg: "#F4D03F", text: "#000000" }, // Yellow
  ];

  const defaultScheme = { bg: "#CCCCCC", text: "#000000" }; // Default gray

  // Get first letter and color scheme
  const firstLetter = name.trim().charAt(0).toUpperCase();
  const scheme = colorSchemes.find(({ range }) => range.test(firstLetter)) || defaultScheme;

  return {
    letter: firstLetter,
    style: {
      backgroundColor: scheme.bg,
      color: scheme.text,
      fontSize: "1rem",
      fontWeight: "600",
      width: "20px",
      height: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "50%",
      textTransform: "uppercase",
    },
  };
};

export const ProfileAvatar: React.FC<ProfileElementProps> = ({ 
  name, 
  size = 'medium',
  className = ''
}) => {
  const profile = generateProfilePic(name);
  const sizeClass = sizeMap[size];

  return (
    <div
      className={`flex items-center justify-center rounded-full capitalize  ${sizeClass.container} ${className}`}
      style={{
        backgroundColor: profile.style.backgroundColor,
        color: profile.style.color
      }}
    >
      <span className={`${sizeClass.font} font-semibold w-[1rem] h-[1rem] flex justify-center items-center capitalize ${lora.className}`}>
      <div className="h-fit w-fit">{profile.letter}</div>

      </span>
    </div>
  );
};

export const ProfileInitials: React.FC<ProfileElementProps> = ({ 
  name, 
  size = 'medium',
  className = ''
}) => {
  const profile = generateProfilePic(name);
  const sizeClass = sizeMap[size];

  return (
    <span 
      className={`inline-flex items-center justify-center ${sizeClass.font} capitalize  font-semibold ${className}`}
      style={{ color: profile.style.backgroundColor }}
    >
      {profile.letter}
    </span>
  );
};