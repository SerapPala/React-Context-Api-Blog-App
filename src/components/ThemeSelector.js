
import { useTheme } from "../hooks/useTheme"

// styles
import './ThemeSelector.css'
import modeIcon from '../assets/set-mode.svg'
const themeColors = ['#778beb', '#cf6a87', '#f8a5c2','#e77f67']

export default function ThemeSelector() {
  const { changeColor,changeMode, mode  } = useTheme();


  const toggleMode = () => {
    changeMode(mode === 'dark' ? 'light' : 'dark')
  }


  return (
    <div className="theme-selector">
      <div className="mode-toggle">
		<img 
		  onClick={toggleMode}
		  src={modeIcon}
		  style={{ filter: mode === 'dark' ? 'invert(100%)' : 'invert(20%)' }}
		  alt="dark/light toggle icon"
		/>
	  </div>
      <div className="theme-buttons">
        {themeColors.map(color => (
          <div 
            key={color} 
            onClick={() => changeColor(color)}
            style={{ background: color }}
          />
        ))}
      </div>
    </div>
  )
}
