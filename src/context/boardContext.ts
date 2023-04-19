import {createContext} from "react";
import {Board} from "@/types/board";

const BoardContext = createContext<Board>({})
export default BoardContext;