import { useEffect, useState } from "react";

export default function AppFooter() {
  const [company, setCompany] = useState('COSCI'); 

  const currentDate = <div>{ new Date().toLocaleDateString()}</div>;

  useEffect(() => {
    console.log('จะทำครั้งแรก และทุกครั้งที่มีการ re-render ใหม่');
  });

  useEffect(() => {
    console.log('จะทำครั้งแรกครั้งเดียวเท่านั้น');
  }, []);

  useEffect(() => {
    console.log('จะทำครั้งแรก และเฉพาะเมื่อตัวแปร company อัปเดตค่า');
  }, [company]);

  const handleMouseOver = () => {
    // console.log('Hi footer', company);
    setCompany('SWU');
  }
    
  return (
    <div>
       <hr />
       <p onMouseOver={handleMouseOver}>{company}</p>
       {currentDate}
       <p>codingthailand@gmail.com &copy; { new Date().getFullYear() }</p>
    </div>
  );
}