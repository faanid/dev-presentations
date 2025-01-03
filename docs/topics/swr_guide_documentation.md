# راهنمای SWR در React

## کتابخونه SWR چیه و چرا اهمیت داره؟
 یه کتابخونه برای گرفتن و کش کردن داده‌ها در React. این کتابخونه داده‌های قدیمی را نمایش میده و بعد اونارو به‌روزرسانی میکنه.

### ویژگی‌های کلیدی SWR
- **مدیریت کش خودکار**: نیازی به نوشتن کدهای اضافی برای مدیریت کش نیست.
- **به‌روزرسانی همزمان**: داده‌ها بدون نیاز به رفرش دستی به‌روزرسانی میشن.
- **مدیریت خطا و بازگشت مجدد**: درخواست‌های failed شده به صورت خودکار مجدداً ارسال میشن.

---

## قابلیت‌های Advanced SWR

### 1. مدیریت خطاها و Retry Mechanism
 به‌طور پیش‌فرض درخواست‌های شکست‌خورده را به‌صورت خودکار تکرار میکنه تا داده‌ها بازیابی نشن.

### 2-1. Pagination 
- **صفحه‌بندی**:
- مواقعی که حجم داده‌ها زیاده، بهتره از صفحه‌بندی استفاده کنیم.
```javascript
const { data } = useSWR(`/api/users?page=${page}`, fetcher);
```

### 2-2. Infinitive Scroll
- برای بارگذاری داده‌ها به‌صورت تدریجی با اسکرول کاربر
```javascript
const { data, size, setSize } = useSWRInfinite(
  (index) => `/api/posts?page=${index + 1}`,
  fetcher
);
```
کجاها استفاده میشه؟
فید شبکه‌های اجتماعی.
نمایش محصولات در فروشگاه‌های اینترنتی.


### 3. Dependent Fetching
فرض کن یه درخواست باید بعد از کامل شدن یه درخواست دیگه اجرا بشه (dependency بین درخواست‌ها). این خیلی جاها مثل داشبوردهای پیچیده یا فیلترهای زنجیره‌ای کاربرد داره.
مثال: اول باید اطلاعات کاربر رو بگیری، بعد بر اساس اون اطلاعات، لیست سفارش‌هاش رو لود کنی.
```javascript
const { data: user } = useSWR('/api/user', fetcher);
const { data: orders } = useSWR(user ? `/api/orders?userId=${user.id}` : null, fetcher);
```
### 4. Parallel Fetching
اگه چند درخواست مختلف داشتیم که نیازی به وابستگی ندارن، می‌تونیم به‌طور Parallel اجراشون کنیم و سرعت رو بالا ببریم.
مثال: گرفتن لیست کاربران و پست‌ها به صورت همزمان:
```javascript
const { data: users } = useSWR('/api/users', fetcher);
const { data: posts } = useSWR('/api/posts', fetcher);
```

---

نکته: درخواست دوم فقط زمانی اجرا میشه که اطلاعات کاربر از درخواست اول آماده شده باشه. این رفتار رو توی fetch یا axios باید دستی مدیریت کنی، ولی SWR خیلی راحت این کار رو انجام میده.
source : https://swr.vercel.app/blog/swr-v2.en-US#optimistic-ui



### 5. Optimistic UI
برای بهبود تجربه کاربری، می‌تونی داده‌ها رو بدون نیاز به صبر برای پاسخ سرور، موقتاً به‌روزرسانی کنی و بعدش با پاسخ نهایی سرور تطبیق بدی.
مثال: اضافه کردن آیتم به لیست:
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

نکته: این روش مخصوص جاهایی مثل فرم‌ها و سبد خرید خیلی پرکاربرده و باعث میشه رابط کاربری سریع‌تر به نظر بیاد.


### 6. Keep Previous Data
فرض کن توی صفحه‌ای هستی که صفحه‌بندی داره. کاربر صفحه رو عوض می‌کنه، اما نمی‌خوای صفحه قبلی خالی نشون داده بشه تا داده‌های جدید برسن.
```javascript
const { data } = useSWR('/api/stats', fetcher, {
  refreshInterval: 5000,
});
```

---
نکته: این قابلیت باعث میشه رابط کاربری لگ نداشته باشه و توی لیست‌های بزرگ خیلی کار راه‌اندازه.


### 7. Revalidation Interval
برای پروژه‌هایی که نیاز به (real-time) دارن، می‌تونی کش رو با زمان‌بندی مشخصی به‌روزرسانی کنی.
```javascript
const { data } = useSWR('/api/stats', fetcher, {
  refreshInterval: 5000,
});
```
نکته: این روش برای پروژه‌هایی مثل داشبوردهای مانیتورینگ و گزارش‌گیری فوق‌العاده مهمه.

---
### 8. useSwrMutations

## مدیریت Mutations
توی SWR معمولی، درخواست‌ها فقط برای دریافت داده‌ها (GET) طراحی شده‌اند. اما گاهی لازمه:
یه آیتم جدید اضافه کنی (POST)
یه داده رو ویرایش کنی (PUT یا PATCH)
یه آیتم رو حذف کنی (DELETE)
برای این کارها باید mutation داشته باشیم تا بعد از اعمال تغییرات، داده‌های کش (Cache) هم به‌روز بشن.

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
تابع fetcher:
درخواست POST ارسال میکنه و اطلاعات رو ذخیره می‌کنه.
useSWRMutation:
به جای فراخوانی مستقیم داده، اینجا به یه تابع trigger نیاز داریم که وقتی کاربر عملی رو انجام داد (مثلاً کلیک روی دکمه)، اجرا بشه.
trigger:
درخواست رو وقتی نیاز باشه اجرا می‌کنه.
isMutating:
نشون میده که درخواست در حال اجراست (برای مدیریت لودینگ).


### حذف داده‌ها
```javascript
const deleteFetcher = async (url) => {
  const res = await fetch(url, { method: 'DELETE' });
  if (!res.ok) throw new Error('خطا رخ داده است');
  return res.json();
};
const { trigger } = useSWRMutation('/api/items/1', deleteFetcher);
```
بعد از حذف آیتم، با mutate('/api/items') لیست کش شده رو هم به‌روز کردیم.
خطاها به‌راحتی مدیریت میشن.
برای UI میشه دکمه غیر فعال یا پیام لودینگ نشون داد.


