
const { data, mutate } = useSWR('/api/items', fetcher);

const addItem = async (newItem) => {
  mutate([...data, newItem], false); // خوش‌بینانه آپدیت کن
  await fetch('/api/items', {
    method: 'POST',
    body: JSON.stringify(newItem),
  });
  mutate(); // داده‌ها رو دوباره از سرور بگیر
};
