import BarGraph from "./components/BarGraph";
import { Chart as ChartJS, registerables } from 'chart.js';

ChartJS.register(...registerables);

function App() {
  return (
    <div>
     <BarGraph/>
    </div>
  );
}

export default App;
