import LogoImage from '../../assets/paw-connect-logo.png';

export const Logo = ({
  small = true
}) => (
  <img className={`w-auto`} src={LogoImage} alt="Paw Connect" style={{
    width: small ? '50px' : '100px',
  }} />
);