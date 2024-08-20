import { useState, useRef } from "react"
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {

    const timer = useRef();
    const dialog = useRef();

    const [TimeRemaining,setTimeRemaning] = useState(targetTime*1000); 
    const timeIsActive = TimeRemaining > 0 && TimeRemaining < targetTime*1000;

    if(TimeRemaining <= 0){
        clearInterval(timer.current);
        dialog.current.open();
    }

    function handleReset(){
        setTimeRemaning(targetTime*1000);
    }

    function handleStart() {
        timer.current = setInterval(() => {     
            setTimeRemaning(TimeRemaining => TimeRemaining-10);
            }, 10)
    }

    function handleStop() {
        dialog.current.open();
        clearInterval(timer.current)
    }

    return (
        <>
        <ResultModal 
         ref={dialog} 
         targetTime={targetTime} 
         remainingTime = {TimeRemaining}
         onReset = {handleReset}
        />
        <section className="challenge">
            <h2>{title}</h2>
            <p className="challenge-time">
                {targetTime} second{targetTime > 1 ? 's' : ''}
            </p>
            <button onClick={timeIsActive ? handleStop  : handleStart }>
                {timeIsActive ? "Stop" : "Start"} Challenge
            </button>   

            <p className={timeIsActive ? 'active' : undefined}>
                {timeIsActive ? 'Timer is running...' : 'Timer inactive'}
            </p>
       </section>
       </>
    )
}