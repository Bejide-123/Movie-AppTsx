import Navbar from '../Components/Navbar';
import CardListing from '../Components/CardListing';

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <CardListing />
    </div>
  );
};

export default Home;