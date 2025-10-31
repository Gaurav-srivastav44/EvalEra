// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideOutRight: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
        slideInUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'pulse-light': {
          '0%, 100%': {
            boxShadow: '0 0 10px rgba(0, 150, 255, 0.4)',
            transform: 'scale(1)',
          },
          '50%': {
            boxShadow: '0 0 20px rgba(0, 150, 255, 0.7)',
            transform: 'scale(1.02)',
          },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        slideInLeft: 'slideInLeft 0.7s ease-out forwards',
        slideOutRight: 'slideOutRight 0.5s ease-in forwards',
        slideInUp: 'slideInUp 0.8s ease-out forwards',
        'pulse-light': 'pulse-light 3s ease-in-out infinite',
        fadeInDown: 'fadeInDown 0.6s ease-out forwards', // Base animation for one step
        // Animations for each step with delays and infinite loop
        'flow-step-1': 'fadeInDown 0.6s ease-out forwards infinite',
        'flow-step-2': 'fadeInDown 0.6s ease-out 1s forwards infinite', // 1s delay
        'flow-step-3': 'fadeInDown 0.6s ease-out 2s forwards infinite', // 2s delay
        'flow-step-4': 'fadeInDown 0.6s ease-out 3s forwards infinite', // 3s delay
        'flow-step-5': 'fadeInDown 0.6s ease-out 4s forwards infinite', // 4s delay
        'flow-step-arrow-1': 'fadeInDown 0.4s ease-out 0.7s forwards infinite',
        'flow-step-arrow-2': 'fadeInDown 0.4s ease-out 1.7s forwards infinite',
        'flow-step-arrow-3': 'fadeInDown 0.4s ease-out 2.7s forwards infinite',
        'flow-step-arrow-4': 'fadeInDown 0.4s ease-out 3.7s forwards infinite',
      },
    },
  },
  plugins: [],
}