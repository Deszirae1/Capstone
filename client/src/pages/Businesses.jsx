import { ThemeProvider, createTheme } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import Footer from './Footer1'; 


const Businesses = ({ businesses }) => {
  return (
    <div>
      <h1>Placeholder for Businesses {businesses.length}</h1>
    </div>
  );
};

export default Businesses;

