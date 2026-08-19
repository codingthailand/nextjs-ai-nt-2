-- =============================================
-- Sample Data for E-Commerce Database
-- 50 products: 10 products per category
-- =============================================

-- หมายเหตุ: ไฟล์นี้ออกแบบให้รันกับฐานข้อมูลใหม่ที่ยังไม่มีข้อมูล
-- เพื่อให้ AUTO_INCREMENT id ของ categories/products ตรงกับข้อมูลอ้างอิงด้านล่าง

-- 1. categories
INSERT INTO `categories` (`name`) VALUES
('สมาร์ทโฟน'),
('แล็ปท็อป'),
('หูฟัง'),
('แท็บเล็ต'),
('อุปกรณ์เสริม');

-- 2. products (50 rows)
-- 5 รายการแรกคงลำดับเดิม เพื่อให้ orders / order_items ตัวอย่างเดิมยังใช้งานได้
INSERT INTO `products` (`name`, `description`, `price`, `category_id`) VALUES
-- Existing products: id 1-5
('iPhone 16 Pro', 'สมาร์ทโฟน Apple จอ 6.3 นิ้ว ชิป A18 Pro', 45900.00, 1),
('Samsung Galaxy S25', 'สมาร์ทโฟน Samsung จอ 6.2 นิ้ว ชิป Snapdragon 8 Elite', 32900.00, 1),
('MacBook Air M3', 'แล็ปท็อป Apple จอ 15 นิ้ว RAM 16GB SSD 512GB', 44900.00, 2),
('AirPods Pro 2', 'หูฟังไร้สาย Apple ตัดเสียงรบกวน USB-C', 8990.00, 3),
('iPad Air M2', 'แท็บเล็ต Apple จอ 13 นิ้ว ชิป M2', 33900.00, 4),

-- Additional smartphones: id 6-13
('Google Pixel 9', 'สมาร์ทโฟน Android กล้องคุณภาพสูงและฟีเจอร์ AI', 29900.00, 1),
('Xiaomi 15', 'สมาร์ทโฟนเรือธง จอ AMOLED และชิปประสิทธิภาพสูง', 26990.00, 1),
('OnePlus 13', 'สมาร์ทโฟน Android จอความละเอียดสูง รองรับชาร์จเร็ว', 28900.00, 1),
('OPPO Find X8', 'สมาร์ทโฟนดีไซน์พรีเมียม กล้องหลายระยะ', 27999.00, 1),
('vivo X200', 'สมาร์ทโฟนเน้นการถ่ายภาพและประสิทธิภาพระดับเรือธง', 29999.00, 1),
('HONOR Magic7', 'สมาร์ทโฟนจอ OLED พร้อมระบบกล้อง AI', 30990.00, 1),
('Nothing Phone 3', 'สมาร์ทโฟนดีไซน์โปร่งใส พร้อมอินเทอร์เฟซ Glyph', 24900.00, 1),
('ASUS Zenfone 12', 'สมาร์ทโฟนขนาดกะทัดรัด เน้นประสิทธิภาพและกล้อง', 25990.00, 1),

-- Additional laptops: id 14-22
('MacBook Pro 14', 'แล็ปท็อปสำหรับงานพัฒนาและงานสร้างสรรค์ จอ 14 นิ้ว', 69900.00, 2),
('Dell XPS 13', 'Ultrabook ขนาด 13 นิ้ว น้ำหนักเบา เหมาะสำหรับทำงาน', 52900.00, 2),
('Lenovo ThinkPad X1 Carbon', 'Business laptop น้ำหนักเบา คีย์บอร์ดเด่น', 58900.00, 2),
('ASUS Zenbook 14', 'แล็ปท็อปบางเบา จอ OLED สำหรับงานทั่วไปและพัฒนาโปรแกรม', 39990.00, 2),
('Acer Swift Go 14', 'แล็ปท็อปพกพาง่าย จอ 14 นิ้ว เหมาะสำหรับนักศึกษา', 29990.00, 2),
('HP Pavilion Plus 14', 'แล็ปท็อปสำหรับทำงานและเรียนออนไลน์ จอความละเอียดสูง', 34900.00, 2),
('MSI Modern 14', 'แล็ปท็อปสำหรับงานสำนักงานและพัฒนาโปรแกรม', 24990.00, 2),
('Microsoft Surface Laptop', 'แล็ปท็อป Windows ดีไซน์เรียบ จอสัมผัส', 46900.00, 2),
('LG gram 16', 'แล็ปท็อปจอใหญ่ น้ำหนักเบา เหมาะกับการเดินทาง', 54900.00, 2),

