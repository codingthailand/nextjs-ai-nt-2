'use client'

export default function AppButton() {
  
  const handleClickMe = () => alert('Hello Next.js');  

  return (
    <button onClick={handleClickMe} >
        Click Me!
    </button>
  );
}