import { createContext, useContext } from 'react'

export const SplashContext = createContext(true)
/** true once the splash screen has finished — used to time hero entrances */
export const useSplashDone = () => useContext(SplashContext)
