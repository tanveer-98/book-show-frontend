import { Navbar } from "./Layout/Navbar";
import { Footer } from "./Layout/Footer";
import Home from "./components/Home/Home";

export default function App() {
  // add radial background here
  // const [pos, setPos] = useState({ x: 0, y: 0 });

  // const handleMoveHover = (e: React.MouseEvent<HTMLDivElement>) => {
  //   const rect = e.currentTarget.getBoundingClientRect();
  //   setPos({
  //     x: e.clientX - rect.left,
  //     y: e.clientY - rect.top,
  //   });
  //   console.log(pos);
  // };

  return (
    // <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 p-6 text-white">
    <div className="relative min-h-screen overflow-x-hidden">
      {/* <div
        className="absolute inset-0 opacity-0 transition duration-300 hover:opacity-100"
        style={{
          background: `radial-gradient(350px at ${pos.x}px ${pos.y}px, rgba(255,255,255,0.25), transparent 70%)`,
        }}
      /> */}
      {/* <Navbar /> */}
     
        <Home />
      
      <Footer />
    </div>
  );
}