-- Additional headphones: id 23-31
('Sony WH-1000XM5', 'หูฟังครอบหูไร้สาย พร้อมระบบตัดเสียงรบกวน', 12990.00, 3),
('Bose QuietComfort Ultra', 'หูฟังไร้สายครอบหู เน้นความสบายและ ANC', 15900.00, 3),
('Samsung Galaxy Buds3 Pro', 'หูฟัง True Wireless พร้อม ANC และโหมดเสียงรอบข้าง', 6990.00, 3),
('JBL Live Beam 3', 'หูฟัง True Wireless พร้อมเคสหน้าจอและ ANC', 6490.00, 3),
('Sennheiser Momentum 4', 'หูฟังครอบหูไร้สาย เน้นคุณภาพเสียงและแบตเตอรี่', 13990.00, 3),
('Nothing Ear', 'หูฟัง True Wireless ดีไซน์โปร่งใส รองรับ ANC', 5490.00, 3),
('Anker Soundcore Liberty 4', 'หูฟัง True Wireless สำหรับใช้งานประจำวัน', 3990.00, 3),
('Razer BlackShark V2 Pro', 'Gaming headset ไร้สาย พร้อมไมโครโฟน', 7990.00, 3),
('Logitech G Pro X 2', 'Gaming headset ไร้สายสำหรับเล่นเกมและประชุมออนไลน์', 8990.00, 3),

-- Additional tablets: id 32-40
('iPad Pro 11', 'แท็บเล็ตประสิทธิภาพสูงสำหรับงานสร้างสรรค์และงานมืออาชีพ', 39900.00, 4),
('Samsung Galaxy Tab S10+', 'แท็บเล็ต Android จอใหญ่ รองรับปากกา', 35900.00, 4),
('Xiaomi Pad 7 Pro', 'แท็บเล็ต Android จอความละเอียดสูง สำหรับงานและความบันเทิง', 19990.00, 4),
('OnePlus Pad 2', 'แท็บเล็ต Android จอใหญ่ พร้อมประสิทธิภาพระดับสูง', 22900.00, 4),
('Lenovo Tab P12', 'แท็บเล็ตจอ 12 นิ้ว เหมาะสำหรับเรียนและจดโน้ต', 14990.00, 4),
('Huawei MatePad Pro', 'แท็บเล็ตจอคุณภาพสูง รองรับปากกาและคีย์บอร์ด', 24990.00, 4),
('HONOR Pad 9', 'แท็บเล็ตจอใหญ่สำหรับดูสื่อและเรียนออนไลน์', 12990.00, 4),
('Redmi Pad Pro', 'แท็บเล็ต Android จอใหญ่ แบตเตอรี่ความจุสูง', 10990.00, 4),
('Microsoft Surface Pro', 'แท็บเล็ต Windows แบบ 2-in-1 สำหรับงานระดับมืออาชีพ', 49900.00, 4),

-- Accessories: id 41-50
('Apple Magic Mouse', 'เมาส์ไร้สายระบบ Multi-Touch สำหรับ Mac', 2990.00, 5),
('Logitech MX Master 3S', 'เมาส์ไร้สายสำหรับงาน Productivity รองรับหลายอุปกรณ์', 3990.00, 5),
('Logitech MX Keys S', 'คีย์บอร์ดไร้สาย Full-size สำหรับงาน Productivity', 4290.00, 5),
('Keychron K2 Pro', 'Mechanical keyboard แบบไร้สาย รองรับหลายระบบปฏิบัติการ', 3990.00, 5),
('Anker 737 Power Bank', 'Power Bank ความจุสูง รองรับชาร์จเร็วผ่าน USB-C', 4990.00, 5),
('UGREEN USB-C Hub 9-in-1', 'USB-C Hub สำหรับเพิ่ม HDMI USB SD Card และ Ethernet', 2490.00, 5),
('Samsung T7 Shield 1TB', 'Portable SSD ความจุ 1TB รองรับ USB-C', 3990.00, 5),
('SanDisk Extreme Portable SSD 1TB', 'External SSD ขนาดพกพา สำหรับสำรองข้อมูล', 4290.00, 5),
('Belkin 3-in-1 Wireless Charger', 'แท่นชาร์จไร้สายสำหรับสมาร์ทโฟน หูฟัง และสมาร์ทวอทช์', 5490.00, 5),
('Baseus GaN Charger 100W', 'หัวชาร์จ GaN กำลังสูง รองรับ USB-C หลายพอร์ต', 2190.00, 5);

