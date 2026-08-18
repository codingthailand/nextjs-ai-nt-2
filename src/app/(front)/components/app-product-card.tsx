'use client'

type Props = {
  name: string;
  price: number;
  stock?: number;
  onAddToCart: (name: string) => void;
}

export default function AppProductCard({ name, price, stock = 0, onAddToCart }: Props) {
  return (
    <div className="w-60 border border-green-500 rounded-lg p-6 m-6 bg-amber-100">
      <h2>{name}</h2>
      <p>ราคา: {price} บาท</p>
      {
        stock > 0 && (
          <div>
            <p>คงเหลือ: {stock}</p>
            <button onClick={ () => onAddToCart(name) }>เพิ่มลงตะกร้า</button>
          </div>
        )
      }
      
    </div>
  );
}