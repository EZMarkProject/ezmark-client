import { ObjectiveDoneProps } from "./interface";

export default function ObjectiveDone({ schedule }: ObjectiveDoneProps) {
    console.log(schedule);
    return <div>
        <div>
            <h1>Objective Done</h1>
        </div>
    </div>;
}