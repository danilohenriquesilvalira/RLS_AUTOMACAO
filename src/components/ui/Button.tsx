import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'white' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  className?: string;
  href?: string;
  to?: string;
  external?: boolean;
  disabled?: boolean;
  whileHoverScale?: number;
  whileTapScale?: number;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  // Add any other props that you commonly use
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  fullWidth = false,
  className,
  href,
  to,
  external,
  disabled,
  whileHoverScale = 1.03,
  whileTapScale = 0.97,
  type = 'button',
  onClick,

}) => {
  // Configurações de variantes
  const variantClasses = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
    secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500',
    white: 'bg-white text-primary-600 hover:bg-gray-100 focus:ring-primary-500 shadow-md',
    ghost: 'text-primary-600 hover:bg-primary-50 focus:ring-primary-500',
  };

  // Configurações de tamanho
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  // Classes base
  const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

  // Combinando todas as classes
  const buttonClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${fullWidth ? 'w-full' : ''}
    ${className || ''}
  `;

  // Componente do botão com animação
  const ButtonContent = (
    <>
      {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
    </>
  );

  // Render baseado no tipo (link externo, interno ou botão)
  if (href) {
    return (
      <motion.a
        href={href}
        className={buttonClasses}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        whileHover={disabled ? undefined : { scale: whileHoverScale }}
        whileTap={disabled ? undefined : { scale: whileTapScale }}
        onClick={onClick}
      >
        {ButtonContent}
      </motion.a>
    );
  }

  if (to) {
    return (
      <motion.div
        whileHover={disabled ? undefined : { scale: whileHoverScale }}
        whileTap={disabled ? undefined : { scale: whileTapScale }}
      >
        <Link 
          to={to} 
          className={buttonClasses}
          onClick={onClick as any}
        >
          {ButtonContent}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      className={buttonClasses}
      disabled={disabled}
      whileHover={disabled ? undefined : { scale: whileHoverScale }}
      whileTap={disabled ? undefined : { scale: whileTapScale }}
      type={type}
      onClick={onClick}
    >
      {ButtonContent}
    </motion.button>
  );
};

export default Button;