-- 3. product_images
-- ใส่รูปอย่างน้อย 1 รูปต่อสินค้า และบางรายการมีหลายรูปเพื่อใช้สอน Image Gallery
INSERT INTO `product_images` (`product_id`, `image_name`) VALUES
(1, 'iphone16pro-front.jpg'),
(1, 'iphone16pro-back.jpg'),
(2, 'galaxy-s25-front.jpg'),
(2, 'galaxy-s25-back.jpg'),
(3, 'macbook-air-m3-silver.jpg'),
(3, 'macbook-air-m3-open.jpg'),
(4, 'airpods-pro2-case.jpg'),
(4, 'airpods-pro2-earbuds.jpg'),
(5, 'ipad-air-m2-front.jpg'),
(5, 'ipad-air-m2-back.jpg'),
(6, 'pixel-9-front.jpg'),
(7, 'xiaomi-15-front.jpg'),
(8, 'oneplus-13-front.jpg'),
(9, 'oppo-find-x8-front.jpg'),
(10, 'vivo-x200-front.jpg'),
(11, 'honor-magic7-front.jpg'),
(12, 'nothing-phone-3-front.jpg'),
(13, 'asus-zenfone-12-front.jpg'),
(14, 'macbook-pro-14-front.jpg'),
(15, 'dell-xps-13-front.jpg'),
(16, 'thinkpad-x1-carbon-front.jpg'),
(17, 'asus-zenbook-14-front.jpg'),
(18, 'acer-swift-go-14-front.jpg'),
(19, 'hp-pavilion-plus-14-front.jpg'),
(20, 'msi-modern-14-front.jpg'),
(21, 'surface-laptop-front.jpg'),
(22, 'lg-gram-16-front.jpg'),
(23, 'sony-wh1000xm5-front.jpg'),
(24, 'bose-qc-ultra-front.jpg'),
(25, 'galaxy-buds3-pro-front.jpg'),
(26, 'jbl-live-beam-3-front.jpg'),
(27, 'sennheiser-momentum-4-front.jpg'),
(28, 'nothing-ear-front.jpg'),
(29, 'soundcore-liberty-4-front.jpg'),
(30, 'razer-blackshark-v2-pro-front.jpg'),
(31, 'logitech-g-pro-x2-front.jpg'),
(32, 'ipad-pro-11-front.jpg'),
(33, 'galaxy-tab-s10-plus-front.jpg'),
(34, 'xiaomi-pad-7-pro-front.jpg'),
(35, 'oneplus-pad-2-front.jpg'),
(36, 'lenovo-tab-p12-front.jpg'),
(37, 'huawei-matepad-pro-front.jpg'),
(38, 'honor-pad-9-front.jpg'),
(39, 'redmi-pad-pro-front.jpg'),
(40, 'surface-pro-front.jpg'),
(41, 'apple-magic-mouse-front.jpg'),
(42, 'logitech-mx-master-3s-front.jpg'),
(43, 'logitech-mx-keys-s-front.jpg'),
(44, 'keychron-k2-pro-front.jpg'),
(45, 'anker-737-power-bank-front.jpg'),
(46, 'ugreen-usb-c-hub-9in1-front.jpg'),
(47, 'samsung-t7-shield-1tb-front.jpg'),
(48, 'sandisk-extreme-ssd-1tb-front.jpg'),
(49, 'belkin-3in1-wireless-charger-front.jpg'),
(50, 'baseus-gan-charger-100w-front.jpg');

-- 4. customers
INSERT INTO `customers` (`name`, `address`, `phone`) VALUES
('สมชาย ใจดี', '123 ถ.สุขุมวิท แขวงคลองตัน เขตคลองเตย กรุงเทพฯ 10110', '081-234-5678'),
('สมหญิง รักเรียน', '456 ถ.เชียงใหม่-ลำปาง ต.ช้างเผือก อ.เมือง เชียงใหม่ 50300', '089-876-5432'),
('วิชัย โค้ดเก่ง', '789 ถ.มิตรภาพ ต.ในเมือง อ.เมือง นครราชสีมา 30000', '092-345-6789'),
('นภา สุขสันต์', '321 ถ.อุปราช ต.ในเมือง อ.เมือง อุบลราชธานี 34000', '063-456-7890'),
('พิมพ์ใจ ดีไซน์', '654 ถ.ราชดำเนิน ต.ประตูชัย อ.พระนครศรีอยุธยา 13000', '095-567-8901');

-- 5. orders
-- คงข้อมูลเดิมไว้ โดยอ้างอิง products id 1-5 เหมือนเดิม
INSERT INTO `orders` (`date`, `customer_id`, `status`, `total_amount`) VALUES
('2026-06-01 09:30:00', 1, 'delivered', 100790.00),
('2026-06-01 14:15:00', 2, 'delivered', 53890.00),
('2026-06-02 10:00:00', 3, 'processing', 41890.00),
('2026-06-02 16:45:00', 4, 'received', 78800.00),
('2026-06-03 08:20:00', 5, 'processing', 79800.00);

-- 6. order_items (10 rows)
INSERT INTO `order_items` (`order_id`, `product_id`, `quantity`, `price`) VALUES
-- Order #1: สมชาย → iPhone 16 Pro x2 + AirPods Pro 2 x1 = 100,790
(1, 1, 2, 45900.00),
(1, 4, 1, 8990.00),
-- Order #2: สมหญิง → MacBook Air M3 x1 + AirPods Pro 2 x1 = 53,890
(2, 3, 1, 44900.00),
(2, 4, 1, 8990.00),
-- Order #3: วิชัย → Galaxy S25 x1 + AirPods Pro 2 x1 = 41,890
(3, 2, 1, 32900.00),
(3, 4, 1, 8990.00),
-- Order #4: นภา → MacBook Air M3 x1 + iPad Air M2 x1 = 78,800
(4, 3, 1, 44900.00),
(4, 5, 1, 33900.00),
-- Order #5: พิมพ์ใจ → iPhone 16 Pro x1 + iPad Air M2 x1 = 79,800
(5, 1, 1, 45900.00),
(5, 5, 1, 33900.00);
