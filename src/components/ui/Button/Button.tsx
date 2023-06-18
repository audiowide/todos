import {FC, ReactNode, MouseEventHandler} from 'react'
import styles from './Button.module.css'


interface ButtonProps {
    onClick: MouseEventHandler<HTMLButtonElement>;
    children: ReactNode;
}

const Button:FC<ButtonProps> = ({children, onClick}) => {
  return (
    <button 
        className={styles.button}
        onClick={onClick}
    >
        {children}
    </button>
  )
}

export default Button