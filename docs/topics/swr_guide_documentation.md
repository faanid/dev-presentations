# راهنمای SWR در React

## SWR چیست و چرا اهمیت دارد؟
SWR یک کتابخانه برای واکشی و کش کردن داده‌ها در React است. این کتابخانه داده‌های قدیمی را نمایش می‌دهد و سپس آن‌ها را به‌روزرسانی می‌کند. این روش سرعت و کارایی بالایی دارد.

### ویژگی‌های کلیدی SWR
- **مدیریت کش خودکار**: نیازی به نوشتن کدهای اضافی برای مدیریت کش نیست.
- **به‌روزرسانی همزمان**: داده‌ها بدون نیاز به رفرش دستی به‌روزرسانی می‌شوند.
- **مدیریت خطا و بازگشت مجدد**: درخواست‌های شکست‌خورده به‌طور خودکار مجدداً ارسال می‌شوند.

### چرا SWR بهتر از fetch یا axios است؟
- **سادگی**: پیاده‌سازی آسان و کدهای کوتاه‌تر.
- **انعطاف‌پذیری بالا**: قابلیت پشتیبانی از ویژگی‌های پیچیده مثل اسکرول بی‌نهایت و فیلترهای وابسته.

---

## قابلیت‌های پیشرفته SWR

### 1. مدیریت خطاها و Retry Mechanism
SWR به‌طور پیش‌فرض درخواست‌های شکست‌خورده را به‌صورت خودکار تکرار می‌کند تا داده‌ها بازیابی شوند.

### 2. صفحه‌بندی و اسکرول بی‌نهایت
- **صفحه‌بندی**:
```javascript
const { data } = useSWR(`/api/users?page=${page}`, fetcher);
```
- **اسکرول بی‌نهایت**:
```javascript
const { data, size, setSize } = useSWRInfinite(
  (index) => `/api/posts?page=${index + 1}`,
  fetcher
);
```

### 3. دریافت داده‌های وابسته
```javascript
const { data: user } = useSWR('/api/user', fetcher);
const { data: orders } = useSWR(user ? `/api/orders?userId=${user.id}` : null, fetcher);
```
### 4. دریافت موازی داده‌ها
```javascript
const { data: users } = useSWR('/api/users', fetcher);
const { data: posts } = useSWR('/api/posts', fetcher);
```

---

## ویژگی‌های بهینه‌سازی UI

### 1. Optimistic UI
```javascript
const { data, mutate } = useSWR('/api/items', fetcher);
const addItem = async (newItem) => {
  mutate([...data, newItem], false);
  await fetch('/api/items', {
    method: 'POST',
    body: JSON.stringify(newItem),
  });
  mutate();
};
```

### 2. به‌روزرسانی خودکار با فاصله زمانی
```javascript
const { data } = useSWR('/api/stats', fetcher, {
  refreshInterval: 5000,
});
```

---

## مدیریت Mutations

### اضافه کردن داده جدید
```javascript
import useSWRMutation from 'swr/mutation';
const fetcher = async (url, { arg }) => {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg),
  });
  return response.json();
};
const { trigger, data, error } = useSWRMutation('/api/users', fetcher);
```

### حذف داده‌ها
```javascript
const deleteFetcher = async (url) => {
  const res = await fetch(url, { method: 'DELETE' });
  if (!res.ok) throw new Error('خطا رخ داده است');
  return res.json();
};
const { trigger } = useSWRMutation('/api/items/1', deleteFetcher);
```

---

## نتیجه‌گیری
SWR ابزاری قدرتمند و انعطاف‌پذیر برای مدیریت داده‌ها در React است. این کتابخانه به‌ویژه برای پروژه‌هایی که نیاز به تعامل بالا با داده‌ها دارند، مانند داشبوردها و اپلیکیشن‌های real-time، بسیار کاربردی است.