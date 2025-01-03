# React Types - راهنمای تایپ های پرکاربرد در ریکت

## 1. React.HTMLAttributes
برای اضافه کردن ویژگی‌های عمومی HTML به کامپوننت‌ها استفاده می‌شود.
### کاربردها:
- **React.HTMLAttributes**: برای ویژگی‌های عمومی مانند `onClick`، `style` و `className`.
- **React.ButtonHTMLAttributes**: برای ویژگی‌های خاص دکمه مانند `onClick` و `disabled`.
- **React.InputHTMLAttributes**: برای ویژگی‌های ورودی مانند `value`، `placeholder` و `onChange`.

### مثال:
```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
```

---

## 2. React.RefAttributes
برای اضافه کردن قابلیت ارجاع (Ref) به کامپوننت‌ها استفاده می‌شود.
### کاربردها:
- دسترسی مستقیم به DOM یک کامپوننت.
- فوکوس یا تغییر مستقیم استایل المان‌ها.

### مثال:
```typescript
const inputRef = useRef<HTMLInputElement>(null);
<input ref={inputRef} />
```

---

## 3. React.ElementType
نوع المنت‌های ریکت را مشخص می‌کند.
### کاربردها:
- پشتیبانی از انواع المنت‌های HTML یا کامپوننت‌های سفارشی.
- مناسب برای ساخت کامپوننت‌های انعطاف‌پذیر.

### مثال:
```typescript
interface ComponentProps {
  as?: React.ElementType;
}
```

---

## 4. React.SuspenseProps
برای کامپوننت `<Suspense>` استفاده می‌شود.
### کاربردها:
- نمایش یک فیدبک تا زمان لود شدن یک کامپوننت یا بخش خاصی از اپلیکیشن.
- پراپرتی مهم: `fallback`.

### مثال:
```typescript
<Suspense fallback={<div>Loading...</div>}>
  <LazyComponent />
</Suspense>
```

---

## 5. React.LazyExoticComponent
نوع کامپوننت‌هایی است که با `React.lazy` ساخته می‌شوند.
### کاربردها:
- مدیریت لود تنبل (Lazy Loading) در ریکت.

### مثال:
```typescript
const LazyComponent = React.lazy(() => import('./LazyComponent'));
```

---

## 6. React.SyntheticEvent
یک تایپ عمومی برای مدیریت رویدادها است.
### کاربردها:
- پوشش‌دهی رویدادهای مختلف مانند کلیک، ارسال فرم یا تغییر مقدار ورودی.

### زیرمجموعه‌ها:
1. **React.MouseEvent**: برای رویدادهای موس مانند کلیک.
2. **React.KeyboardEvent**: برای رویدادهای کیبورد مانند فشردن کلیدها.

### مثال:
```typescript
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  console.log(event.currentTarget);
}
```

---

## 7. React.FC (React.FunctionComponent)
برای تعریف کامپوننت‌های فانکشنال استفاده می‌شود.
### کاربردها:
- پشتیبانی خودکار از پراپ `children`.

### مثال:
```typescript
const MyComponent: React.FC = ({ children }) => {
  return <div>{children}</div>;
};
```

---

## 8. React.ReactNode
تایپ عمومی برای نمایش هر نوع محتوایی در JSX.
### کاربردها:
- تعریف پراپرتی‌هایی که می‌توانند هر نوع محتوایی شامل متن، تگ HTML یا کامپوننت‌های دیگر را بپذیرند.

### مثال:
```typescript
interface Props {
  children: React.ReactNode;
}
```

---

## 9. React.ReactFragment
برای گروه‌بندی چندین المان JSX بدون اضافه کردن تگ اضافی در DOM.
### کاربردها:
- جلوگیری از اضافه شدن تگ‌های غیرضروری.

### مثال:
```typescript
<>
  <div>Item 1</div>
  <div>Item 2</div>
</>
```

---

## جمع‌بندی
این راهنما شامل تایپ‌های پرکاربرد در ریکت و تایپ‌اسکریپت است که برای توسعه‌دهندگان فرانت‌اند ضروری هستند. استفاده صحیح از این تایپ‌ها می‌تواند به نوشتن کدهای ایمن، خوانا و مقیاس‌پذیر کمک کند.
