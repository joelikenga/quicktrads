import React from "react";
import Body from "./component/body";

const About = () => {
  return (
    <div>
      <Body />
    </div>
  );
};

// Add this line to mark it as a Next.js page
export const metadata = {
  title: 'About - Quicktrads',
  description: 'About Quicktrads',
};

export default About;
