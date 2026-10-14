'use strict';
const products = {
  halloween: { title: 'Tadee Halloween Promotion', image: 'assets/tadee-halloween.jpg', alt: 'โปสเตอร์โปรโมชั่น Tadee Halloween ราคา 399 บาท จากปกติ 556 บาท', description: 'คอลเลกชันสีสดใส พร้อมภาพไอเดียตกแต่งเล็บธีมฮาโลวีนและลายหมี รายละเอียดสินค้าและเฉดสีตามภาพที่ร้านจัดเตรียม', price: '฿399', original: '฿556' },
  chrome: { title: 'พาเลตผงขัดเล็บ Spr013 / Spr059', image: 'assets/chrome-palette.jpg', alt: 'พาเลต Spr013 และ Spr059 พร้อมตัวอย่างเล็บโครม', description: 'พาเลตผงขัดเล็บโทนเมทัลลิก Spr013 และ Spr059 พร้อมตัวอย่างเฉดสีและผลงานเล็บตามภาพจากร้าน', price: 'สอบถามราคากับร้าน' }
};
const dialog = document.querySelector('#product-dialog');
let trigger = null;
function openProduct(key, button) {
  const product = products[key];
  if (!product) return;
  trigger = button;
  const image = document.querySelector('#dialog-image');
  image.src = product.image;
  image.alt = product.alt;
  document.querySelector('#dialog-title').textContent = product.title;
  document.querySelector('#dialog-description').textContent = product.description;
  const price = document.querySelector('#dialog-price');
  price.replaceChildren(document.createTextNode(product.price));
  if (product.original) { const original = document.createElement('del'); original.textContent = product.original; price.append(original); }
  document.querySelector('#full-image').href = product.image;
  dialog.showModal();
}
document.querySelectorAll('[data-item]').forEach(button => button.addEventListener('click', () => openProduct(button.dataset.item, button)));
document.querySelector('.close').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => trigger?.focus());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});
