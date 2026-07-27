import React from "react";
import mphLogoUrl from "../../assets/mph_logo.png";

interface LogoProps {
  width: string;
}

const MPHLogo = ({ width = "150px" }: LogoProps) => {
    return <img src={mphLogoUrl} style={{ width, marginRight: 5 }} />
}

export default MPHLogo;
