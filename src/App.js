import logo from './logo.svg';
import './App.css';
import { ThemeProvider } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './container/layout';

function App() {
  return (
    <div>
      <ThemeProvider
        breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
        minBreakpoint="xxs"
      >
          <Layout />
      </ThemeProvider>
    </div>
  );
}

export default App;
