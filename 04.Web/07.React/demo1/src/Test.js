import { useState , useEffect} from "react";

let timer = null;
function useCountdown(initialCount) {
    const [time, setTime] = useState(initialCount);

    timer = setInterval(() => {
        setTime(time - 1);
    }, 1000);

    if (time <= 0) {
        clearInterval(timer);
        alert('结束')
    }

    return time;
  } 

  export default function App() {
    clearInterval(timer);
    const time = useCountdown(10);
    return (
      <div>
        <h1>Hello CodeSandbox</h1>
        <h2>{time}</h2>
      </div>
    );
  }