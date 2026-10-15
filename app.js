'use strict';
const products = {
  halloween: { title: 'Tadee Halloween Promotion', image: 'assets/tadee-halloween.jpg', alt: 'โปสเตอร์โปรโมชั่น Tadee Halloween ราคา 399 บาท จากปกติ 556 บาท', description: 'คอลเลกชันสีสดใส พร้อมภาพไอเดียตกแต่งเล็บธีมฮาโลวีนและลายหมี รายละเอียดสินค้าและเฉดสีตามภาพที่ร้านจัดเตรียม', price: '฿399', original: '฿556' },
  chrome: { title: 'พาเลตผงขัดเล็บ Spr013 / Spr059', image: 'assets/chrome-palette.jpg', alt: 'พาเลต Spr013 และ Spr059 พร้อมตัวอย่างเล็บโครม', description: 'พาเลตผงขัดเล็บโทนเมทัลลิก Spr013 และ Spr059 พร้อมตัวอย่างเฉดสีและผลงานเล็บตามภาพจากร้าน', price: 'สอบถามราคากับร้าน' }
};

const stickerGrid = document.querySelector('#sticker-grid');
const stickerGroups = ['ทั้งหมด', ...new Set(stickerCatalog.map(item => item.group))];
let activeStickerGroup = 'ทั้งหมด';
for (const item of stickerCatalog) {
  const key = 'sticker-' + item.code;
  products[key] = { title: 'สติ๊กเกอร์คริสต์มาส ' + item.code, image: item.image, alt: 'สติ๊กเกอร์ติดเล็บคริสต์มาส รหัส ' + item.code, description: 'สติ๊กเกอร์ตกแต่งเล็บธีมคริสต์มาส รหัส ' + item.code + ' ดูลวดลายและตัวอย่างการใช้งานตามภาพสินค้าจริงจากร้าน', price: 'สอบถามราคาและสต็อกกับร้าน' };
  const card = document.createElement('article');
  card.className = 'sticker-card';
  card.dataset.code = item.code;
  card.dataset.group = item.group;
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'sticker-image';
  button.dataset.item = key;
  button.setAttribute('aria-label', 'ดูสติ๊กเกอร์คริสต์มาส ' + item.code);
  const image = document.createElement('img');
  image.src = item.image;
  image.alt = products[key].alt;
  image.loading = 'lazy';
  image.decoding = 'async';
  button.append(image);
  const label = document.createElement('div');
  label.className = 'sticker-info';
  const title = document.createElement('h3');
  title.textContent = item.code;
  const note = document.createElement('p');
  note.textContent = 'สติ๊กเกอร์คริสต์มาส';
  const details = document.createElement('button');
  details.type = 'button';
  details.className = 'text-button';
  details.dataset.item = key;
  details.textContent = 'ดูรายละเอียด ↗';
  details.setAttribute('aria-label', 'รายละเอียดสติ๊กเกอร์ ' + item.code);
  label.append(title, note, details);
  card.append(button, label);
  stickerGrid.append(card);
}
function filterStickers() {
  const query = document.querySelector('#sticker-search').value.toUpperCase().replace(/[^A-Z0-9]/g, '');
  let count = 0;
  stickerGrid.querySelectorAll('.sticker-card').forEach(card => {
    const visible = (activeStickerGroup === 'ทั้งหมด' || card.dataset.group === activeStickerGroup) && card.dataset.code.replace(/[^A-Z0-9]/g, '').includes(query);
    card.hidden = !visible;
    if (visible) count++;
  });
  document.querySelector('#sticker-count').textContent = 'แสดง ' + count + ' จาก ' + stickerCatalog.length + ' แบบ';
  document.querySelector('#sticker-empty').hidden = count > 0;
}
for (const group of stickerGroups) {
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = group;
  button.classList.toggle('active', group === activeStickerGroup);
  button.setAttribute('aria-pressed', String(group === activeStickerGroup));
  button.addEventListener('click', () => {
    activeStickerGroup = group;
    document.querySelectorAll('#sticker-filters button').forEach(element => {
      const active = element === button;
      element.classList.toggle('active', active);
      element.setAttribute('aria-pressed', String(active));
    });
    filterStickers();
  });
  document.querySelector('#sticker-filters').append(button);
}
document.querySelector('#sticker-search').addEventListener('input', filterStickers);
filterStickers();

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
