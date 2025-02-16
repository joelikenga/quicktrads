<<<<<<< HEAD
import React from 'react'
import { Body } from './component/body'

function Page() {
    return (
        <>
            <Body />
        </>
    )
}

export default Page
=======
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
>>>>>>> a2fca0cf3d1ff11f4a27ff7094c009228636037e
