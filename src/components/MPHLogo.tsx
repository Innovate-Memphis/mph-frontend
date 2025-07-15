import mphLogoUrl from '../assets/mph_logo.png';

interface LogoProps {
  width: string;
}

export const MPHLogo = ({ width = "150px" }: LogoProps) => {
    return <img src={mphLogoUrl} style={{ width }} />
}
